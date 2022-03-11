import { gsap, ScrollTrigger, CustomEase } from "gsap/all";

initRightWingAnimation();
initBtnToTop();

function initRightWingAnimation() {
  const elRightWing = document.getElementById("right-wing");

  ScrollTrigger.create({
    start: document.getElementById("logo-intro") ? 170 : 0,
    end: "bottom top",
    markers: false,
    onEnter: () => elRightWing.classList.add("on"),
    onLeave: () => elRightWing.classList.remove("on"),
    onEnterBack: () => elRightWing.classList.remove("on"),
    onLeaveBack: () => elRightWing.classList.remove("on"),
  });
}

function initBtnToTop() {
  const btnToTop = document.querySelector("#right-wing .btn-to-top");
  btnToTop.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 0.5,
      ease: CustomEase.create("ease", "0.25, 0.1, 0.25, 1"),
    });
  });
}
