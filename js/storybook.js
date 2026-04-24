(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hero    = document.querySelector('.story-hero');
    var article = document.querySelector('.story-container');
    if (!hero || !article) return;

    // ---- BUILD PAGES ----
    var pages = [];

    // Page 0: Cover — clone the hero image + title overlay
    var coverPage = document.createElement('div');
    coverPage.className = 'book-page book-page--cover';
    coverPage.appendChild(hero.cloneNode(true));
    var hint = document.createElement('p');
    hint.className = 'book-cover-hint';
    hint.textContent = 'Tap ▸ or swipe to begin';
    coverPage.appendChild(hint);
    pages.push(coverPage);

    // Pages 1+: Each direct child of the article = one book page
    Array.from(article.children).forEach(function (block) {
      var page  = document.createElement('div');
      page.className = 'book-page';
      var inner = document.createElement('div');
      inner.className = 'book-page-inner';
      inner.appendChild(block.cloneNode(true));
      page.appendChild(inner);
      pages.push(page);
    });

    var total = pages.length;

    // ---- ASSEMBLE STAGE ----
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

    // Swap originals for the book stage
    hero.parentNode.insertBefore(stage, hero);
    hero.hidden  = true;
    article.hidden = true;

    // ---- STATE ----
    var current = 0;

    function updateUI() {
      counter.textContent = (current + 1) + ' of ' + total;
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    function goToPage(idx, direction) {
      if (idx < 0 || idx >= total) return;

      var enterClass = direction === 'next' ? 'book-enter-right' : 'book-enter-left';
      var oldPage    = pages[current];
      var newPage    = pages[idx];

      // Hide outgoing page immediately
      oldPage.classList.remove('active');

      // Slide/fade new page in
      newPage.classList.add(enterClass);
      newPage.addEventListener('animationend', function handler() {
        newPage.classList.remove(enterClass);
        newPage.classList.add('active');
        newPage.removeEventListener('animationend', handler);
      }, { once: true });

      current = idx;
      updateUI();

      // Keep the stage in view on mobile after a page turn
      stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Stop any active narration when the page changes
      if (typeof stopReading === 'function') stopReading();
    }

    // ---- INIT ----
    pages[0].classList.add('active');
    updateUI();

    prevBtn.addEventListener('click', function () { goToPage(current - 1, 'prev'); });
    nextBtn.addEventListener('click', function () { goToPage(current + 1, 'next'); });

    // ---- SWIPE (touch) ----
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

    // ---- KEYBOARD ----
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') goToPage(current + 1, 'next');
      if (e.key === 'ArrowLeft')  goToPage(current - 1, 'prev');
    });

    // ---- EXPOSE CURRENT PAGE FOR READ-ALOUD ----
    // main.js checks window.getCurrentBookPage() to know which paragraphs to narrate
    window.getCurrentBookPage = function () { return pages[current]; };
  });
})();
