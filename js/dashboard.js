// DASHBOARD JAVASCRIPT



// Get sidebar
const sidebar = document.getElementById("sidebar");


// Get menu button
const menuToggle =
    document.getElementById("menuToggle");


// Get logout button
const logoutButton =
    document.getElementById("logoutButton");



// MOBILE SIDEBAR


menuToggle.addEventListener("click", function () {

    sidebar.classList.toggle("show");

});



// LOGOUT


logoutButton.addEventListener("click", function () {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        // Remove login information
        localStorage.removeItem(
            "schoolLoggedIn"
        );

        localStorage.removeItem(
            "schoolUsername"
        );

        localStorage.removeItem(
            "rememberMe"
        );


        // Go back to login
        window.location.href =
            "index.html";

    }

});



// ATTENDANCE CLASS


const attendanceClass =
    document.getElementById("attendanceClass");

attendanceClass.addEventListener(
    "change",
    function () {

        console.log(
            "Selected class:",
            this.value
        );

    }
);



// NOTIFICATION


const notificationButton =
    document.querySelector(
        ".notification-button"
    );

notificationButton.addEventListener(
    "click",
    function () {

        alert(
            "You have 3 new notifications."
        );

    }
);


// CHECK LOGIN


const loggedIn =
    localStorage.getItem(
        "schoolLoggedIn"
    );


// If user is not logged in,
// return to login page.

if (loggedIn !== "true") {

    window.location.href =
        "index.html";

}