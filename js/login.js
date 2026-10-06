// LOGIN SYSTEM



// Get elements
const loginForm = document.getElementById("loginForm");

const usernameInput = document.getElementById("username");

const passwordInput = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const togglePassword =
    document.getElementById("togglePassword");

const usernameError =
    document.getElementById("usernameError");

const passwordError =
    document.getElementById("passwordError");

const loginMessage =
    document.getElementById("loginMessage");



// DEMO LOGIN DETAILS


const correctUsername = "Brajesh";

const correctPassword = "bks321";



// CHECK EXISTING LOGIN


const isLoggedIn =
    localStorage.getItem("schoolLoggedIn");

if (isLoggedIn === "true") {

    // User is already logged in

    // We will activate this after creating
    // the dashboard in Step 3.

    console.log("User already logged in.");

}



// SHOW / HIDE PASSWORD


togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "👁";

    }

});



// LOGIN FORM


loginForm.addEventListener("submit", function (event) {

    // Stop page refresh
    event.preventDefault();


    // Get values
    const username =
        usernameInput.value.trim();

    const password =
        passwordInput.value.trim();


    // Clear previous messages
    usernameError.textContent = "";

    passwordError.textContent = "";

    loginMessage.textContent = "";

    loginMessage.className = "login-message";


    let isValid = true;



    // USERNAME VALIDATION


    if (username === "") {

        usernameError.textContent =
            "Please enter your username.";

        isValid = false;

    }



    // PASSWORD VALIDATION


    if (password === "") {

        passwordError.textContent =
            "Please enter your password.";

        isValid = false;

    }


    // Stop if fields are empty
    if (!isValid) {

        return;

    }



    // CHECK LOGIN


    if (
        username === correctUsername &&
        password === correctPassword
    ) {

        // Save login status
        localStorage.setItem(
            "schoolLoggedIn",
            "true"
        );


        // Save username
        localStorage.setItem(
            "schoolUsername",
            username
        );


        // Remember me
        if (rememberMe.checked) {

            localStorage.setItem(
                "rememberMe",
                "true"
            );

        } else {

            localStorage.removeItem(
                "rememberMe"
            );

        }


        // Success message
        loginMessage.textContent =
            "Login successful! Redirecting...";

        loginMessage.classList.add("success");


        // Dashboard will be created in Step 3
        setTimeout(function () {

            window.location.href =
                "dashboard.html";

        }, 1000);


    } else {

        // Incorrect credentials

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.classList.add("error");

    }

});



// FORGOT PASSWORD


const forgotPassword =
    document.getElementById("forgotPassword");

forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    alert(
        "Demo project: Please contact the school administrator to reset your password."
    );

});