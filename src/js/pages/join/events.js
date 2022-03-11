const inputId = document.getElementById("id");
const elInputIdMsg = document.querySelector("#join form .input-wrap.id .msg");

const inputPw = document.getElementById("pw");
const elInputPwMsg = document.querySelector("#join form .input-wrap.pw .msg");
const inputPwCheck = document.getElementById("pw-check");
const elInputPwCheckMsg = document.querySelector("#join form .input-wrap.pw-check .msg");

const inputPhoneNumberPart1 = document.querySelector(
  "#join form .input-wrap.phone-number input[type=text]:nth-of-type(1)"
);
const inputPhoneNumberPart2 = document.querySelector(
  "#join form .input-wrap.phone-number input[type=text]:nth-of-type(2)"
);
const elInputPhoneNumberMsg = document.querySelector("#join form .input-wrap.phone-number .msg");

const inputEmail = document.getElementById("email");
const elInputEmailMsg = document.querySelector("#join form .input-wrap.email .msg");

const inputBirthDatePart1 = document.querySelector(
  "#join form .input-wrap.birth-date input[type=text]:nth-of-type(1)"
);
const inputBirthDatePart2 = document.querySelector(
  "#join form .input-wrap.birth-date input[type=text]:nth-of-type(2)"
);
const inputBirthDatePart3 = document.querySelector(
  "#join form .input-wrap.birth-date input[type=text]:nth-of-type(3)"
);
const elInputBirthDateMsg = document.querySelector("#join form .input-wrap.birth-date .msg");

initBtnToggleTermsDetail();
initOpenAndClosePwTip();
initValidateInput();
initAgreeAll();
initBtnSubmit();

function initBtnToggleTermsDetail() {
  const elTermsList = document.querySelectorAll("#join form .terms-list .terms");

  elTermsList.forEach((elTerms) => {
    const btnToggleTermsDetail = elTerms.querySelector(".btn-toggle-terms-detail");
    const elTermsDetailWrap = elTerms.querySelector(".terms-detail-wrap");

    btnToggleTermsDetail.addEventListener("click", () => {
      btnToggleTermsDetail.classList.toggle("on");

      if (elTermsDetailWrap.style.maxHeight) {
        elTermsDetailWrap.style.maxHeight = null;
        btnToggleTermsDetail.ariaLabel = "약관 내용 열기";
      } else {
        elTermsDetailWrap.style.maxHeight = `${elTermsDetailWrap.scrollHeight}px`;
        btnToggleTermsDetail.ariaLabel = "약관 내용 닫기";
      }
    });
  });
}

function initOpenAndClosePwTip() {
  const inputPw = document.querySelector("#join form .input-wrap.pw input");
  const elPwTip = document.querySelector("#join form .input-wrap.pw .pw-tip");
  const btnClose = elPwTip.querySelector(".btn-close");

  inputPw.addEventListener("focus", () => {
    elPwTip.classList.add("on");
  });

  inputPw.addEventListener("focusout", (e) => {
    if (e.relatedTarget === btnClose) {
      inputPw.focus();
      elPwTip.classList.remove("on");
      return;
    }
    elPwTip.classList.remove("on");
  });
}

function initValidateInput() {
  inputId.addEventListener("keyup", validateInputId);
  inputPw.addEventListener("keyup", validateInputPw);
  inputPwCheck.addEventListener("keyup", validateInputPwCheck);
  inputPhoneNumberPart2.addEventListener("blur", validateInputPhoneNumber);
  inputEmail.addEventListener("keyup", validateInputEmail);
  inputBirthDatePart1.addEventListener("blur", validateInputBirthDatePart1);
  inputBirthDatePart2.addEventListener("blur", validateInputBirthDatePart2);
  inputBirthDatePart3.addEventListener("blur", validateInputBirthDatePart3);
}

function initAgreeAll() {
  const checkBoxAgreeAll = document.querySelector(
    "#join form .terms-area .agree-all input[type='checkbox']"
  );
  const termsCheckBoxList = document.querySelectorAll(
    "#join form .terms-area .terms-list .terms input[type='checkbox']"
  );

  checkBoxAgreeAll.addEventListener("change", () => {
    termsCheckBoxList.forEach((checkBox) => {
      checkBox.checked = checkBoxAgreeAll.checked;
    });
  });
}

function initBtnSubmit() {
  const btnSubmit = document.querySelector('#join form button[type="submit"]');
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validateInputId()) {
      inputId.focus();
    } else if (!validateInputPw()) {
      inputPw.focus();
    } else if (!validateInputPwCheck()) {
      inputPwCheck.focus();
    } else if (!validateInputPhoneNumber()) {
      inputId.focus();
    } else if (!validateInputEmail()) {
      inputId.focus();
    } else if (!validateInputBirthDatePart1()) {
      inputBirthDatePart1.focus();
    } else if (!validateInputBirthDatePart2()) {
      inputBirthDatePart2.focus();
    } else if (!validateInputBirthDatePart3()) {
      inputBirthDatePart3.focus();
    }
  });
}

