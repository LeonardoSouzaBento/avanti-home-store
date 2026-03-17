export function applyMouseScrollX(parent, wrapper, options = {}) {
  const scrollStart = options.scrollStart || "start";

  let parentWidth = 0;
  let scrollWidth = 0;

  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let inertiaFrame = null;

  let lastX = 0;
  let lastTime = 0;
  let velocity = 0;

  const VELOCITY_THRESHOLD = 0.5;
  const INERTIA_MULTIPLIER = 300;
  const MAX_EXTRA_SCROLL = 500;

  function updateSizes() {
    parentWidth = parent.offsetWidth;
    scrollWidth = wrapper.scrollWidth;
  }

  function initialScroll() {
    if (scrollWidth <= parentWidth) return;

    if (scrollStart === "center") {
      wrapper.scrollLeft = Math.max(0, (scrollWidth - parentWidth) / 2);
    } else {
      wrapper.scrollLeft = 0;
    }
  }

  updateSizes();
  initialScroll();

  const maxScroll = () => scrollWidth - parentWidth;
  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  function onMouseDown(e) {
    if (inertiaFrame) {
      cancelAnimationFrame(inertiaFrame);
      inertiaFrame = null;
    }

    isDragging = true;
    startX = e.pageX;
    startScrollLeft = wrapper.scrollLeft;

    lastX = e.pageX;
    lastTime = performance.now();
    velocity = 0;

    wrapper.style.userSelect = "none";
  }

  function onMouseMove(e) {
    if (!isDragging) return;

    const deltaX = e.pageX - startX;
    wrapper.scrollLeft = clamp(
      startScrollLeft - deltaX,
      0,
      maxScroll()
    );

    const now = performance.now();
    const dx = e.pageX - lastX;
    const dt = now - lastTime;

    if (dt > 0) velocity = dx / dt;

    lastX = e.pageX;
    lastTime = now;
  }

  function applyInertia() {
    if (Math.abs(velocity) < VELOCITY_THRESHOLD) return;

    let extraScroll = -velocity * INERTIA_MULTIPLIER;
    extraScroll = clamp(extraScroll, -MAX_EXTRA_SCROLL, MAX_EXTRA_SCROLL);

    const start = wrapper.scrollLeft;
    const target = clamp(start + extraScroll, 0, maxScroll());
    const duration = 400;
    const startTime = performance.now();

    function animate(time) {
      const progress = clamp((time - startTime) / duration, 0, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      wrapper.scrollLeft = start + (target - start) * easeOut;

      if (progress < 1) {
        inertiaFrame = requestAnimationFrame(animate);
      }
    }

    inertiaFrame = requestAnimationFrame(animate);
  }

  function stopDragging(e) {
    if (!isDragging) return;
    isDragging = false;
    applyInertia();
    e.preventDefault();
    e.stopPropagation();
  }

  wrapper.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", stopDragging);
  wrapper.addEventListener("mouseleave", stopDragging);

  return {
    update() {
      updateSizes();
      initialScroll();
    },

    destroy() {
      wrapper.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      wrapper.removeEventListener("mouseleave", stopDragging);
    }
  };
}

