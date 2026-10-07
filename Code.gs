/**
 * ============================================================
 * Google Apps Script — Code.gs
 * Web Development Internship Project
 * ============================================================
 * This file runs inside Google Apps Script (NOT in your website).
 *
 * HOW TO SET UP:
 * 1. Create a new Google Sheet.
 * 2. Add these headers in row 1:
 *      ID | Name | Email | Subject | Message | Timestamp
 * 3. Open Extensions > Apps Script.
 * 4. Delete any sample code and paste THIS file's contents.
 * 5. Replace YOUR_GOOGLE_SHEET_ID below with your actual Sheet ID.
 *      (The Sheet ID is the long string in the sheet URL:
 *       https://docs.google.com/spreadsheets/d/YOUR_GOOGLE_SHEET_ID/edit)
 * 6. Click Deploy > New deployment > select "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 7. Copy the Web App URL it gives you and paste it into
 *    script.js as the value of GOOGLE_SCRIPT_URL.
 * ============================================================
 */

// ⬇️ Replace this with your actual Google Sheet ID ⬇️
var SHEET_ID = "YOUR_GOOGLE_SHEET_ID";
var SHEET_NAME = "Sheet1";

/**
 * Handles GET requests.
 * Reads all responses from the Google Sheet and returns them as JSON.
 */
function doGet() {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();

  var headers = data[0];
  var rows = data.slice(1);

  var responses = rows.map(function (row) {
    var obj = {};
    headers.forEach(function (header, i) {
      obj[header] = row[i];
    });
    return obj;
  });

  return ContentService
    .createTextOutput(JSON.stringify(responses))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handles POST requests from the contact form.
 * Appends a new row with the contact form data.
 */
function doPost(e) {
  try {
    var sheet = getSheet();
    var payload;

    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      // fallback if data comes as form fields
      payload = e.parameter;
    }

    var id = payload.id || Utilities.getUuid();
    var name = payload.name || "";
    var email = payload.email || "";
    var subject = payload.subject || "";
    var message = payload.message || "";
    var timestamp = payload.timestamp || new Date().toISOString();

    sheet.appendRow([id, name, email, subject, message, timestamp]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Returns the active sheet, creating the header row if needed.
 */
function getSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["ID", "Name", "Email", "Subject", "Message", "Timestamp"]);
  }

  // If the sheet is completely empty, write the header row
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["ID", "Name", "Email", "Subject", "Message", "Timestamp"]);
  }

  return sheet;
}
