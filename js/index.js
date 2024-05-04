const inputs = document.querySelectorAll("input");
const registerBtn = document.querySelector(".register");
const message = document.querySelector(".message");
const formData = document.querySelector("form");
const spinIcon = document.querySelector(".spin-icon");


const mode = document.querySelector(".mode");
//! Theme localStorage
if (localStorage.getItem("theme") != null) {

        const themeData = localStorage.getItem("theme");

        if (themeData === "light") {
            mode.classList.replace("fa-sun","fa-moon");
        }
        else {
            mode.classList.replace("fa-moon","fa-sun");
        }

        document.querySelector("html").setAttribute("data-theme",themeData);
}

//! Dark & Light Mode
mode.addEventListener("click", function (e) {

  if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme" , "light");
      mode.classList.replace("fa-sun","fa-moon");

      localStorage.setItem("theme","light");
  }
  else{
      document.querySelector("html").setAttribute("data-theme" , "dark");
      mode.classList.replace("fa-moon","fa-sun");

      localStorage.setItem("theme","dark");
  }

});


let isValid = false;

formData.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isValid === true) {
    setForm();
  } else {
    message.innerHTML = "All required inputs";
    message.classList.add("text-danger");
  }
});

formData.addEventListener("input", function () {
  if (validateEmail(inputs[0]) && validatePassword(inputs[1])) {
    isValid = true;
  } else {
    isValid = false;
  }
});

function setForm() {
  const user = {
    email: inputs[0].value,
    password: inputs[1].value,
  };

  // console.log(user);

  loginForm(user);
}

async function loginForm(userData) {
  spinIcon.classList.remove("d-none");

  const api = await fetch("https://movies-api.routemisr.com/signin", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const responce = await api.json();

  if (responce.message === "success") {
    message.classList.add("text-success");
    message.classList.remove("text-danger");
    message.innerHTML = "Success";
    localStorage.setItem("userToken", responce.token);
    location.href = "./home.html";
    spinIcon.classList.add("d-none");
  } else {
    message.classList.add("text-danger");
    message.classList.remove("text-success");
    message.innerHTML = responce.message;
    spinIcon.classList.add("d-none");
  }

  // console.log(responce);
}

//! Validation
function validateEmail() {
  const regexEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  if (regexEmail.test(inputs[0].value)) {
    inputs[0].classList.add("is-valid");
    inputs[0].classList.remove("is-invalid");

    return true;
  } else {
    inputs[0].classList.remove("is-valid");
    inputs[0].classList.add("is-invalid");

    return false;
  }
}

function validatePassword() {
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (regexPassword.test(inputs[1].value)) {
    inputs[1].classList.add("is-valid");
    inputs[1].classList.remove("is-invalid");

    return true;
  } else {
    inputs[1].classList.remove("is-valid");
    inputs[1].classList.add("is-invalid");

    return false;
  }
}

//! Open && Close Password Button
const passIcon = document.querySelector(".passIcon");
const passBtn = document.querySelector(".pass");

function password() {
  if( inputs[1].type === "password") {
      inputs[1].type = "text";
      passIcon.classList.remove("fa-lock");
      passIcon.classList.add("fa-lock-open");
  }

  else {
      inputs[1].type = "password";
      passIcon.classList.add("fa-lock");
      passIcon.classList.remove("fa-lock-open");
  }
  }

  passBtn.addEventListener("click" , function() {
      password();
  });
