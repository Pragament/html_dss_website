const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { runInNewContext } = require('node:vm');
const script = readFileSync(require('node:path').join(__dirname, '../assets/js/banner-carousel.js'), 'utf8');

function setup(count, reducedMotion = false) {
    function element() {
        return {
            hidden: true, events: {}, attributes: {}, textContent: '',
            addEventListener(name, fn) { this.events[name] = fn; },
            setAttribute(name, value) { this.attributes[name] = value; }
        };
    }
    const slides = Array.from({ length: count }, element);
    if (count) slides[0].hidden = false;
    const controls = element(), status = element(), pause = element();
    const previous = element(), next = element(), carousel = element();
    const motion = Object.assign(element(), { matches: reducedMotion });
    const timers = new Map();
    let timerId = 0;
    const document = Object.assign(element(), { hidden: false, activeElement: null });
    carousel.contains = value => value === pause;
    carousel.querySelectorAll = () => slides;
    carousel.querySelector = selector => ({
        '.dss-banner-controls': controls, '[data-banner-status]': status,
        '[data-banner-pause]': pause, '[data-banner-prev]': previous,
        '[data-banner-next]': next
    })[selector];
    document.querySelector = () => count ? carousel : null;
    runInNewContext(script, { document, window: {
        matchMedia: () => motion,
        setInterval: fn => { timers.set(++timerId, fn); return timerId; },
        clearInterval: id => timers.delete(id),
        setTimeout: fn => fn()
    } });
    return { slides, controls, status, pause, previous, next, carousel, motion, document, timers };
}

test('zero or one banner requires no controls or timer', () => {
    for (const count of [0, 1]) {
        const view = setup(count);
        assert.equal(view.controls.hidden, true);
        assert.equal(view.timers.size, 0);
    }
});

test('controls wrap, show exactly one slide, and autoplay can be paused', () => {
    const view = setup(3);
    assert.equal(view.controls.hidden, false);
    assert.equal(view.timers.size, 1);
    view.previous.events.click();
    assert.deepEqual(view.slides.map(slide => slide.hidden), [true, true, false]);
    assert.equal(view.status.textContent, '3 / 3');
    view.next.events.click();
    assert.equal(view.slides[0].hidden, false);
    [...view.timers.values()][0]();
    assert.equal(view.slides[1].hidden, false);
    assert.equal(view.status.attributes['aria-live'], 'off');
    view.pause.events.click();
    assert.equal(view.timers.size, 0);
    assert.equal(view.pause.textContent, 'Play slideshow');
    view.pause.events.click();
    assert.equal(view.timers.size, 1);
});

test('hover, keyboard focus, and background tabs suspend rotation', () => {
    const view = setup(2);
    view.carousel.events.mouseenter();
    assert.equal(view.timers.size, 0);
    view.carousel.events.mouseleave();
    assert.equal(view.timers.size, 1);
    view.document.activeElement = view.pause;
    view.carousel.events.focusin();
    assert.equal(view.timers.size, 0);
    view.document.activeElement = null;
    view.carousel.events.focusout();
    assert.equal(view.timers.size, 1);
    view.document.hidden = true;
    view.document.events.visibilitychange();
    assert.equal(view.timers.size, 0);
});

test('reduced motion starts paused while manual navigation still works', () => {
    const view = setup(2, true);
    assert.equal(view.timers.size, 0);
    assert.equal(view.pause.textContent, 'Play slideshow');
    view.next.events.click();
    assert.equal(view.slides[1].hidden, false);
    assert.equal(view.timers.size, 0);
});
