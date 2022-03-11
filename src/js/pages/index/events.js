import { gsap } from "gsap/all";

import Swiper from "swiper/dist/js/swiper.min";
import "swiper/dist/css/swiper.min.css";

import { BREAK_POINT_TABLET_WIDTH } from "@/js/commons/variables";

initSwiperArticleMainSlide();
initSwiperArticleCollection();
initSwiperArticleVeganSkinCare();
initSwiperArticleReview();

initGsapArticleCollection();
initGsapArticleReview();
initGsapArticleInstagram();

function initSwiperArticleMainSlide() {
  new Swiper("#main-slide .swiper-container", {
    speed: 400,
    navigation: {
      prevEl: "#main-slide .swiper-container .swiper-button-prev",
      nextEl: "#main-slide .swiper-container .swiper-button-next",
    },
    pagination: {
      el: "#main-slide .swiper-pagination",
      type: "fraction",
    },
    a11y: {
      prevSlideMessage: "이전 이미지",
      nextSlideMessage: "다음 이미지",
    },
    on: {
      transitionStart() {
        this.pagination.el.classList.remove("red");
        this.pagination.el.classList.remove("blue");
        this.navigation.prevEl.children[0].classList.remove("red");
        this.navigation.prevEl.children[0].classList.remove("blue");
        this.navigation.nextEl.children[0].classList.remove("red");
        this.navigation.nextEl.children[0].classList.remove("blue");

        if (this.activeIndex === 1) {
          this.pagination.el.classList.add("blue");
          this.navigation.prevEl.children[0].classList.add("blue");
          this.navigation.nextEl.children[0].classList.add("blue");
        } else if (this.activeIndex === 2) {
          this.pagination.el.classList.add("red");
          this.navigation.prevEl.children[0].classList.add("red");
          this.navigation.nextEl.children[0].classList.add("red");
        }
      },
    },
  });
}

function initSwiperArticleCollection() {
  new Swiper("#collection .swiper-container", {
    speed: 300,
    slidesPerView: 3,
    spaceBetween: 100,
    navigation: {
      prevEl: "#collection .swiper-button-prev",
      nextEl: "#collection .swiper-button-next",
    },
    pagination: {
      el: "#collection .swiper-pagination",
      type: "progressbar",
    },
    a11y: {
      prevSlideMessage: "이전 상품",
      nextSlideMessage: "다음 상품",
    },
    breakpoints: {
      [BREAK_POINT_TABLET_WIDTH]: {
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true,
      },
    },
  });
}

function initSwiperArticleVeganSkinCare() {
  new Swiper("#vegan-skincare .swiper-container", {
    speed: 400,
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
    breakpoints: {
      [BREAK_POINT_TABLET_WIDTH]: {
        spaceBetween: 15,
      },
    },
  });
}

function initSwiperArticleReview() {
  new Swiper("#review .swiper-container", {
    speed: 500,
    loop: true,
    slidesPerView: 2,
    centeredSlides: true,
    pagination: {
      el: "#review .swiper-container .swiper-pagination",
      clickable: true,
    },
    navigation: {
      prevEl: "#review .swiper-container .swiper-button-prev",
      nextEl: "#review .swiper-container .swiper-button-next",
    },
    a11y: {
      prevSlideMessage: "이전 후기",
      nextSlideMessage: "다음 후기",
    },
    breakpoints: {
      [BREAK_POINT_TABLET_WIDTH]: {
        slidesPerView: 1,
        centeredSlides: false,
      },
    },
  });
}

function initGsapArticleCollection() {
  const articleCollection = document.getElementById("collection");
  const imageList = document.querySelectorAll(
    "#collection .swiper-container .swiper-wrapper .swiper-slide .img-wrap img"
  );

  imageList.forEach((image) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: articleCollection,
          toggleActions: "play pause play pause",
          markers: false,
        },
      })
      .fromTo(
        image,
        {
          y: 10,
        },
        {
          y: -10,
          yoyo: true,
          repeat: -1,
          duration: 1.5,
          ease: "power1.inOut",
        }
      );
  });
}

function initGsapArticleReview() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: document.getElementById("review"),
        start: "top-=100 center",
        toggleActions: "play none none reverse",
        markers: false,
      },
    })
    .fromTo(
      document.querySelector("#review .swiper-container"),
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
      }
    );
}

function initGsapArticleInstagram() {
  const content = document.querySelector("#instagram ul");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: content,
        start: "top bottom",
        toggleActions: "play none none reset",
        markers: false,
      },
    })
    .fromTo(
      content,
      {
        opacity: 0.4,
      },
      {
        opacity: 1,
        duration: 1.2,
      }
    );
}
