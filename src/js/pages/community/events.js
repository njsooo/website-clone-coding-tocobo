import { gsap, CustomEase } from "gsap/all";

initAccordionArticleCommunity();

function initAccordionArticleCommunity() {
  const elQAndAList = document.querySelectorAll("#community .content .q-and-a-list .q-and-a");

  elQAndAList.forEach((item) => {
    initAccordion(item);
  });

  function initAccordion(item) {
    const elQuestion = item.querySelector(".question");
    const elAnswer = item.querySelector(".answer");
    const elIconPlus = item.querySelector(".icon-plus");

    elQuestion.addEventListener("click", () => {
      elQuestion.classList.toggle("on");
      elIconPlus.classList.toggle("on");

      if (elAnswer.style.display) {
        gsap.to(elAnswer, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.5,
          ease: CustomEase.create("ease", "0.25, 0.1, 0.25, 1"),
          onComplete() {
            elAnswer.style = null;
          },
        });
      } else {
        const computedStyle = getComputedStyle(elAnswer);
        const paddingTop = parseInt(computedStyle.paddingTop);
        const paddingBottom = parseInt(computedStyle.paddingTop);

        gsap.set(elAnswer, {
          display: "block",
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
        });
        gsap.to(elAnswer, {
          height: "auto",
          paddingTop,
          paddingBottom,
          duration: 0.5,
          ease: CustomEase.create("ease", "0.25, 0.1, 0.25, 1"),
          onComplete() {
            elAnswer.style = null;
            elAnswer.style.display = "block";
          },
        });
      }
    });
  }
}
