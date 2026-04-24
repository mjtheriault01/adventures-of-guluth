(function () {
  'use strict';

  // Wrap any content element in a .book-page > .book-page-inner shell
  function makePage(content) {
    var page  = document.createElement('div');
    page.className = 'book-page';
    var inner = document.createElement('div');
    inner.className = 'book-page-inner';
    inner.appendChild(content.cloneNode(true));
    page.appendChild(inner);
    return page;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var hero    = document.querySelector('.story-hero');
    var article = document.querySelector('.story-container');
    if (!hero || !article) return;

    // ---- BUILD PAGES ------------------------------------------------
    var pages = [];

    // Page 0: Cover (hero image + hint)
    var coverPage = document.createElement('div');
    coverPage.className = 'book-page book-page--cover';
    coverPage.appendChild(hero.cloneNode(true));
    var hint = document.createElement('p');
    hint.className = 'book-cover-hint';
    hint.textContent = 'Tap ▸ or swipe to begin';
    coverPage.appendChild(hint);
    pages.push(coverPage);

    // Content pages: each <p> inside .story-section = its own page
    // (eliminates any need to scroll); other blocks stay as one page each
    Array.from(article.children).forEach(function (block) {
      if (block.classList.contains('story-section')) {
        Array.from(block.querySelectorAll('p')).forEach(function (para) {
          pages.push(makePage(para));
        });
      } else {
        // .story-image, .dads-question, .story-end → single page
        pages.push(makePage(block));
      }
    });

    var total = pages.length;

    // ---- BUILD STAGE ------------------------------------------------
    var stage = document.createElement('div');
    stage.className = 'book-stage';

    var wrapper = document.createElement('div');
    wrapper.className = 'book-wrapper';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'book-nav book-nav--prev';
    prevBtn.setAttribute('aria-label', 'Previous page');
    prevBtn.innerHTML = '&#8249;';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'book-nav book-nav--next';
    nextBtn.setAttribute('aria-label', 'Next page');
    nextBtn.innerHTML = '&#8250;';

    var viewport = document.createElement('div');
    viewport.className = 'book-viewport';
    pages.forEach(function (p) { viewport.appendChild(p); });

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(viewport);
    wrapper.appendChild(nextBtn);

    var bookFooter = document.createElement('div');
    bookFooter.className = 'book-footer';
    var counter = document.createElement('span');
    counter.className = 'book-counter';
    bookFooter.appendChild(counter);

    stage.appendChild(wrapper);
    stage.appendChild(bookFooter);

    // ---- MODE BAR (Book / Scroll toggle) ----------------------------
    var modeBar = document.createElement('div');
    modeBar.className = 'reading-mode-bar';
    modeBar.innerHTML =
      '<div class="mode-toggle">' +
        '<button data-mode="book" class="active">&#128214;&#160;Book</button>' +
        '<button data-mode="scroll">&#9776;&#160;Scroll</button>' +
      '</div>';

    // Insert: modeBar then stage, both before the original hero
    hero.parentNode.insertBefore(modeBar, hero);
    hero.parentNode.insertBefore(stage, hero);
    hero.hidden     = true;
    article.hidden  = true;

    // Mode switching
    modeBar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-mode]');
      if (!btn) return;
      var mode = btn.getAttribute('data-mode');
      modeBar.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });
      if (mode === 'scroll') {
        stage.hidden   = true;
        hero.hidden    = false;
        article.hidden = false;
        if (typeof stopReading === 'function') stopReading();
      } else {
        stage.hidden   = false;
        hero.hidden    = true;
        article.hidden = true;
      }
    });

    // ---- NAVIGATION STATE ------------------------------------------
    var current      = 0;
    var transitioning = false;
    var transitionTimer;

    function updateUI() {
      counter.textContent = (current + 1) + ' of ' + total;
      prevBtn.disabled = (current === 0);
      nextBtn.disabled = (current === total - 1);
    }

    function finishTransition(oldPage, newPage, enterClass) {
      clearTimeout(transitionTimer);
      newPage.classList.remove('book-transitioning', enterClass);
      oldPage.classList.remove('active');
      newPage.classList.add('active');
      transitioning = false;
    }

    function goToPage(idx, direction) {
      if (idx < 0 || idx >= total || transitioning) return;
      transitioning = true;

      var enterClass = direction === 'next' ? 'book-enter-right' : 'book-enter-left';
      var oldPage    = pages[current];
      var newPage    = pages[idx];

      // Slide new page in as an absolute overlay on top of the still-visible old
      // page — avoids the flash that comes from toggling display:none/block
      newPage.classList.add('book-transitioning', enterClass);
      newPage.addEventListener('animationend', function () {
        finishTransition(oldPage, newPage, enterClass);
      }, { once: true });

      // Safety fallback: complete transition even if animationend never fires
      transitionTimer = setTimeout(function () {
        finishTransition(oldPage, newPage, enterClass);
      }, 450);

      current = idx;
      updateUI();
      stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      if (typeof stopReading === 'function') stopReading();
    }

    // ---- INIT -------------------------------------------------------
    pages[0].classList.add('active');
    updateUI();

    prevBtn.addEventListener('click', function () { goToPage(current - 1, 'prev'); });
    nextBtn.addEventListener('click', function () { goToPage(current + 1, 'next'); });

    // Swipe support
    var touchStartX = 0;
    viewport.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) {
        goToPage(current + (delta < 0 ? 1 : -1), delta < 0 ? 'next' : 'prev');
      }
    }, { passive: true });

    // Keyboard support
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') goToPage(current + 1, 'next');
      if (e.key === 'ArrowLeft')  goToPage(current - 1, 'prev');
    });

    // Expose current page so main.js read-aloud narrates only this page
    window.getCurrentBookPage = function () { return pages[current]; };
  });
})();
