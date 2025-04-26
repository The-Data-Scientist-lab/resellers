// Spreadsheet headers
const HEADERS = [
  'Date',
  'Time (24h)',
  'Time of Day',
  'IP Address',
  'Country',
  'City',
  'Region',
  'Timezone',
  'Model Name',
  'Plan Name',
  'Amount',
  'Full Name',
  'Email',
  'Phone',
  'WhatsApp Number',
  'Reason',
  'Screenshot Name',
  'Has Screenshot',
  'Status',
  'Form Type',
  'Browser Info',
  'Device Type',
  'App URL'
];

function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return 'Morning';
  if (hour >= 12 && hour < 17) return 'Afternoon';
  if (hour >= 17 && hour < 20) return 'Evening';
  return 'Night';
}

// This function runs when the web app receives a POST request
function doPost(e) {
  try {
    // Parse the incoming data - handle both JSON and form data
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // If JSON parsing fails, try form data
        data = e.parameter;
        // Parse nested location object if it's a string
        if (typeof data.location === 'string') {
          data.location = JSON.parse(data.location);
        }
      }
    } else {
      data = e.parameter;
      // Parse nested location object if it's a string
      if (typeof data.location === 'string') {
        data.location = JSON.parse(data.location);
      }
    }

    // Parse the timestamp
    const date = new Date(data.timestamp);
    const formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
    const formattedTime = Utilities.formatDate(date, Session.getScriptTimeZone(), "HH:mm:ss");
    const timeOfDay = getTimeOfDay(date.getHours());

    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Always update headers to ensure they're correct
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    
    // Auto-resize columns for headers
    sheet.autoResizeColumns(1, HEADERS.length);
    
    // Prepare row data in the same order as headers
    const rowData = [
      formattedDate,
      formattedTime,
      timeOfDay,
      data.ip,
      data.location.country,
      data.location.city,
      data.location.region,
      data.location.timezone,
      data.modelName,
      data.planName,
      data.amount,
      data.fullName,
      data.email,
      data.phone,
      data.whatsappNumber,
      data.reason,
      data.screenshotName || '',
      data.hasScreenshot,
      data.status,
      data.type,
      data.browserInfo,
      data.deviceType,
      'https://script.google.com/macros/s/AKfycbz--h3KJrYzdibaXAUVvPBIX4H8XbcljQGTvZ0kFvS6Sv9MRHlqhhWzhBR8noC1yMfy/exec'
    ];
    
    // Add new row to the next available row
    const lastRow = Math.max(sheet.getLastRow(), 1);
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    // Auto-resize columns after new data
    sheet.autoResizeColumns(1, HEADERS.length);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data successfully recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function runs when the web app receives a GET request
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'The web app is running'
  })).setMimeType(ContentService.MimeType.JSON);
} 