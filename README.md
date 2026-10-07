# Web Development Internship Project

A simple, beginner-friendly web development internship submission with three parts:

1. **Resume / Portfolio Website** — built with HTML5, CSS3 and vanilla JavaScript.
2. **React Contact Cards** — a small React app to create and display contact cards.
3. **React Like Card** — a tiny React app using `useState` to like/unlike cards.

## Main Technologies

- HTML5, CSS3, JavaScript (vanilla)
- React (for the two mini projects)
- localStorage (for storing contact responses and theme)
- Google Sheets + Google Apps Script (optional integration)

## Main Website Features

- Responsive navigation bar with smooth scrolling and mobile menu
- Home, About, Education, Skills, Projects, Resume and Contact sections
- Working Contact Me form with client-side validation
- Responses saved to `localStorage` as JSON under the key `portfolioResponses`
- Admin login (demo credentials) to view stored responses
- Logout button
- Light / dark theme toggle (saved in `localStorage`)

### Admin Demo Credentials

- Username: `admin`
- Password: `admin123`

## React Contact Cards (`react-contact-cards/`)

A React SPA where a user fills in a form and contact cards are created dynamically.

- `UserForm.jsx` — the input form
- `UserList.jsx` — receives users and renders the list
- `ContactCard.jsx` — reusable card that displays one contact
- Data is passed between components using **props**.

## React Like Card (`react-like-card/`)

A very small React app that uses `useState` to toggle a "Liked / Not liked" label on each card.

- `Card.jsx` — reusable card with a Like button
- `App.jsx` — renders multiple cards with different titles passed as props

## How to Run the React Projects

1. Make sure [Node.js](https://nodejs.org) is installed.
2. Open a terminal in the project folder.
3. Run:

   ```bash
   cd react-contact-cards
   npm install
   npm run dev
   ```

   For the other project:

   ```bash
   cd react-like-card
   npm install
   npm run dev
   ```

4. Open the local URL shown in the terminal.

## About localStorage

`localStorage` is a built-in browser feature that lets a website save data
which stays available even after the page is refreshed or reopened.

In this project we use it for two things:

- **Contact responses** — saved as JSON under the key `portfolioResponses`.
- **Theme preference** — saved under the key `portfolioTheme`.

## Google Apps Script Integration

The file `Code.gs` contains `doGet()` and `doPost()` functions that let a
Google Sheet act like a simple database for the contact form.

To connect it:

1. Create a Google Sheet with headers: `ID | Name | Email | Subject | Message | Timestamp`.
2. Open **Extensions > Apps Script** and paste the contents of `Code.gs`.
3. Replace `YOUR_GOOGLE_SHEET_ID` in `Code.gs` with your real Sheet ID.
4. Deploy as a Web app (Execute as: Me, Who has access: Anyone).
5. Copy the Web App URL into `script.js` as the value of `GOOGLE_SCRIPT_URL`.

Until the URL is configured, the website keeps working using `localStorage`.

## Publishing the Main Website with GitHub Pages

1. Push the project to a GitHub repository.
2. In the repo settings, open **Pages**.
3. Choose the branch (usually `main`) and the root folder.
4. Save — your `index.html` will be live at
   `https://your-username.github.io/your-repo-name/`.

> No server or backend is needed for the main website.
