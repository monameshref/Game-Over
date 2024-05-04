
const inputs = document.querySelectorAll("input");
const registerBtn = document.querySelector(".register");
const message = document.querySelector(".message");
const formData = document.querySelector("form");
const spinIcon = document.querySelector(".spin-icon");
const passIcon = document.querySelector(".passIcon");
const passBtn = document.querySelector(".pass");


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
    if (
        validateName(inputs[0]) &&
        validateName(inputs[1]) &&
        validateEmail(inputs[2]) &&
        validatePassword(inputs[3]) &&
        validateAge(inputs[4])
    ) {
        isValid = true;
    } else {
        isValid = false;
    }
});

function setForm() {
    const user = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        age: inputs[4].value,
    };
    // console.log(user);
    registerForm(user);
}

async function registerForm(userData) {

    spinIcon.classList.remove("d-none");

    const api = await fetch("https://movies-api.routemisr.com/signup", {
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
        location.href = "./index.html";
        spinIcon.classList.add("d-none");
    } else {
        message.classList.add("text-danger");
        message.classList.remove("text-success");
        message.innerHTML = responce.errors?.email.message;
        spinIcon.classList.add("d-none");
    }

  // console.log(responce);
}

//! Validation
function validateName(input) {
    const regexName =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

    if (regexName.test(input.value)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");

        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");

        return false;
    }
}

function validateEmail() {
    const regexEmail =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (regexEmail.test(inputs[2].value)) {
        inputs[2].classList.add("is-valid");
        inputs[2].classList.remove("is-invalid");

        return true;
    } else {
        inputs[2].classList.remove("is-valid");
        inputs[2].classList.add("is-invalid");

        return false;
    }
}

function validatePassword() {
    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (regexPassword.test(inputs[3].value)) {
        inputs[3].classList.add("is-valid");
        inputs[3].classList.remove("is-invalid");

        return true;
    } else {
        inputs[3].classList.remove("is-valid");
        inputs[3].classList.add("is-invalid");

        return false;
    }
}

function validateAge() {
    const regexAge = /^([1-7][0-9]|80)$/;

    if (regexAge.test(inputs[4].value)) {
        inputs[4].classList.add("is-valid");
        inputs[4].classList.remove("is-invalid");

        return true;
    } else {
        inputs[4].classList.remove("is-valid");
        inputs[4].classList.add("is-invalid");

        return false;
    }
}

//! Open && Close Password Button
function password() {
    if( inputs[3].type === "password") {
        inputs[3].type = "text";
        passIcon.classList.remove("fa-lock");
        passIcon.classList.add("fa-lock-open");
    }

    else {
        inputs[3].type = "password";
        passIcon.classList.add("fa-lock");
        passIcon.classList.remove("fa-lock-open");
    }
    }

    passBtn.addEventListener("click" , function() {
        password();
    });