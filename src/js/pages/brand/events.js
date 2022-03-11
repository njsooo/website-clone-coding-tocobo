import Swiper from "swiper";
import { gsap, ScrollTrigger, CustomEase } from "gsap/all";
import { getBodyScrollWidth, isMobileWidth } from "@/js/commons/functions";
import { BREAK_POINT_TABLET_WIDTH } from "@/js/commons/variables";

init();
initScrollTriggerHeaderColor();
initGsapArticleLogoIntroAndArticleTypingIntro();
initGsapArticlePhilosophy();
initGsapArticleCircles();
initSwiperArticleCircles();
initGsapFloatingLink();

function init() {
  window.scrollTo(0, 0);
  document.getElementById("logo-intro").style.marginRight = `${getBodyScrollWidth()}px`;
  document.body.style.overflow = "hidden";

  (function convertTypingIntroTitleTextToSpan() {
    const elTitle = document.querySelector("#typing-intro .title");
    elTitle.innerHTML = `<span style="visibility: hidden">${elTitle.innerHTML
      .split("")
      .join(`</span><span style="visibility: hidden">`)}</span>`;

    document.querySelector("#typing-intro .title span:nth-child(7)").innerHTML =
      '<br class="mobile">';
  })();
}

function initScrollTriggerHeaderColor() {
  const elHeader = document.getElementById("header");

  ScrollTrigger.create({
    trigger: document.getElementById("philosophy"),
    endTrigger: document.querySelector("main"),
    start: "top-=100 top",
    markers: false,
    onEnter: () => elHeader.classList.remove("white"),
    onLeave: () => elHeader.classList.add("white"),
    onEnterBack: () => elHeader.classList.add("white"),
    onLeaveBack: () => elHeader.classList.add("white"),
  });
}

function initGsapArticleLogoIntroAndArticleTypingIntro() {
  const svgLogoInHeader = document.querySelector("#header .nav .logo a svg");
  const svgLogoCSSInHeader = window.getComputedStyle(svgLogoInHeader);
  const svgLogoInIntro = document.querySelector("#logo-intro .logo");
  const articleLogoIntro = document.getElementById("logo-intro");

  const spanTitleSpanList = document.querySelectorAll("#typing-intro .title span");
  const typingEffectDurationInMs = 3500;
  const milliSeconds = 1000;

  gsap
    .timeline()
    .to(svgLogoInIntro, {
      top: svgLogoInHeader.getBoundingClientRect().top,
      x: "-50%",
      y: 0,
      width: svgLogoCSSInHeader.width,
      height: svgLogoCSSInHeader.height,
      duration: 1.3,
      delay: 1,
      ease: CustomEase.create("ease-in-out", "0.42, 0, 0.58, 1"),
      onComplete() {
        articleLogoIntro.style.display = "none";
        document.body.style.overflow = null;
      },
    })
    .to(spanTitleSpanList, {
      visibility: "visible",
      stagger: typingEffectDurationInMs / spanTitleSpanList.length / milliSeconds,
    })
    .fromTo(
      document.querySelector("#typing-intro .desc"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        ease: CustomEase.create("custom", "0.76, 0.09, 0.215, 1"),
      }
    )
    .fromTo(
      document.querySelector("#typing-intro .tags"),
      {
        y: 200,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: CustomEase.create("custom", "0.76, 0.09, 0.215, 1"),
      },
      "<"
    );
}

function initGsapArticlePhilosophy() {
  const articlePhilosophy = document.getElementById("philosophy");
  const elTitle = document.querySelector("#philosophy .title");
  const elDesc = document.querySelector("#philosophy .desc");

  function activateAnimation() {
    elTitle.style.animation = "move-top 2s";
    elDesc.style.animation = "move-top 3s";
  }

  function deactivateAnimation() {
    elTitle.style.animation = null;
    elDesc.style.animation = null;
  }

  ScrollTrigger.create({
    trigger: articlePhilosophy,
    start: "top bottom",
    markers: false,
    onEnter: activateAnimation,
    onLeave: deactivateAnimation,
    onEnterBack: deactivateAnimation,
    onLeaveBack: deactivateAnimation,
  });
}

function initGsapArticleCircles() {
  const elItemList = gsap.utils.toArray("#circles .item");
  [elItemList[0], elItemList[1]] = [elItemList[1], elItemList[0]];

  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      ease: CustomEase.create("custom", "0.76, 0.09, 0.215, 1"),
    },
    scrollTrigger: {
      trigger: document.getElementById("circles"),
      start: "top+=100 center",
      toggleActions: "play reset reset reset",
      markers: false,
    },
  });

  elItemList.forEach((item) => {
    const svgCircle = item.querySelector(".circle-wrap svg");
    const elCircleTitle = item.querySelector(".circle-wrap .title");
    const elMetaData = item.querySelector(".metadata");

    tl.fromTo(
      svgCircle,
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      },
      {
        strokeDashoffset: 0,
        duration: 1.5,
      }
    )
      .fromTo(
        elCircleTitle,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        "<"
      )
      .fromTo(
        elMetaData,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
        },
        "<"
      );
  });
}

function initSwiperArticleCircles() {
  let timer;
  new Swiper("#circles .swiper-container", {
    slidesPerView: 3,
    allowTouchMove: false,
    breakpoints: {
      [BREAK_POINT_TABLET_WIDTH]: {
        slidesPerView: 2,
        spaceBetween: 40,
        initialSlide: 1,
        centeredSlides: true,
        allowTouchMove: true,
      },
      480: {
        slidesPerView: 1.5,
        initialSlide: 1,
        centeredSlides: true,
        allowTouchMove: true,
      },
    },
    on: {
      beforeResize() {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (isMobileWidth()) {
            this.slideTo(1);
          }
        }, 10);
      },
    },
  });
}

function initGsapFloatingLink() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: document.getElementById("philosophy"),
        endTrigger: document.querySelector("main"),
        start: "center center",
        toggleActions: "play reverse reverse reverse",
        markers: false,
      },
    })
    .fromTo(
      document.getElementById("floating-links"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.3,
      }
    );
}
