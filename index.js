const captchaItems = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
const special = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-"];
const uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const captchaInput = document.querySelector("#captchaValue");

const generateCaptchaBtn = document.querySelector("#generate-captcha");

const form = document.querySelector("#form");

// AllImputs

const username = document.querySelector("#username");
const password = document.querySelector("#password");
const email = document.querySelector("#email");

//Captcha Value

const enteredCaptcha = document.querySelector("#valid-captcha");

/// Error Text

const errorName = document.querySelector("#error-name");
const errorEmail = document.querySelector("#error-email");
const errorPassword = document.querySelector("#error-password");
const errorCaptch = document.querySelector("#error-captcha");

// Password meter

const passwordCharacter = document.querySelector("#password-character");
const passwordUpper = document.querySelector("#password-upper");
const passwordNumber = document.querySelector("#password-number");
const passwordSpecial = document.querySelector("#password-symbol");
// generate captcha

let passwordStrength = false;

const showCatpcha = () => {
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * captchaItems.length);
    captcha += captchaItems[index];
  }
  return captcha;
};

// geneate captcha and change in input value

const captchaValue = showCatpcha();
captchaInput.setAttribute("value", captchaValue);
generateCaptchaBtn.addEventListener("click", () => {
  const newCaptchaValue = showCatpcha();
  captchaInput.setAttribute("value", newCaptchaValue);
});

// checkPassword
password.addEventListener("keyup", (e) => {
  const value = e.target.value;
  const passwordLength = value.length;
  const passwordIncludesSpecial = special.some((item) => value.includes(item));
  const passwordIncludesUpperCase = uppercaseAlphabets.some((item) =>
    value.includes(item)
  );
  const passwordIncludesNumber = numbers.some((item) => value.includes(item));

  if (passwordLength > 6) {
    passwordCharacter.classList.add("active");
  } else {
    passwordCharacter.classList.remove("active");
  }
  if (passwordIncludesUpperCase) {
    passwordUpper.classList.add("active");
  } else {
    passwordUpper.classList.remove("active");
  }
  if (passwordIncludesNumber) {
    passwordNumber.classList.add("active");
  } else {
    passwordNumber.classList.remove("active");
  }
  if (passwordIncludesSpecial) {
    passwordSpecial.classList.add("active");
  } else {
    passwordSpecial.classList.remove("active");
  }

  if (
    value.length > 6 &&
    passwordIncludesSpecial &&
    passwordIncludesUpperCase
  ) {
    passwordStrength = true;
  }
});

// form submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(passwordStrength);

  if (passwordStrength) {
  }
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  if (username.value === "" || password.value === "" || email.value === "") {
    errorName.textContent = "Username is required";
    errorPassword.textContent = "Password is required";
    errorEmail.textContent = "Email is required";
    return;
  } else {
    errorName.textContent = "";
    errorPassword.textContent = "";
    errorEmail.textContent = "";
  }

  if (captchaInput.value !== data.captcha) {
    errorCaptch.textContent = "Captcha is not valid";
    return;
  } else {
    errorCaptch.textContent = "";
  }
  if (passwordStrength) {
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => alert(err));
  }
});
