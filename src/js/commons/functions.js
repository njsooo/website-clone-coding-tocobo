import { BREAK_POINT_TABLET_WIDTH } from "./variables";

export function getTransitionDurationInMs(el) {
  const milliseconds = 1000;
  return parseFloat(window.getComputedStyle(el).transitionDuration) * milliseconds;
}

export function isDesktopWidth() {
  if (window.innerWidth > BREAK_POINT_TABLET_WIDTH) {
    return true;
  }
  return false;
}

export function isMobileWidth() {
  if (window.innerWidth <= BREAK_POINT_TABLET_WIDTH) {
    return true;
  }
  return false;
}

export function getBodyScrollWidth() {
  return window.innerWidth - document.body.clientWidth;
}
