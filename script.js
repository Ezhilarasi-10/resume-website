/* ===================================================
   Resume / Portfolio — script.js
   Handles: navigation, theme, contact form,
   localStorage responses, admin login & responses.
   =================================================== */

/* ----------------------------------------------------
   CONFIG: Google Apps Script Web App URL
   ----------------------------------------------------
   To connect Google Sheets:
   1. Open Google Sheets and create a sheet with headers:
      ID | Name | Email | Subject | Message | Timestamp
   2. Extensions > Apps Script, paste Code.gs content.
   3. Deploy > New deployment > Web app.
      - Execute as: Me
      - Who has access: Anyone
   4. Copy the deployment URL and paste it below.
   If left as the placeholder, the site keeps using localStorage.
   ---------------------------------------------------- */
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

/* localStorage keys */
const RESPONSES_KEY = "portfolioResponses";
const THEME_KEY = "portfolioTheme";

/* ===================================================
   THEME
   =================================================== */
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.setAttribute("data-theme", "dark");
    themeIcon.textContent = "☀️";
  } else {
    document.body.removeAttribute("data-theme");
    themeIcon.textContent = "🌙";
  }
}

// Restore saved theme
const savedTheme = localStorage.getItem(THEME_KEY) || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const isDark = document.body.getAttribute("data-theme") === "dark";
  const next = isDark ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

/* ===================================================
   MOBILE NAVIGATION
   =================================================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ===================================================
   CONTACT FORM
   =================================================== */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const formError = document.getElementById("formError");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // basic client-side validation
  if (!name || !email || !subject || !message) {
    formError.hidden = false;
    formSuccess.hidden = true;
    return;
  }

  // simple email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formError.hidden = false;
    formSuccess.hidden = true;
    return;
  }

  formError.hidden = true;

  // create response object
  const response = {
    id: Date.now().toString(),
    name: name,
    email: email,
    subject: subject,
    message: message,
    timestamp: new Date().toISOString(),
  };

  // save to localStorage (JSON)
  saveResponse(response);

  // try Google Apps Script if configured (non-blocking)
  if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
    sendToGoogleScript(response);
  }

  // success message + reset form
  formSuccess.hidden = false;
  contactForm.reset();

  // hide success message after 4 seconds
  setTimeout(() => {
    formSuccess.hidden = true;
  }, 4000);
});

/* Save a response into localStorage as JSON */
function saveResponse(response) {
  let responses = [];
  try {
    const raw = localStorage.getItem(RESPONSES_KEY);
    if (raw) {
      responses = JSON.parse(raw);
      if (!Array.isArray(responses)) responses = [];
    }
  } catch (err) {
    responses = [];
  }
  responses.push(response);
  localStorage.setItem(RESPONSES_KEY, JSON.stringify(responses));
}

/* Optional: send to Google Apps Script (only if URL is configured) */
function sendToGoogleScript(response) {
  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(response),
  }).catch(() => {
    // silently ignore — localStorage already saved the data
  });
}

/* ===================================================
   ADMIN LOGIN & RESPONSES
   =================================================== */
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

const adminLoginForm = document.getElementById("adminLoginForm");
const adminLoginWrap = document.getElementById("adminLoginWrap");
const adminResponsesWrap = document.getElementById("adminResponsesWrap");
const adminError = document.getElementById("adminError");
const logoutBtn = document.getElementById("logoutBtn");
const responsesList = document.getElementById("responsesList");

adminLoginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const user = document.getElementById("adminUser").value.trim();
  const pass = document.getElementById("adminPass").value.trim();

  if (user === DEMO_USER && pass === DEMO_PASS) {
    adminError.hidden = true;
    adminLoginWrap.hidden = true;
    adminResponsesWrap.hidden = false;
    adminLoginForm.reset();
    renderResponses();
  } else {
    adminError.hidden = false;
  }
});

logoutBtn.addEventListener("click", () => {
  adminResponsesWrap.hidden = true;
  adminLoginWrap.hidden = false;
});

/* Retrieve responses from localStorage and display them */
function renderResponses() {
  let responses = [];
  try {
    const raw = localStorage.getItem(RESPONSES_KEY);
    if (raw) {
      responses = JSON.parse(raw);
      if (!Array.isArray(responses)) responses = [];
    }
  } catch (err) {
    responses = [];
  }

  responsesList.innerHTML = "";

  if (responses.length === 0) {
    responsesList.innerHTML = '<p class="no-responses">No responses received yet.</p>';
    return;
  }

  responses.forEach((r) => {
    const item = document.createElement("div");
    item.className = "response-item";

    const nameEl = document.createElement("p");
    nameEl.innerHTML = "<strong>Name:</strong> " + escapeHtml(r.name);

    const emailEl = document.createElement("p");
    emailEl.innerHTML = "<strong>Email:</strong> " + escapeHtml(r.email);

    const subjectEl = document.createElement("p");
    subjectEl.innerHTML = "<strong>Subject:</strong> " + escapeHtml(r.subject);

    const messageEl = document.createElement("p");
    messageEl.innerHTML = "<strong>Message:</strong> " + escapeHtml(r.message);

    const timeEl = document.createElement("p");
    timeEl.className = "resp-time";
    timeEl.textContent = "Timestamp: " + formatTimestamp(r.timestamp);

    item.append(nameEl, emailEl, subjectEl, messageEl, timeEl);
    responsesList.appendChild(item);
  });
}

/* Helper: format ISO timestamp into readable date/time */
function formatTimestamp(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch (e) {
    return ts;
  }
}

/* Helper: escape HTML to avoid breaking layout from user input */
function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
