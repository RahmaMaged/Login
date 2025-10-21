var home = document.getElementById("home");
home.innerHTML = `Welcome ${localStorage.getItem("LoginUser")}`;

function logOut() {
  window.open("../index.html", "_self");
}
