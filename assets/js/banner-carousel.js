(function () {
    'use strict';

    var carousel = document.querySelector('.dss-banner-carousel');
    if (!carousel) return;
    var slides = carousel.querySelectorAll('.dss-banner-slide');
    if (slides.length < 2) return;

    var controls = carousel.querySelector('.dss-banner-controls');
    var status = carousel.querySelector('[data-banner-status]');
    var pause = carousel.querySelector('[data-banner-pause]');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var paused = motion.matches;
    var index = 0;
    var timer;
    var hovered = false;

    function show(next, announce) {
        slides[index].hidden = true;
        index = (next + slides.length) % slides.length;
        slides[index].hidden = false;
        // Automatic changes should not interrupt screen-reader announcements.
        status.setAttribute('aria-live', announce ? 'polite' : 'off');
        status.textContent = (index + 1) + ' / ' + slides.length;
    }

    function schedule() {
        window.clearInterval(timer);
        pause.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
        if (!paused && !hovered && !document.hidden && !carousel.contains(document.activeElement)) {
            timer = window.setInterval(function () { show(index + 1, false); }, 6000);
        }
    }

    carousel.querySelector('[data-banner-prev]').addEventListener('click', function () {
        show(index - 1, true);
        schedule();
    });
    carousel.querySelector('[data-banner-next]').addEventListener('click', function () {
        show(index + 1, true);
        schedule();
    });
    pause.addEventListener('click', function () {
        paused = !paused;
        schedule();
    });
    carousel.addEventListener('mouseenter', function () { hovered = true; schedule(); });
    carousel.addEventListener('mouseleave', function () { hovered = false; schedule(); });
    carousel.addEventListener('focusin', schedule);
    carousel.addEventListener('focusout', function () { window.setTimeout(schedule, 0); });
    document.addEventListener('visibilitychange', schedule);
    motion.addEventListener('change', function () { paused = motion.matches; schedule(); });
    controls.hidden = false;
    schedule();
}());
