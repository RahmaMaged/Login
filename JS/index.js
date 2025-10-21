var userEmail = document.getElementById("userEmail");
var userPassword = document.getElementById("userPassword");
var userName = document.getElementById("userName");
var users = [];
var signUpButton = document.getElementById("signUpBtn");
var logInButton = document.getElementById("logInBtn");
var formText = document.getElementById("formText");
var validationText = document.getElementById("validationText");
userName.addEventListener("input", validateUserName);
userEmail.addEventListener("input", validateEmail);
userPassword.addEventListener("input", validatePassword);

if (localStorage.getItem("Users")) {
  users = JSON.parse(localStorage.getItem("Users"));
}

var signUpMode = false;

function updateFormToSignUp(event) {
  if (event) event.preventDefault();
  signUpMode = true;
  validationText.classList.add("d-none");
  userName.classList.remove("d-none");
  signUpButton.classList.remove("d-none");
  logInButton.classList.add("d-none");
  formText.innerHTML = `You have an account?
          <a class="text-decoration-none text-white" href="">Sign In</a>`;
}

function validateUserName() {
  if (signUpMode) {
    var nameValue = userName.value.trim();

    var validName = nameValue.length > 2;

    if (validName) {
      userName.classList.add("is-valid");
      userName.classList.remove("is-invalid");
      validationText.classList.add("d-none");
    } else {
      userName.classList.add("is-invalid");
      userName.classList.remove("is-valid");
      validationText.innerHTML = "Name must be more than 2 chracters";
      validationText.classList.add("text-danger");
      validationText.classList.remove("d-none");
    }

    return validName;
  }
}

function validateEmail() {
  if (signUpMode) {
    var emailValue = userEmail.value.trim();

    var emailPattern = /^\w{3,20}@(yahoo|gmail|hotmail)\.(com|net)$/;

    var validEmail = emailPattern.test(emailValue);

    var newEmail = true;

    for (var i = 0; i < users.length; i++) {
      if (emailValue === users[i].user_Email) {
        newEmail = false;
      }
    }

    if (!validEmail) {
      validationText.classList.remove("d-none");
      validationText.innerHTML = "Email is not valid";
      validationText.classList.add("text-danger");
    } else if (!newEmail) {
      validationText.classList.remove("d-none");
      validationText.innerHTML = "Email already exists";
      validationText.classList.add("text-danger");
    } else {
      validationText.classList.add("d-none");
    }

    if (validEmail && newEmail) {
      userEmail.classList.add("is-valid");
      userEmail.classList.remove("is-invalid");
    } else {
      userEmail.classList.add("is-invalid");
      userEmail.classList.remove("is-valid");
    }

    return validEmail && newEmail;
  }
}

function validatePassword() {
  if (signUpMode) {
    var passwordValue = userPassword.value;

    var validPassword = passwordValue.length >= 8;

    if (validPassword) {
      userPassword.classList.add("is-valid");
      userPassword.classList.remove("is-invalid");
      validationText.classList.add("d-none");
    } else {
      userPassword.classList.add("is-invalid");
      userPassword.classList.remove("is-valid");
      validationText.innerHTML = "Password must be more than 7 chracters";
      validationText.classList.add("text-danger");
      validationText.classList.remove("d-none");
    }

    return validPassword;
  }
}

function addUser() {
  validationText.classList.add("d-none");

  if (!validateUserName() || !validateEmail() || !validatePassword()) {
    validationText.innerHTML = "All inputs are required";
    validationText.classList.remove("text-success");
    validationText.classList.add("text-danger");
    validationText.classList.remove("d-none");

    return;
  }

  validationText.classList.add("d-none");

  var user = {
    user_Name: userName.value,
    user_Email: userEmail.value,
    user_Password: userPassword.value,
  };

  users.push(user);
  localStorage.setItem("Users", JSON.stringify(users));
  userName.classList.remove("is-valid");
  userEmail.classList.remove("is-valid");
  userPassword.classList.remove("is-valid");
  clearInputs();
  updateFormToLogIn();
}

function clearInputs() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}

function updateFormToLogIn() {
  signUpMode = false;
  validationText.classList.add("d-none");
  userEmail.classList.remove("is-valid", "is-invalid");
  userPassword.classList.remove("is-valid", "is-invalid");
  userName.classList.add("d-none");
  signUpButton.classList.add("d-none");
  logInButton.classList.remove("d-none");
  formText.innerHTML = `Don’t have an account?
          <a
            class="text-decoration-none text-white"
            onclick="updateFormToSignUp(event)"
            href=""
            >Sign Up</a
          >`;
}

function login() {
  if (userEmail.value == "" || userPassword.value == "") {
    validationText.innerHTML = "All inputs are required";
    validationText.classList.add("text-danger");
    validationText.classList.remove("d-none");
    return;
  }

  for (var i = 0; i < users.length; i++) {
    if (
      userEmail.value == users[i].user_Email &&
      userPassword.value == users[i].user_Password
    ) {
      validationText.classList.add("d-none");
      localStorage.setItem("LoginUser", users[i].user_Name);
      window.open("../Pages/home.html", "_self");
      return;
    } else if (userEmail.value != users[i].user_Email) {
      validationText.innerHTML = "incorrect email";
      validationText.classList.add("text-danger");
      validationText.classList.remove("d-none");
    } else if (userPassword.value != users[i].user_Password) {
      validationText.innerHTML = "incorrect password";
      validationText.classList.add("text-danger");
      validationText.classList.remove("d-none");
    }
  }
}
