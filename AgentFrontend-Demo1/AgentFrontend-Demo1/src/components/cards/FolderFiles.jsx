import { useEffect, useState } from "react";

function FolderFiles({ name, onExcelFile }) {
  const [folderFiles, setFolderFiles] = useState({
    "Test Case Generator Agent": [],
    "Test Data Agent": [],
    "Test Script Generator Agent": [],
    "Test Maintenance": [],
    "Orchestration Agent": [],
  });
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [activeTab, setActiveTab] = useState("Test Design");

  useEffect(() => {
    const fetchFiles = async () => {
      await loadFilesFromFolder(name);
    };

    fetchFiles();
  }, [name]);

  const FILE_API_BASE_URL = "http://10.107.45.15:8080/api";

  const folderPaths = {
    "Test Case Generator Agent": "outputs/test-design/test-case",
    "Test Data Agent": "outputs/test-design/test-data",
    "Test Script Generator Agent": "outputs/test-design/test-scripts",
    "Test Maintenance": "outputs/test-maintenance",
    "Orchestration Agent": "outputs/orchestration_reports",
  };

  const loadFilesFromFolder = async (tabName) => {
    setIsLoadingFiles(true);

    try {
      const folderPath = folderPaths[tabName];
      const response = await fetch(
        `${FILE_API_BASE_URL}/files?folder=${encodeURIComponent(folderPath)}`
      );
      if (response.ok) {
        const files = await response.json();
        setFolderFiles((prev) => ({
          ...prev,
          [tabName]: files.map((file) => ({
            name: file.name,
            size: formatFileSize(file.size),
            status: "Completed",
            path: file.relativePath,
            lastModified: file.lastModified,
            extension: file.extension,
          })),
        }));
      } else {
        console.error("Failed to load files from folder:", folderPath);
        setFolderFiles((prev) => ({
          ...prev,
          [tabName]: [],
        }));
      }
    } catch (error) {
      console.error("Error loading files:", error);
      setFolderFiles((prev) => ({
        ...prev,
        [tabName]: [],
      }));
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Check if file is Excel-like
  const isExcelFile = (fileName) => {
    const excelExtensions = ['.xlsx', '.xls', '.csv'];
    return excelExtensions.some(ext => 
      fileName.toLowerCase().endsWith(ext)
    );
  };

  // Modified file opening logic
  const handleFileOpen = async (file) => {
    if (isExcelFile(file.name) && onExcelFile) {
      // For Excel files, fetch the file blob and pass to parent
      try {
        const response = await fetch(
          `${FILE_API_BASE_URL}/download?file=${encodeURIComponent(file.path)}`
        );
        if (response.ok) {
          const blob = await response.blob();
          const fileObj = new File([blob], file.name, { type: blob.type });
          onExcelFile(fileObj, file);
        } else {
          console.error("Failed to fetch Excel file for preview");
        }
      } catch (error) {
        console.error("Error fetching Excel file:", error);
      }
    } else {
      // For non-Excel files, open in new tab as before
      openFileInNewTab(file.path);
    }
  };

  const openFileInNewTab = async (filePath) => {
    try {
      const fileUrl = `${FILE_API_BASE_URL}/view?file=${encodeURIComponent(
        filePath
      )}`;
      window.open(fileUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error opening file:", error);
    }
  };

  // Function to copy file path to clipboard
  const copyFilePath = async (filePath) => {
    try {
      await navigator.clipboard.writeText(filePath);
      console.log("File path copied to clipboard");
    } catch (error) {
      console.error("Failed to copy file path:", error);
    }
  };

  // Function to download file
  const downloadFile = async (filePath, fileName) => {
    try {
      const response = await fetch(
        `${FILE_API_BASE_URL}/download?file=${encodeURIComponent(filePath)}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  // Get appropriate icon for file type
  const getFileIcon = (fileName) => {
    if (isExcelFile(fileName)) {
      return (
        <svg
          className="w-4 h-4 text-green-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
        </svg>
      );
    }
    return (
      <svg
        className="w-4 h-4 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="flex items-center space-x-2 mb-3">
        <span className="bg-[rgb(81,242,184)] text-gray-900 px-2 py-1 rounded text-xs font-medium">
          {isLoadingFiles ? "Loading..." : "Outputs"}
        </span>
      </div>

      {isLoadingFiles ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#403FF6]"></div>
          <span className="ml-2 text-gray-600">Loading files...</span>
        </div>
      ) : folderFiles[name].length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p>No outputs generated</p>
        </div>
      ) : (
        folderFiles[name].map((file, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-3 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 space-x-2">
                {getFileIcon(file.name)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    {file.name}
                    {isExcelFile(file.name) && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Excel
                      </span>
                    )}
                  </p>
                  {/* <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-gray-500">{file.size}</p>
                    {file.lastModified && (
                      <p className="text-xs text-gray-400">
                        Generated:{" "}
                        {new Date(file.lastModified).toLocaleDateString()}
                      </p>
                    )}
                  </div> */}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Open/Preview Button - Modified for Excel files */}
                <button
                  className="p-2 hover:bg-white rounded transition-colors group"
                  title={isExcelFile(file.name) ? "Preview table" : "Open in new tab"}
                  onClick={() => handleFileOpen(file)}
                >
                  {isExcelFile(file.name) ? (
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6m-6 4h6"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  )}
                </button>

                <button
                  className="p-2 hover:bg-white rounded transition-colors group"
                  title="Copy path"
                  onClick={() => copyFilePath(file.path)}
                >
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </button>

                <button
                  className="p-2 hover:bg-white rounded transition-colors group"
                  title="Download"
                  onClick={() => downloadFile(file.path, file.name)}
                >
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                  </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FolderFiles;
