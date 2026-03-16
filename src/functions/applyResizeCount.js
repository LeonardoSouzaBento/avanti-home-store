export function applyResizeCount(onResize) {
  let windowWidthInitial = window.innerWidth;
  let resizeDowntime = null;
  let resizeCount = 0;

  function handleResize() {
    if (resizeDowntime) {
      clearTimeout(resizeDowntime);
    }

    resizeDowntime = setTimeout(() => {
      const widthOfWindow = window.innerWidth;

      if (widthOfWindow !== windowWidthInitial) {
        resizeCount++;
        windowWidthInitial = widthOfWindow;

        if (onResize) {
          onResize(resizeCount);
        }
      }
    }, 500);
  }

  window.addEventListener("resize", handleResize);

  return function destroy() {
    window.removeEventListener("resize", handleResize);
    if (resizeDowntime) {
      clearTimeout(resizeDowntime);
    }
  };
}

