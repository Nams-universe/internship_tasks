const form = document.getElementById("form");
const error_message = document.getElementById("error-message");

// REGISTER INPUTS 
const firstname_input = document.getElementById("firstname-input");
const age_input = document.getElementById("age-input");
const phone_input = document.getElementById("phone-input");
const email_input = document.getElementById("email-input");
const address_input = document.getElementById("address-input");
const pincode_input = document.getElementById("pincode-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");

// LOGIN INPUTS 
const login_email_input = document.getElementById("login-email");
const login_password_input = document.getElementById("login-password");

// FORM SUBMIT 
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    error_message.innerText = "";

    // REGISTER
    if (firstname_input) {
      const errors = getRegisterErrors();
      if (errors.length > 0) {
        error_message.innerText = errors.join(". ");
        return;
      }

      const userData = {
        firstname: firstname_input.value.trim(),
        age: age_input.value.trim(),
        phone: phone_input.value.trim(),
        email: email_input.value.trim(),
        address: address_input.value.trim(),
        pincode: pincode_input.value.trim(),
        password: password_input.value.trim(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.href = "login.html";
    }

    //  LOGIN 
    else {
      const errors = getLoginErrors();
      if (errors.length > 0) {
        error_message.innerText = errors.join(". ");
        return;
      }

      const user = JSON.parse(localStorage.getItem("userData"));
      if (!user) {
        error_message.innerText = "No user found. Please register.";
        return;
      }

      const enteredLogin = login_email_input.value.trim();
      const enteredPassword = login_password_input.value.trim();

      if (
        (enteredLogin === user.email || enteredLogin === user.phone) &&
        enteredPassword === user.password
      ) {
        window.location.href = "dashboard.html";
      } else {
        error_message.innerText = "Invalid email/phone or password";
      }
    }
  });
}

//  REGISTER VALIDATION 
function getRegisterErrors() {
  let errors = [];

  if (!firstname_input.value.trim()) errors.push("Firstname is required");

  if (!phone_input.value.trim()) errors.push("Phone is required");
  else if (phone_input.value.trim().length !== 10)
    errors.push("Phone must be 10 digits");

  if (!email_input.value.trim()) errors.push("Email is required");

  if (!password_input.value.trim())
    errors.push("Password is required");
  else if (password_input.value.length < 8)
    errors.push("Password must be at least 8 characters");

  if (password_input.value !== repeat_password_input.value)
    errors.push("Passwords do not match");

  return errors;
}

//  LOGIN VALIDATION 
function getLoginErrors() {
  let errors = [];
  if (!login_email_input.value.trim())
    errors.push("Email / Phone is required");
  if (!login_password_input.value.trim())
    errors.push("Password is required");
  return errors;
}

//  DASHBOARD + ROUTE PROTECTION 
if (window.location.pathname.includes("dashboard.html")) {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("firstname").innerText = user.firstname;
    document.getElementById("age").innerText = user.age;
    document.getElementById("phone").innerText = user.phone;
    document.getElementById("email").innerText = user.email;
    document.getElementById("address").innerText = user.address;
    document.getElementById("pincode").innerText = user.pincode;
  }
}

//  LOGOUT 
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

//  EDIT PROFILE
function enableEdit() {
  document.getElementById("viewMode").style.display = "none";
  document.getElementById("editMode").style.display = "block";

  const user = JSON.parse(localStorage.getItem("userData"));

  document.getElementById("edit-firstname").value = user.firstname;
  document.getElementById("edit-age").value = user.age;
  document.getElementById("edit-phone").value = user.phone;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("edit-address").value = user.address;
  document.getElementById("edit-pincode").value = user.pincode;
}

function saveChanges() {
  const user = JSON.parse(localStorage.getItem("userData"));

  user.firstname = document.getElementById("edit-firstname").value;
  user.age = document.getElementById("edit-age").value;
  user.phone = document.getElementById("edit-phone").value;
  user.email = document.getElementById("edit-email").value;
  user.address = document.getElementById("edit-address").value;
  user.pincode = document.getElementById("edit-pincode").value;

  localStorage.setItem("userData", JSON.stringify(user));
  location.reload();
}

//  CHANGE PASSWORD 
function openPasswordModal() {
  document.getElementById("passwordModal").style.display = "block";
}

function closePasswordModal() {
  document.getElementById("passwordModal").style.display = "none";
}

function changePassword() {
  const newPass = document.getElementById("newPassword").value;
  const confirmPass = document.getElementById("confirmPassword").value;
  const checkbox = document.getElementById("confirmCheckbox");

  if (!checkbox.checked) {
    alert("Please confirm password change");
    return;
  }

  if (newPass !== confirmPass) {
    alert("Passwords do not match");
    return;
  }

  const user = JSON.parse(localStorage.getItem("userData"));
  user.password = newPass;
  localStorage.setItem("userData", JSON.stringify(user));

  alert("Password updated successfully");
  closePasswordModal();
}
