function validateLogin() {
  var username = document.getElementById("uname").value;
  var password = document.getElementById("pwd").value;

  if (username === "admin" && password === "password123") {
    window.location.href = "index.html";
  } else {
    console.log("Invalid credentials");
    document.querySelector(".modal").style.display = "block";
  }
}

function dismissModal() {
  document.querySelector(".modal").style.display = "none";
}

function toggleNav() {
  var sidebar = document.querySelector(".nav-sidebar");
  var sidebarList = document.querySelector(".nav-sidebar ul");

  if (sidebar.style.width === "200px") {
    sidebar.style.width = "50px";
    sidebarList.style.visibility = "hidden";
  } else {
    sidebar.style.width = "200px";
    sidebarList.style.visibility = "visible";
  }
}
