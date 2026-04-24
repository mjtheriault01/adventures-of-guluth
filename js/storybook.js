(function () {
  'use strict';

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

    // Cover: hero image fills the fixed viewport
    var coverPage = document.createElement('div');
    coverPage.className = 'book-page book-page--cover';
    coverPage.appendChild(hero.cloneNode(true));
    var hint = document.createElement('p');
    hint.className = 'book-cover-hint';
    hint.textContent = 'Tap ▸ or swipe to begin';
    coverPage.appendChild(hint);
    pages.push(coverPage);

    // One page per <p> inside story-sections — guarantees no page overflows.
    // Other blocks (story-image, dads-question, story-end) get one page each.
    Array.from(article.children).forEach(function (block) {
      if (block.classList.contains('story-section')) {
        Array.from(block.querySelectorAll('p')).forEach(function (para) {
          pages.push(makePage(para));
        });
      } else {
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

    // ---- MODE BAR ---------------------------------------------------
    var modeBar = document.createElement('div');
    modeBar.className = 'reading-mode-bar';
    modeBar.innerHTML =
      '<div class="mode-toggle">' +
        '<button data-mode="book" class="active">&#128214;&#160;Book</button>' +
        '<button data-mode="scroll">&#9776;&#160;Scroll</button>' +
      '</div>';

    hero.parentNode.insertBefore(modeBar, hero);
    hero.parentNode.insertBefore(stage, hero);
    hero.hidden    = true;
    article.hidden = true;

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

    // ---- NAVIGATION -------------------------------------------------
    var current       = 0;
    var transitioning = false;
    var transitionTimer;

    function updateUI() {
      counter.textContent = (current + 1) + ' of ' + total;
      prevBtn.disabled = (current === 0);
      nextBtn.disabled = (current === total - 1);
    }

    function goToPage(idx, direction) {
      if (idx < 0 || idx >= total || transitioning) return;
      transitioning = true;

      var enterClass = direction === 'next' ? 'book-enter-right' : 'book-enter-left';
      var oldPage    = pages[current];
      var newPage    = pages[idx];

      // New page slides in at z-index:2 while old stays fully visible at z-index:1.
      // The viewport has a fixed height so the surrounding layout never reflows.
      newPage.classList.add('active', enterClass);

      function done() {
        clearTimeout(transitionTimer);
        oldPage.classList.remove('active');   // now hidden (opacity:0)
        newPage.classList.remove(enterClass); // drops back to z-index:1
        transitioning = false;
      }

      newPage.addEventListener('animationend', done, { once: true });
      // Fallback: complete even if animationend never fires (reduced-motion etc.)
      transitionTimer = setTimeout(done, 450);

      current = idx;
      updateUI();
      if (typeof stopReading === 'function') stopReading();
    }

    // ---- INIT -------------------------------------------------------
    pages[0].classList.add('active');
    updateUI();

    prevBtn.addEventListener('click', function () { goToPage(current - 1, 'prev'); });
    nextBtn.addEventListener('click', function () { goToPage(current + 1, 'next'); });

    // Swipe
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

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') goToPage(current + 1, 'next');
      if (e.key === 'ArrowLeft')  goToPage(current - 1, 'prev');
    });

    window.getCurrentBookPage = function () { return pages[current]; };
  });
})();
