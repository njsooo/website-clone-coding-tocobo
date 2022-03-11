import Swiper from "swiper/dist/js/swiper.min";
import "swiper/dist/css/swiper.min.css";

import { getTransitionDurationInMs, isDesktopWidth } from "@/js/commons/functions";

// Commons
initScrollCorrection();
initSwiperHeaderNotice();
initCloseHeaderNotice();
initScrollHeaderBg();
initModalSearch();

// Mobile
initOpenAndCloseMobileNav();
initToggleLangDropdownInMobile();
initOpenAndCloseSubMenuInMobile();

// Because of dummy-notice-height, the scroll position after refreshing is not top
function initScrollCorrection() {
  window.addEventListener("load", () => {
    if (window.scrollY < 10) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    }
  });
}

function initSwiperHeaderNotice() {
  new Swiper("#header .notice .swiper-container", {
    direction: "vertical",
    speed: 500,
    loop: true,
    autoplay: {
      delay: 3000,
    },
  });
}

function initCloseHeaderNotice() {
  const elNotice = document.querySelector("#header .notice");
  const btnClose = document.querySelector("#header .notice .btn-close-notice");
  const elDummyNoticeHeight = document.getElementById("dummy-notice-height");

  btnClose.addEventListener("click", () => {
    elNotice.style.height = 0;
    elDummyNoticeHeight.style.height = 0;
  });
}

function initScrollHeaderBg() {
  const elHeader = document.querySelector("#header");
  const elHeaderNav = document.querySelector("#header .nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0 && !elHeader.classList.contains("no-bg")) {
      elHeaderNav.classList.add("bg");
    } else {
      elHeaderNav.classList.remove("bg");
    }
  });
}

function initOpenAndCloseMobileNav() {
  const elRightWing = document.getElementById("right-wing");
  const elMobileNav = document.querySelector("#header .nav .mobile-nav");
  const btnOpen = document.querySelector("#header .nav .btn-open-mobile-nav");
  const btnClose = document.querySelector(
    "#header .nav .mobile-nav .content .btn-close-mobile-nav"
  );

  btnOpen.addEventListener("click", () => {
    const transitionDuration = getTransitionDurationInMs(elMobileNav) - 10;

    elMobileNav.classList.add("on");
    setTimeout(() => {
      document.body.style.overflow = "hidden";
    }, transitionDuration);
    setTimeout(() => {
      elRightWing.style.display = "none";
    }, transitionDuration * 0.6);
  });

  btnClose.addEventListener("click", () => {
    elMobileNav.classList.remove("on");
    elRightWing.style.display = null;
    document.body.style.overflow = null;
  });
}

function initToggleLangDropdownInMobile() {
  const btnToggle = document.querySelector("#header .nav .mobile-nav .top .dropdown-lang > button");
  const elDropdownLang = document.querySelector("#header .nav .mobile-nav .top .dropdown-lang");
  const elDropdownLangContent = document.querySelector(
    "#header .nav .mobile-nav .top .dropdown-lang .dropdown-lang-content"
  );

  btnToggle.addEventListener("click", () => {
    if (elDropdownLangContent.classList.contains("on")) {
      elDropdownLangContent.classList.remove("on");
    } else {
      elDropdownLangContent.classList.add("on");
      window.onclick = (e) => {
        if (!elDropdownLang.contains(e.target)) {
          elDropdownLangContent.classList.remove("on");
          window.onclick = null;
        }
      };
    }
  });
}

function initOpenAndCloseSubMenuInMobile() {
  const liList = document.querySelectorAll("#header .nav .mobile-nav .center > li");
  liList.forEach((li) => {
    const elSubMenu = li.querySelector(".sub-menu");
    if (elSubMenu) {
      const btnOpen = li.querySelector("a");
      const btnClose = li.querySelector(".btn-close-sub-menu");
      btnOpen.addEventListener("click", () => {
        elSubMenu.classList.add("on");
      });
      btnClose.addEventListener("click", () => {
        elSubMenu.classList.remove("on");
      });
    }
  });
}

function initModalSearch() {
  const modalSearch = document.getElementById("modal-search");

  const btnCloseInMobile = document.querySelector("#modal-search .btn-close");
  const iconFollowCursorInDesktop = document.querySelector("#modal-search .icon-follow-cursor");

  const iconFollowCursorCSS = window.getComputedStyle(iconFollowCursorInDesktop);
  const iconFollowCursorWidth = parseInt(iconFollowCursorCSS.width);
  const iconFollowCursorHeight = parseInt(iconFollowCursorCSS.height);

  const btnOpenInDesktop = document.querySelector("#header .nav .right .search");
  const btnOpenInMobile = document.querySelector("#header .mobile-nav .top .search");

  btnOpenInDesktop.addEventListener("click", openModalSearch);
  btnOpenInMobile.addEventListener("click", openModalSearch);
  btnCloseInMobile.addEventListener("click", closeModalSearch);

  function openModalSearch(e) {
    initResizeTrigger();
    if (isDesktopWidth()) {
      activateIconFollowCursor(e);
      initCloseTriggerInDesktop();
    }
    modalSearch.style.display = "block";
    setTimeout(() => {
      modalSearch.classList.add("on");
    }, 0);
  }

  function activateIconFollowCursor(e) {
    iconFollowCursorInDesktop.style.transform = `translate(${
      e.clientX - iconFollowCursorWidth / 2
    }px, ${e.clientY - iconFollowCursorHeight / 2}px)`;
    window.onmousemove = (e) => {
      iconFollowCursorInDesktop.style.transform = `translate(${
        e.clientX - iconFollowCursorWidth / 2
      }px, ${e.clientY - iconFollowCursorHeight / 2}px)`;
    };
  }

  function initCloseTriggerInDesktop() {
    window.onclick = (e) => {
      if (e.target === modalSearch) {
        closeModalSearch();
      }
    };
  }

  function closeModalSearch() {
    deactivateIconFollowCursor();
    window.onresize = null;
    modalSearch.classList.remove("on");
    setTimeout(() => {
      modalSearch.style.display = null;
    }, getTransitionDurationInMs(modalSearch));
  }

  function deactivateIconFollowCursor() {
    window.onclick = null;
    window.onmousemove = null;
  }

  function initResizeTrigger() {
    let timer;
    window.onresize = (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isDesktopWidth()) {
          activateIconFollowCursor(e);
          initCloseTriggerInDesktop();
        } else {
          deactivateIconFollowCursor();
        }
      }, 100);
    };
  }
}
