export const testCasesData = [
  {
    id: "TC_HAPPY_001",
    title: "Valid invoice upload with dashboard update",
    complexity: "Medium complexity",
    duration: "15 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading a valid invoice file successfully updates the dashboard so that the new invoice is reflected",
    tags: ["upload", "happy path", "critical", "dashboard"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as johndoe@virtusa.com with upload permission, Valid invoice file available",
    dependencies: "Dashboard access, Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Locate and click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'Invoice_Q4_2023.pdf' and click 'Open'",
      "Observe the upload progress indicator",
      "Wait for the upload confirmation message to appear"
    ],
    expectedResult: "Confirmation message 'Invoice uploaded successfully' displayed, and 'Invoice_Q4_2023.pdf' visible on Dashboard Page"
  },
  {
    id: "TC_ERROR_001",
    title: "Upload unsupported file type (.exe)",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an unsupported .exe file type triggers an error so that invalid formats are rejected",
    tags: ["upload", "validation", "error handling", "security"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as janedoe@virtusa.com with upload permission, Unsupported file available",
    dependencies: "Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'malware.exe' and click 'Open'"
    ],
    expectedResult: "Error message 'Unsupported file type. Please upload only PDF, JPG, or PNG files.' displayed, file not uploaded"
  },
  {
    id: "TC_ERROR_002",
    title: "Upload oversized file (50MB)",
    complexity: "Medium complexity",
    duration: "12 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading a 50MB PDF invoice file triggers an error so that oversized files are prevented from processing",
    tags: ["upload", "validation", "size limit", "error handling"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as marysmith@virtusa.com with upload permission, 50MB PDF file available (system limit 25MB)",
    dependencies: "Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'LargeInvoice_ProjectX.pdf' and click 'Open'"
    ],
    expectedResult: "Error message 'File size exceeds the 25MB limit. Please upload a smaller file.' displayed, file not uploaded"
  },
  {
    id: "TC_EXCEPTION_001",
    title: "Upload with backend service offline",
    complexity: "High complexity",
    duration: "20 mins",
    status: "pending review",
    statusColor: "orange",
    description: "Verify that an invoice upload fails gracefully when the backend service is offline so that the user is notified of system unavailability",
    tags: ["upload", "exception handling", "backend", "reliability"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as davidlee@virtusa.com with upload permission, Valid invoice file available, InvoiceUploadService offline",
    dependencies: "Upload permission, Backend service configuration",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'Invoice_Test_Offline.pdf' and click 'Open'",
      "Observe the application's response during the upload attempt"
    ],
    expectedResult: "Error message 'Upload service currently unavailable. Please try again later.' displayed, invoice not uploaded or visible on dashboard"
  },
  {
    id: "TC_EXPLORATORY_001",
    title: "Upload file with special characters in filename",
    complexity: "Medium complexity",
    duration: "18 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading a 20MB invoice file named 'Inv!ce#_Q1_2024$.pdf' correctly processes and displays on the dashboard so that special characters in filenames are supported",
    tags: ["upload", "exploratory", "special characters", "edge case"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as emilychen@virtusa.com with upload permission, PDF file with special characters in filename available",
    dependencies: "Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'Inv!ce#_Q1_2024$.pdf' and click 'Open'",
      "Observe the upload progress indicator",
      "Wait for the upload confirmation message to appear",
      "Verify the newly uploaded invoice entry on the dashboard"
    ],
    expectedResult: "Confirmation message 'Invoice uploaded successfully' displayed, and 'Inv!ce#_Q1_2024$.pdf' appears on Dashboard Page with name and content intact"
  },
  {
    id: "TC_HAPPY_002",
    title: "Valid PDF invoice upload success",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that a logged-in user can successfully upload a valid invoice PDF file so that the file is processed without errors",
    tags: ["upload", "happy path", "PDF", "validation"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as qauser@virtusa.com, Valid PDF invoice file available",
    dependencies: "User authentication",
    testSteps: [
      "Log in to the application as qauser@virtusa.com",
      "Navigate to the DashboardPage",
      "Locate and click the 'Upload Invoice' button",
      "In the SystemFileDialog, select the 'invoice_valid.pdf' file",
      "Click 'Open' or 'Upload' to initiate the transfer"
    ],
    expectedResult: "Invoice file successfully uploaded, no upload error message displayed on the DashboardPage"
  },
  {
    id: "TC_ERROR_003",
    title: "Upload JPG file type validation",
    complexity: "Low complexity",
    duration: "8 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an unsupported file type like a .jpg triggers a specific error message so that the user is informed about the invalid format",
    tags: ["upload", "validation", "file type", "error handling"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as qauser@virtusa.com, JPG file available for upload",
    dependencies: "User authentication",
    testSteps: [
      "Log in to the application as qauser@virtusa.com",
      "Navigate to the DashboardPage",
      "Locate and click the 'Upload Invoice' button",
      "In the SystemFileDialog, select the 'image.jpg' file",
      "Click 'Open' or 'Upload' to initiate the transfer"
    ],
    expectedResult: "Error message 'Unsupported file format. Please upload PDF or CSV files.' displayed on the DashboardPage"
  },
  {
    id: "TC_ERROR_004",
    title: "Upload file exceeding size limit",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an invoice file exceeding 10MB triggers an error message so that the user is informed about the size limit",
    tags: ["upload", "validation", "size limit", "error handling"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as qauser@virtusa.com, PDF file larger than 10MB available",
    dependencies: "User authentication",
    testSteps: [
      "Log in to the application as qauser@virtusa.com",
      "Navigate to the DashboardPage",
      "Locate and click the 'Upload Invoice' button",
      "In the SystemFileDialog, select the 'large_invoice.pdf' file (15MB)",
      "Click 'Open' or 'Upload' to initiate the transfer"
    ],
    expectedResult: "Error message 'File size exceeds the maximum allowed limit of 10MB.' displayed on the DashboardPage"
  },
  {
    id: "TC_EXCEPTION_002",
    title: "Network interruption during upload",
    complexity: "High complexity",
    duration: "25 mins",
    status: "pending review",
    statusColor: "orange",
    description: "Verify that a network interruption during invoice upload triggers an appropriate error so that the user can attempt to retry the upload",
    tags: ["upload", "network", "exception handling", "retry"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as qauser@virtusa.com, Valid invoice file available, Ability to simulate network disconnection",
    dependencies: "User authentication, Network simulation capability",
    testSteps: [
      "Log in to the application as qauser@virtusa.com",
      "Navigate to the DashboardPage",
      "Locate and click the 'Upload Invoice' button",
      "In the SystemFileDialog, select the 'invoice_network_test.pdf' file",
      "Click 'Open' or 'Upload' to initiate the transfer",
      "Immediately simulate a network disconnection",
      "Observe the application's response to the interrupted upload"
    ],
    expectedResult: "Error message 'Network error: Unable to complete upload. Please check your internet connection and try again.' displayed on the DashboardPage"
  },
  {
    id: "TC_EXPLORATORY_002",
    title: "Upload password-protected PDF",
    complexity: "Medium complexity",
    duration: "15 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading a password-protected invoice PDF file triggers an appropriate error message so that the user understands the file cannot be processed",
    tags: ["upload", "exploratory", "password protection", "validation"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as qauser@virtusa.com, Password-protected PDF file available",
    dependencies: "User authentication",
    testSteps: [
      "Log in to the application as qauser@virtusa.com",
      "Navigate to the DashboardPage",
      "Locate and click the 'Upload Invoice' button",
      "In the SystemFileDialog, select the 'invoice_protected.pdf' file",
      "Click 'Open' or 'Upload' to initiate the transfer",
      "Observe the application's response to the protected file"
    ],
    expectedResult: "Error message 'Unable to process invoice: File is password protected or corrupted.' displayed on the DashboardPage"
  },
  {
    id: "TC_HAPPY_003",
    title: "Upload Invoice button visibility for authorized user",
    complexity: "Low complexity",
    duration: "5 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify a logged-in user with upload permission sees the Upload Invoice button so they can proceed with invoice submission",
    tags: ["authorization", "happy path", "UI visibility"],
    preconditions: "Browser Chrome v122, OS Windows 11, User 'john.doe@virtusa.com' registered with upload invoice permission, User logged in with active session",
    dependencies: "User authentication, Permission system",
    testSteps: [
      "Navigate to the application login page",
      "Log in using valid credentials for 'john.doe@virtusa.com'",
      "Observe the Dashboard Page after successful login",
      "Locate the 'Upload Invoice' button on the Dashboard, specifically near the Invoice List Table"
    ],
    expectedResult: "'Upload Invoice' button should be clearly visible and enabled on the Dashboard Page"
  },
  {
    id: "TC_ERROR_005",
    title: "Upload Invoice button hidden for unauthorized user",
    complexity: "Low complexity",
    duration: "5 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify a logged-in user without upload permission does not see the Upload Invoice button so unauthorized access is prevented",
    tags: ["authorization", "security", "UI visibility", "error handling"],
    preconditions: "Browser Chrome v122, OS Windows 11, User 'jane.doe@virtusa.com' registered without upload invoice permission, User logged in with active session",
    dependencies: "User authentication, Permission system",
    testSteps: [
      "Navigate to the application login page",
      "Log in using valid credentials for 'jane.doe@virtusa.com'",
      "Observe the Dashboard Page after successful login",
      "Attempt to locate the 'Upload Invoice' button"
    ],
    expectedResult: "'Upload Invoice' button should not be visible on the Dashboard Page"
  },
  {
    id: "TC_ERROR_006",
    title: "Unauthenticated user dashboard access prevention",
    complexity: "Medium complexity",
    duration: "8 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify an unauthenticated user cannot access Dashboard or view Upload Invoice button so system security is maintained",
    tags: ["security", "authentication", "access control", "error handling"],
    preconditions: "Browser Chrome v122, OS Windows 11, No user currently logged into the application",
    dependencies: "Authentication system",
    testSteps: [
      "Clear browser cache and cookies to ensure no active session",
      "Attempt to directly navigate to the Dashboard Page URL",
      "Observe the application's response"
    ],
    expectedResult: "User redirected to login page or receives 'Access Denied' message, Dashboard Page with Upload Invoice button not displayed"
  },
  {
    id: "TC_EXCEPTION_003",
    title: "Permission service unavailability handling",
    complexity: "High complexity",
    duration: "20 mins",
    status: "needs revision",
    statusColor: "red",
    description: "Verify user permission service unavailability affects Upload Invoice button behavior so system stability is preserved",
    tags: ["exception handling", "permissions", "service availability", "reliability"],
    preconditions: "Browser Chrome v122, OS Windows 11, User 'support.user@virtusa.com' logged in with upload permission, UserPermissionService offline",
    dependencies: "User authentication, Permission service configuration",
    testSteps: [
      "Simulate a failure or unresponsiveness of the 'UserPermissionService'",
      "Log in as 'support.user@virtusa.com'",
      "Navigate to the Dashboard Page",
      "Observe the state and visibility of the 'Upload Invoice' button"
    ],
    expectedResult: "'Upload Invoice' button disabled or not visible, appropriate error message displayed (e.g., 'Permissions service unavailable')"
  },
  {
    id: "TC_EXPLORATORY_003",
    title: "Dashboard partial load button consistency",
    complexity: "High complexity",
    duration: "22 mins",
    status: "pending approval",
    statusColor: "orange",
    description: "Verify Dashboard partial load or delays ensure Upload Invoice button consistency so users avoid UI confusion",
    tags: ["exploratory", "performance", "UI consistency", "loading"],
    preconditions: "Browser Chrome v122, OS Windows 11, User 'admin.user@virtusa.com' with upload permission, 500+ previously uploaded invoices, High latency network conditions",
    dependencies: "User authentication, Large dataset, Network simulation",
    testSteps: [
      "Simulate high latency and partial packet loss network conditions",
      "Log in as 'admin.user@virtusa.com'",
      "Navigate to the Dashboard Page and observe the loading process",
      "During and after loading of other components, check presence, state, and interactivity of 'Upload Invoice' button"
    ],
    expectedResult: "'Upload Invoice' button loads synchronously and is fully functional, or remains hidden/disabled until all dependencies are loaded"
  },
  {
    id: "TC_HAPPY_004",
    title: "Successful invoice upload with confirmation",
    complexity: "Medium complexity",
    duration: "15 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that a valid invoice file upload displays a success message so that the logged-in user is informed",
    tags: ["upload", "confirmation", "happy path", "notification"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as johndoe@virtusa.com, Valid invoice file available, InvoiceDatabase accessible",
    dependencies: "User authentication, Database connectivity",
    testSteps: [
      "Navigate to the invoice upload section of the application",
      "Select and upload the valid invoice file 'invoice_Q3_2023.pdf'",
      "Click the 'Upload' button",
      "Observe the confirmation displayed on the screen",
      "Verify the DashboardPage is updated to reflect the new invoice",
      "Check for a success notification from the NotificationService",
      "Confirm that InvoiceDetails are summarized on the confirmation screen",
      "Look for NextStepGuidance related to invoice processing"
    ],
    expectedResult: "'Invoice uploaded successfully' message displayed to the logged-in user"
  },
  {
    id: "TC_ERROR_007",
    title: "Unsupported file type upload error",
    complexity: "Low complexity",
    duration: "8 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an unsupported file type triggers an error message so that the user is informed",
    tags: ["upload", "validation", "error handling", "file type"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as janedoe@virtusa.com, Unsupported file type available",
    dependencies: "User authentication",
    testSteps: [
      "Navigate to the invoice upload section of the application",
      "Attempt to select and upload the unsupported file 'virus.exe'",
      "Click the 'Upload' button"
    ],
    expectedResult: "Error message indicating 'Unsupported file type' or similar displayed, invoice not uploaded"
  },
  {
    id: "TC_EXCEPTION_004",
    title: "Database unavailability during upload",
    complexity: "High complexity",
    duration: "25 mins",
    status: "pending review",
    statusColor: "orange",
    description: "Verify that an invoice upload fails gracefully during database unavailability so that the user is notified",
    tags: ["exception handling", "database", "reliability", "upload"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as peter.parker@virtusa.com, Valid invoice file available, InvoiceDatabase temporarily unavailable",
    dependencies: "User authentication, Database configuration",
    testSteps: [
      "Navigate to the invoice upload section of the application",
      "Select and begin uploading the valid invoice file 'quarterly_report.pdf'",
      "During the upload process, trigger the simulated InvoiceDatabase unavailability",
      "Observe the application's response"
    ],
    expectedResult: "System error message (e.g., 'Service temporarily unavailable') displayed, invoice not confirmed or stored"
  },
  {
    id: "TC_EXPLORATORY_004",
    title: "Large file upload with network instability",
    complexity: "High complexity",
    duration: "30 mins",
    status: "pending approval",
    statusColor: "orange",
    description: "Verify that uploading a 50MB 'Invoice_!@#.pdf' with network instability provides status so that data is handled correctly",
    tags: ["exploratory", "large file", "network", "special characters"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as mary.jane@virtusa.com, Large invoice file with special characters available, Network simulation tool configured",
    dependencies: "User authentication, Network simulation capability",
    testSteps: [
      "Navigate to the invoice upload section of the application",
      "Select and begin uploading the file 'Invoice_!@#.pdf'",
      "Activate the network simulation tool to introduce intermittent network instability",
      "Observe the upload progress and any messages displayed",
      "Deactivate the network simulation tool and allow the upload to complete or fail"
    ],
    expectedResult: "System displays appropriate status messages (e.g., 'Retrying', 'Upload Failed') and ensures data integrity upon completion or failure"
  },
  {
    id: "TC_HAPPY_005",
    title: "Valid PDF file upload and capture",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that a user can upload a valid PDF invoice file so that the system captures the file",
    tags: ["upload", "happy path", "file capture", "PDF"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in and on page with Upload Invoice button, Valid PDF invoice file available",
    dependencies: "User authentication, File system access",
    testSteps: [
      "Click the 'Upload Invoice' button",
      "In the System File Dialog, navigate to the folder containing 'invoice_Q3_2023.pdf'",
      "Select 'invoice_Q3_2023.pdf'",
      "Click 'Open' or 'Select' in the dialog"
    ],
    expectedResult: "Selected invoice file 'invoice_Q3_2023.pdf' successfully captured by the system"
  },
  {
    id: "TC_ERROR_008",
    title: "Unsupported DOCX file format upload",
    complexity: "Low complexity",
    duration: "8 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an unsupported file format triggers an error so that the user is prevented from invalid uploads",
    tags: ["upload", "validation", "error handling", "file format"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in and on page with Upload Invoice button, DOCX file available",
    dependencies: "User authentication, File system access",
    testSteps: [
      "Click the 'Upload Invoice' button",
      "In the System File Dialog, navigate to the folder containing 'invoice.docx'",
      "Select 'invoice.docx'",
      "Click 'Open' or 'Select' in the dialog"
    ],
    expectedResult: "Error message 'Unsupported file format. Please upload PDF, PNG, or JPG files.' displayed, file upload prevented"
  },
  {
    id: "TC_ERROR_009",
    title: "File size validation error (6MB)",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that selecting an invoice file larger than 5MB triggers a validation error so the user is informed",
    tags: ["upload", "validation", "size limit", "error handling"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in and on page with Upload Invoice button, 6MB PDF file available",
    dependencies: "User authentication, File system access",
    testSteps: [
      "Click the 'Upload Invoice' button",
      "In the System File Dialog, navigate to the folder containing 'large_invoice.pdf'",
      "Select 'large_invoice.pdf' (6MB)",
      "Click 'Open' or 'Select' in the dialog"
    ],
    expectedResult: "Error message 'File size exceeds 5MB limit.' displayed, file upload prevented"
  },
  {
    id: "TC_EXCEPTION_005",
    title: "Network interruption during file transfer",
    complexity: "High complexity",
    duration: "20 mins",
    status: "pending review",
    statusColor: "orange",
    description: "Verify that a network interruption during invoice file transfer is handled gracefully so the user receives appropriate feedback",
    tags: ["exception handling", "network", "file transfer", "graceful failure"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in and on page with Upload Invoice button, Valid invoice file available, Network simulation tools available",
    dependencies: "User authentication, File system access, Network simulation capability",
    testSteps: [
      "Click the 'Upload Invoice' button",
      "In the System File Dialog, select 'invoice_to_upload.pdf'",
      "Click 'Open' or 'Select' in the dialog",
      "Immediately after selecting the file and before the upload completes, simulate a network disconnection"
    ],
    expectedResult: "Error message 'Network error: Unable to upload file. Please check your connection and try again.' displayed, upload process gracefully terminated"
  },
  {
    id: "TC_EXPLORATORY_005",
    title: "Large PNG file with special characters upload",
    complexity: "Medium complexity",
    duration: "18 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify a 4.9MB PNG invoice with a 100-character name including special characters is uploaded correctly",
    tags: ["exploratory", "PNG", "special characters", "large filename", "edge case"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in and on page with Upload Invoice button, PNG file with 100-character name and special characters available",
    dependencies: "User authentication, File system access",
    testSteps: [
      "Click the 'Upload Invoice' button",
      "In the System File Dialog, navigate to the folder containing the prepared PNG file",
      "Select 'Invoice_Q4_2023_Financial_Report_for_Virtusa_Inc_with_Special_Characters_!@#$%^&()_+={}[].png'",
      "Click 'Open' or 'Select' in the dialog"
    ],
    expectedResult: "Invoice file with the long name and special characters successfully captured and ready for further processing"
  }
];
