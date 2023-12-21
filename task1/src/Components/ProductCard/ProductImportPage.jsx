// ProductImportPage.js
import React, { useState } from "react";

const ProductImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [characterEncoding, setCharacterEncoding] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([
    "Subcategory",
    "Title",
    "Price",
    "Popularity",
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFormatSubmit = (event) => {
    event.preventDefault();
    // Implement logic to handle file import and format options
    console.log({
      selectedFile,
      fileType,
      characterEncoding,
      delimiter,
      hasHeader,
      selectedFields,
    });
  };

  const handleFieldSelection = (action) => {
    if (action === "add" && selectedFields.length > 0) {
      const fieldToAdd = selectedFields[0];
      setAvailableFields([...availableFields, fieldToAdd]);
      setSelectedFields([]);
    } else if (action === "remove" && availableFields.length > 0) {
      const fieldToRemove = availableFields[0];
      setSelectedFields([...selectedFields, fieldToRemove]);
      setAvailableFields(availableFields.slice(1));
    }
  };

  return (
    <div>
      <h1>Product Import</h1>
      <form onSubmit={handleFormatSubmit}>
        <div>
          <label>Step 1: Select JSON file from system</label>
          <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
        <div>
          <label>Step 2: Specify Format</label>
          <div>
            <label>File Type:</label>
            <select onChange={(e) => setFileType(e.target.value)}>
              <option value="json">JSON</option>
              {/* Add other file types as needed */}
            </select>
          </div>
          <div>
            <label>Character Encoding:</label>
            <select onChange={(e) => setCharacterEncoding(e.target.value)}>
              <option value="utf-8">UTF-8</option>
              {/* Add other character encodings as needed */}
            </select>
          </div>
          <div>
            <label>Delimiter:</label>
            <select onChange={(e) => setDelimiter(e.target.value)}>
              <option value=",">Comma</option>
              <option value=";">Semicolon</option>
              {/* Add other delimiters as needed */}
            </select>
          </div>
          <div>
            <label>Has Header:</label>
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={() => setHasHeader(!hasHeader)}
            />
          </div>
        </div>
        <div>
          <label>Step 3: Select Fields to be Displayed</label>
          <div>
            <select
              multiple
              size="4"
              value={selectedFields}
              onChange={(e) =>
                setSelectedFields(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {availableFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="button" onClick={() => handleFieldSelection("add")}>
              &gt;&gt;
            </button>
            <button
              type="button"
              onClick={() => handleFieldSelection("remove")}
            >
              &lt;&lt;
            </button>
          </div>
          <div>
            <select
              multiple
              size="4"
              value={availableFields}
              onChange={(e) =>
                setAvailableFields(
                  Array.from(e.target.selectedOptions, (opt) => opt.value)
                )
              }
            >
              {availableFields.map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductImportPage;
