// Google Apps Script for Navratri Quiz Data Collection
// Deploy this as a web app with "Execute as: Me" and "Who has access: Anyone"

function doPost(e) {
  try {
    // Set CORS headers
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    // Open the Google Sheet (replace with your actual sheet ID)
    const sheetId = '1dnHwkuncr2v2qkHDwwkgowscucnjC1FM3_bPMCKCchc'; // Your Google Sheet ID
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    // Get the data from the POST request
    const data = JSON.parse(e.postData.contents);

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Score', 'Percentage', 'Time Taken']);
    }

    // Append the data to the sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.score,
      data.percentage,
      data.timeTaken
    ]);

    // Return success response
    return output.setContent(JSON.stringify({success: true, message: 'Data submitted successfully'}));

  } catch (error) {
    // Return error response
    const errorOutput = ContentService.createTextOutput();
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput.setContent(JSON.stringify({success: false, error: error.toString()}));
  }
}

// Test function to verify the script is working
function doGet(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.TEXT);
  return output.setContent('Navratri Quiz Google Apps Script is working!');
}