function validateInputId() {
  elInputIdMsg.classList.remove("red");
  elInputIdMsg.classList.remove("green");
  elInputIdMsg.classList.remove("line-two");

  if (inputId.value.length === 0) {
    elInputIdMsg.classList.add("red");
    elInputIdMsg.textContent = "아이디를 입력해 주세요.";
  } else if (inputId.value.length < 4 || inputId.value.length > 16) {
    elInputIdMsg.classList.add("red");
    elInputIdMsg.textContent = "아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.";
  } else if (!/^[a-z]+[a-z0-9]{3,15}$/.test(inputId.value)) {
    elInputIdMsg.classList.add("red");
    elInputIdMsg.classList.add("line-two");
    elInputIdMsg.textContent =
      "공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다.";
  } else {
    elInputIdMsg.classList.add("green");
    elInputIdMsg.textContent = `${inputId.value}는 사용 가능한 아이디입니다.`;
    return true;
  }
  return false;
}

function validateInputPw() {
  const regExp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^()_\-={}[\]|;:<>,.?/]).{10,16}/;

  elInputPwMsg.classList.remove("red");
  elInputPwMsg.classList.remove("green");

  if (inputPwCheck.value.length > 0) {
    validateInputPwCheck();
  }

  if (regExp.test(inputPw.value)) {
    elInputPwMsg.classList.add("green");
    elInputPwMsg.textContent = "비밀번호가 올바릅니다.";
    return true;
  }
  elInputPwMsg.classList.add("red");
  elInputPwMsg.textContent = "영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자";
  return false;
}

function validateInputPwCheck() {
  elInputPwCheckMsg.classList.remove("red");
  elInputPwCheckMsg.classList.remove("green");

  if (inputPw.value === inputPwCheck.value) {
    elInputPwCheckMsg.classList.add("green");
    elInputPwCheckMsg.textContent = "비밀번호가 일치합니다.";
    return true;
  }
  elInputPwCheckMsg.classList.add("red");
  elInputPwCheckMsg.textContent = "비밀번호가 일치하지 않습니다.";
  return false;
}

function validateInputPhoneNumber() {
  const regExp = /^\d{3,4}$/;

  elInputPhoneNumberMsg.classList.remove("red");
  elInputPhoneNumberMsg.classList.remove("green");

  if (regExp.test(inputPhoneNumberPart1.value) && regExp.test(inputPhoneNumberPart2.value)) {
    elInputPhoneNumberMsg.classList.add("green");
    elInputPhoneNumberMsg.textContent = `올바른 전화번호입니다.`;
    return true;
  }
  elInputPhoneNumberMsg.classList.add("red");
  elInputPhoneNumberMsg.textContent = `올바르지 않은 전화번호입니다.`;
  return false;
}

function validateInputEmail() {
  elInputEmailMsg.classList.remove("red");
  elInputEmailMsg.classList.remove("green");

  if (/.+@.+\..+/i.test(inputEmail.value)) {
    elInputEmailMsg.classList.add("green");
    elInputEmailMsg.textContent = "올바른 이메일입니다";
    return true;
  }
  elInputEmailMsg.classList.add("red");
  elInputEmailMsg.textContent = "올바르지 않은 이메일입니다";
  return false;
}

function validateInputBirthDatePart1() {
  elInputBirthDateMsg.classList.remove("red");
  elInputBirthDateMsg.classList.remove("green");

  if (inputBirthDatePart1.value.match(/^[1-2][0-9]{3}$/)) {
    elInputBirthDateMsg.classList.add("green");
    elInputBirthDateMsg.textContent = "올바른 년도입니다.";
    return true;
  }
  elInputBirthDateMsg.classList.add("red");
  elInputBirthDateMsg.textContent = "올바르지 않은 년도입니다.";
  return false;
}

function validateInputBirthDatePart2() {
  elInputBirthDateMsg.classList.remove("red");
  elInputBirthDateMsg.classList.remove("green");

  if (inputBirthDatePart2.value.match(/(^0[1-9]$|^1[012]$)/)) {
    elInputBirthDateMsg.classList.add("green");
    elInputBirthDateMsg.textContent = "올바른 월입니다.";
    return true;
  }
  elInputBirthDateMsg.classList.add("red");
  elInputBirthDateMsg.textContent = "올바르지 않은 월입니다.";
  return false;
}

function validateInputBirthDatePart3() {
  elInputBirthDateMsg.classList.remove("red");
  elInputBirthDateMsg.classList.remove("green");

  const maxDayTable = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (inputBirthDatePart1.value % 4 === 0) {
    maxDayTable[1] += 1;
  }

  const maxDay = maxDayTable[parseInt(inputBirthDatePart2.value) - 1];

  if (validateInputBirthDatePart1() && validateInputBirthDatePart2()) {
    if (inputBirthDatePart3.value <= maxDay) {
      elInputBirthDateMsg.classList.add("green");
      elInputBirthDateMsg.textContent = "올바른 일입니다.";
      return true;
    } else {
      elInputBirthDateMsg.classList.add("red");
      elInputBirthDateMsg.textContent = "올바르지 않은 일입니다.";
    }
  }
  return false;
}
