initOpenAndCloseCustomerCenterInMobile();

function initOpenAndCloseCustomerCenterInMobile() {
  const btnOpenText = document.querySelector("#footer .mobile .container .center .btn-open-text");
  const btnOpenIconPlus = document.querySelector(
    "#footer .mobile .container .center .btn-open-icon-plus"
  );
  const dropdownContent = document.querySelector(
    "#footer .mobile .container .center .dropdown-content"
  );

  function toggleDropdownContent() {
    if (dropdownContent.style.maxHeight) {
      btnOpenIconPlus.classList.remove("on");
      dropdownContent.style.maxHeight = null;
    } else {
      btnOpenIconPlus.classList.add("on");
      dropdownContent.style.maxHeight = `${dropdownContent.scrollHeight}px`;
    }
  }

  btnOpenText.addEventListener("click", toggleDropdownContent);
  btnOpenIconPlus.addEventListener("click", toggleDropdownContent);
}
