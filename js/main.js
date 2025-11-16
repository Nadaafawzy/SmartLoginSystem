// =============>> HTML Elements
var form = document.querySelector("form");
var nameInput = document.getElementById("username-id");
var emailInput = document.getElementById("email-id");
var passwordInput = document.getElementById("password-id");
var signupBtn = document.getElementById("signup");
var message = document.getElementById("Message");
var loginBtn = document.getElementById("Login");
var userSpan = document.getElementById("user");

// ###(Regex)
var nameRegex = /^[A-Za-z0-9_-]{3,15}$/;
var emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

//=============>> function
//validation
function validate(regex, input) {
    if (regex.test(input.value)) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        showMessage("Success", "green");
        return true;
    } else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        showMessage("All inputs is required", "red")
        return false;
    }
}
// Message
function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
    message.classList.remove("d-none");
}


//=============>> Events
//signup Event
//*users Array*
var users = JSON.parse(localStorage.getItem("users")) || [];
if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        var isValid =
            validate(nameRegex, nameInput) && validate(emailRegex, emailInput) && validate(passwordRegex, passwordInput);
        var email = emailInput.value;
        var emailExists = false;
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                emailExists = true;
                break;
            }
        }
        if (emailExists === true) {
            showMessage("email already exists", "red");
        }
        if (isValid === true) {
            var user = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            };
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
        }
    })
};
// login Event
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === emailInput.value && users[i].password === passwordInput.value) {
                localStorage.setItem("currentUser", users[i].name);
                window.location.href = "home.html";
            }
            else if (emailInput.value === "" || passwordInput.value === "") {
                showMessage("All inputs are required ", "red")
            }
            else {
                showMessage("email or Password is incorrect", "red")
            }
        }
    });
}
// =====Home=====
if (userSpan) {
    var currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        userSpan.textContent = currentUser;
    }
}