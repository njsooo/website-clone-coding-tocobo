import Swiper from "swiper";
import { getTransitionDurationInMs, getBodyScrollWidth } from "@/js/commons/functions";

initSwiperNav();
initChangeViewMod();
initModalCart();

function initSwiperNav() {
  new Swiper("#shop .header .nav.swiper-container", {
    slidesPerView: "auto",
    allowTouchMove: false,
    breakpoints: {
      640: {
        allowTouchMove: true,
      },
    },
  });
}

function initChangeViewMod() {
  const btnBigView = document.querySelector("#shop .content .view-mode .btn-big-view");
  const btnSmallView = document.querySelector("#shop .content .view-mode .btn-small-view");
  const ulItemList = document.querySelector("#shop .content .item-list");

  btnBigView.addEventListener("click", () => {
    btnBigView.classList.add("on");
    btnSmallView.classList.remove("on");
    ulItemList.classList.add("big-view");
    ulItemList.classList.remove("small-view");
  });

  btnSmallView.addEventListener("click", () => {
    btnBigView.classList.remove("on");
    btnSmallView.classList.add("on");
    ulItemList.classList.remove("big-view");
    ulItemList.classList.add("small-view");
  });
}

function initModalCart() {
  const itemList = [];
  const elHeader = document.querySelector("#header");
  const modalCart = document.getElementById("modal-cart");
  const modalCartContent = document.querySelector("#modal-cart .content");
  const btnOpenList = document.querySelectorAll("#shop .content .item-list .item .btn-add-to-cart");
  const btnCloseList = document.querySelectorAll("#modal-cart .btn-close");
  const ulItemList = document.querySelector("#modal-cart .content .item-list");
  const transitionDurationInMs = getTransitionDurationInMs(modalCartContent);

  btnOpenList.forEach((btnOpen) => {
    btnOpen.addEventListener("click", () => {
      const elItem = btnOpen.parentElement;
      const imgSrc = elItem.querySelector(".img-wrap img").src;
      const name = elItem.querySelector(".metadata .name-ko").textContent;
      const price = elItem.querySelector(".metadata .prices .price").textContent;

      pushToItemList(name, price, imgSrc);
      render();

      window.onclick = (e) => {
        if (modalCart.classList.contains("on") && !modalCartContent.contains(e.target)) {
          closeModalCart();
        }
      };

      openModalCart();
    });
  });

  btnCloseList.forEach((btnClose) => {
    btnClose.addEventListener("click", () => {
      closeModalCart();
    });
  });

  function openModalCart() {
    const scrollWidth = getBodyScrollWidth();

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollWidth}px`;
    elHeader.style.width = `${elHeader.clientWidth - scrollWidth}px`;
    modalCart.style.display = "block";
    setTimeout(() => {
      modalCart.classList.add("on");
    }, 0);
  }

  function closeModalCart() {
    window.onclick = null;
    modalCart.classList.remove("on");
    setTimeout(() => {
      document.body.style.overflow = null;
      document.body.style.paddingRight = null;
      elHeader.style.width = null;
      modalCart.style.display = null;
    }, transitionDurationInMs);
  }

  function pushToItemList(name, price, imgSrc) {
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].name === name) {
        itemList[i].amount++;
        return;
      }
    }
    itemList.push({
      name,
      price,
      amount: 1,
      imgSrc,
    });
  }

  function render() {
    while (ulItemList.firstChild) {
      ulItemList.removeChild(ulItemList.lastChild);
    }
    itemList.forEach((item) => {
      ulItemList.appendChild(createItemEl(item));
    });
  }

  function createItemEl(item) {
    const template = document.createElement("template");
    template.innerHTML = `<li class="item">
      <a href="#" class="img-wrap">
        <img src="${item.imgSrc}" alt="${item.name}" />
      </a>
      <div class="metadata">
        <a href="#" class="name">
          <span>${item.name}</span>
        </a>
        <div class="amount">
          <span class="text-ko">수량</span>
          <span class="num">${item.amount}</span>
        </div>
        <span class="price">${item.price}</span>
      </div>
    </li>`;
    return template.content.firstChild;
  }
}
