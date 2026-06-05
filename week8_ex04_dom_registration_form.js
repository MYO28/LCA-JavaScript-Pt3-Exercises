document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  const formMessage = document.getElementById("formMessage");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;
      formMessage.textContent = "";

      usernameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      confirmPasswordError.textContent = "";

      usernameInput.style.borderColor = "";
      emailInput.style.borderColor = "";
      passwordInput.style.borderColor = "";
      confirmPasswordInput.style.borderColor = "";

      if (usernameInput.value.trim() === "") {
        usernameError.textContent = "Username cannot be empty";
        usernameInput.style.borderColor = "red";
        isValid = false;
      }

      if (emailInput.value.trim() === "") {
        emailError.textContent = "Email cannot be empty";
        emailInput.style.borderColor = "red";
        isValid = false;
      } else if (!emailInput.value.includes("@")) {
        emailError.textContent = "Email must contain an '@' symbol";
        emailInput.style.borderColor = "red";
        isValid = false;
      }

      if (passwordInput.value === "") {
        passwordError.textContent = "Password cannot be empty";
        passwordInput.style.borderColor = "red";
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        passwordInput.style.borderColor = "red";
        isValid = false;
      }

      if (confirmPasswordInput.value === "") {
        confirmPasswordError.textContent = "Confirm Password cannot be empty";
        confirmPasswordInput.style.borderColor = "red";
        isValid = false;
      } else if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        confirmPasswordInput.style.borderColor = "red";
        isValid = false;
      }

      if (isValid) {
        formMessage.textContent = "Registration successful!";
        formMessage.style.color = "green";

        console.log("Registration Successful!");
        console.log("Username:", usernameInput.value.trim());
        console.log("Email:", emailInput.value.trim());

        form.reset();
      }
    });
  }
});
