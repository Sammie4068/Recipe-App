// Animation
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Form valiation
const SignupForm = document.querySelector(".sign-up-form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");
const usernameErrMsg = document.getElementById("name-error-msg");
const emailErrMsg = document.getElementById("email-error-msg");
const passwordErrMsg = document.getElementById("password-error-msg");
const confirmPasswordErrMsg = document.getElementById("password2-error-msg");
const signupMsg = document.getElementById("sign-up-msg");
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

SignupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    nameValidation() &&
    emailValidation() &&
    passwordValidation() &&
    confirmPasswordValidation()
  ) {
    let userData = {
      name: username.value.trim(),
      email: email.value.trim(),
      password: password.value,
    };
    postData(`${baseURL}register`, userData);
  }
});

function nameValidation() {
  if (username.value === "") {
    usernameErrMsg.innerText = "Please enter your name";
    usernameErrMsg.classList.add("error");
  } else if (username.value.trim().length < 3) {
    usernameErrMsg.innerText = "Name must be at least 3 characters";
    usernameErrMsg.classList.add("error");
  } else {
    usernameErrMsg.innerText = "";
    return true;
  }
}
username.addEventListener("input", nameValidation);

function emailValidation() {
  if (email.value === "") {
    emailErrMsg.innerText = "Please enter your email address";
    emailErrMsg.classList.add("error");
  } else if (!email.value.match(emailPattern)) {
    emailErrMsg.innerText = "Please enter a valid email";
    emailErrMsg.classList.add("error");
  } else {
    emailErrMsg.innerText = "";
    return true;
  }
}
email.addEventListener("input", emailValidation);

function passwordValidation() {
  if (password.value === "") {
    passwordErrMsg.innerText = "Please enter a password";
    passwordErrMsg.style.marginLeft = "2rem";
    passwordErrMsg.classList.add("error");
  } else if (!password.value.match(passwordPattern)) {
    passwordErrMsg.innerHTML =
      "Please enter atleast 8 charatcer with number, symbol, small and capital letter.";
    passwordErrMsg.style.marginLeft = "-6rem";
    passwordErrMsg.classList.add("error");
  } else {
    passwordErrMsg.innerText = "";
    return true;
  }
}
password.addEventListener("input", passwordValidation);

function confirmPasswordValidation() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordErrMsg.innerText = "Password don't match";
    confirmPasswordErrMsg.classList.add("error");
  } else {
    confirmPasswordErrMsg.innerText = "";
    return true;
  }
}
confirmPassword.addEventListener("input", confirmPasswordValidation);

// Post request to server
const baseURL = "http://localhost:3000/users/";

async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const bodydata = await res.json();
    if (bodydata.message == "Success") {
      signupMsg.textContent = "Registration Successful";
      signupMsg.style.color = "green";
      username.value = "";
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      setTimeout(() => {
        signupMsg.textContent = "";
        container.classList.remove("sign-up-mode");
      }, 2000);
    }
    if (bodydata.message == "Already Exists") {
      signupMsg.textContent = "Email Already Exist";
      signupMsg.style.color = "red";
      email.value = "";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

// Signin Auth
const signinForm = document.querySelector(".sign-in-form");
const signinEmail = document.getElementById("email-signin");
const signinPassword = document.getElementById("password-signin");
const signinMsg = document.getElementById("sign-in-msg");

async function loginPost(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bodydata = await res.json();
    if (bodydata.message == "Invalid") {
      signinMsg.textContent = "Invalid Email or Password";
      signinMsg.style.color = "red";
    }
    if (bodydata.message == "logged") {
      signinEmail.value = "";
      signinPassword.value = "";
      signinMsg.textContent = "Logged In";
      signinMsg.style.color = "green";
      signinEmail.blur()
      signinPassword.blur()
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userData = {
    email: signinEmail.value.trim(),
    password: signinPassword.value,
  };
  loginPost(`${baseURL}login`, userData);
});