// ===== AUTH MODAL FUNCTIONALITY =====
const showLoginBtn = document.getElementById('showLogin');
const showSignupBtn = document.getElementById('showSignup');
const authModal = document.getElementById('authModal');
const closeModal = authModal.querySelector('.close');

const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

function openModal(formType) {
  authModal.style.display = 'block';
  if (formType === 'login') {
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
  } else {
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
  }
}

showLoginBtn.addEventListener('click', () => openModal('login'));
showSignupBtn.addEventListener('click', () => openModal('signup'));

closeModal.addEventListener('click', () => {
  authModal.style.display = 'none';
  loginForm.classList.remove('active');
  signupForm.classList.remove('active');
});

// Close modal if user clicks outside modal content
window.addEventListener('click', (e) => {
  if (e.target === authModal) {
    authModal.style.display = 'none';
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
  }
});

// ===== VIEW MORE DROPDOWN FUNCTIONALITY =====
const viewMoreButtons = document.querySelectorAll('.view-more-btn');

viewMoreButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const dealDropdown = btn.nextElementSibling; // assumes .deal-dropdown follows button
    if (dealDropdown) {
      dealDropdown.classList.toggle('show');
      // optional: change button text dynamically
      btn.textContent = dealDropdown.classList.contains('show') ? 'View Less' : 'View More';
    }
  });
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
});

// Optional: hide menu when clicking outside
window.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
    menu.classList.remove('show-menu');
  }
});
// ===== SIMPLE USER STORAGE (LOCALSTORAGE) =====

// Signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("signupConfirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const user = {
    name,
    email,
    password
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Signup successful! You can now log in.");
  signupForm.reset();

  openModal("login"); // switch to login
});


// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    alert(`Welcome back, ${storedUser.name}!`);
    authModal.style.display = "none";
    loginForm.reset();
  } else {
    alert("Invalid email or password");
  }

  document.querySelector(".auth-buttons").innerHTML = `<span>Welcome, ${storedUser.name}</span>`;
});

// ===== SEARCH FUNCTION =====
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  const destination = document.getElementById("searchDestination").value.toLowerCase();

  if (!destination) {
    alert("Please enter a destination");
    return;
  }

  // Simple redirect logic
  if (destination.includes("paris")) {
    window.location.href = "/pages/paris.html";
  } else if (destination.includes("tokyo")) {
    window.location.href = "/pages/tokyo.html";
  } else if (destination.includes("new york")) {
    window.location.href = "/pages/new_york.html";
  } else if (destination.includes("cape town")) {
    window.location.href = "/pages/cape_town.html";
  } else {
    alert("Destination not found");
  }
});