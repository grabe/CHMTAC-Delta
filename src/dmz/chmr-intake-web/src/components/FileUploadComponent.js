import React, { useState, useRef, useEffect } from "react";
import {Button} from "@mui/material";

const FileUploadComponent = ({ onFilesUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null); // Add a ref for the file input

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = [...selectedFiles];
    const errors = [];
    const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB in bytes
    
    for (const file of files) {
      // Validation logic stays the same
      if (newFiles.some((f) => f.name === file.name)) {
        errors.push(`A file with the name "${file.name}" has already been selected.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`The file "${file.name}" exceeds the 5GB size limit.`);
        continue;
      }
  
      if (newFiles.length >= 5) {
        errors.push("You can only upload up to 5 files.");
        break;
      }
  
      newFiles.push(file);
    }
  
    setSelectedFiles(newFiles);
  
    if (errors.length > 0) {
      setError(errors.join(" "));
    } else {
      setError(null);
    }
  
    // Notify parent component
    if (onFilesUploaded) {
      onFilesUploaded(newFiles);
    }
  };

  // Remove a file from the selected list
  const removeFile = (fileName) => {
    const updatedFiles = selectedFiles.filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);

    if (onFilesUploaded) {
      onFilesUploaded(updatedFiles);
    }
  };

  // Create a DataTransfer object and append all files to it
  useEffect(() => {
    // This effect runs whenever selectedFiles changes
    if (fileInputRef.current) {
      // Create a new DataTransfer object
      const dataTransfer = new DataTransfer();
      
      // Add each selected file to the DataTransfer object
      selectedFiles.forEach(file => {
        dataTransfer.items.add(file);
      });
      
      // Set the file input's files property to the DataTransfer files
      fileInputRef.current.files = dataTransfer.files;
    }
  }, [selectedFiles]);

  return (
    <div>
      {/* File Input with ref */}
      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#7280ce" }}
        component="label" // Makes the button act as a label for the file input
      >
        Choose Files
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          name="document_files"
          hidden // Hides the default file input
        />
      </Button>

      {/* Selected Files list remains the same */}
      <ul>
        {selectedFiles.map((file) => (
          <li key={file.name}>
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            <button
              type="button"
              onClick={() => removeFile(file.name)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUploadComponent;