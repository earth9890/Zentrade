// ProductImportPage.js
import React, { useState, useEffect } from "react";
import DisplayProductList from "./DisplayProductList";

const ProductImportPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("json");
  const [characterEncoding, setCharacterEncoding] = useState("utf-8");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [availableFields, setAvailableFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Initialize selectedFields with all available fields
    setSelectedFields([...availableFields]);
  }, [availableFields]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      try {
        const fileContent = await readFileAsync(file);

        if (fileContent.trim() === "") {
          console.error("JSON file is empty.");
          return;
        }

        const jsonData = JSON.parse(fileContent);

        if (jsonData.products && typeof jsonData.products === "object") {
          const productValues = Object.values(jsonData.products);

          if (productValues.length > 0) {
            const firstProduct = productValues[0];
            const fields = Object.keys(firstProduct);
            setAvailableFields(fields);
          } else {
            console.error("Products object is empty.");
          }
        } else {
          console.error(
            "JSON file does not have the expected 'products' object."
          );
        }
      } catch (error) {
        console.error("Error reading or parsing file:", error);
      }
    }
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFormatSubmit = (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const fileContent = event.target.result;

          if (fileContent.trim() === "") {
            console.error("JSON file is empty.");
            return;
          }

          const jsonData = JSON.parse(fileContent);
          // setProducts(jsonData);
          if (jsonData.products && typeof jsonData.products === "object") {
            const productValues = Object.values(jsonData.products);
            
            setProducts(productValues);
            if (productValues.length > 0) {
              const firstProduct = productValues[0];
              const fields = Object.keys(firstProduct);
              const f =  fields.filter(x => !selectedFields.includes(x)) 
              setSelectedFields(f);
              setAvailableFields(fields);
            } else {
              console.error("Products object is empty.");
            }
          } else {
            console.error(
              "JSON file does not have the expected 'products' object."
            );
          }
        } catch (error) {
          console.error("Error parsing file content:", error);
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  const handleFieldToggle = (field) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6">Product Import</h1>
      <form onSubmit={handleFormatSubmit}>
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Step 1: Select JSON file from system
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Step 2: Specify Format
          </label>
          <div className="grid grid-cols-2 m-2 gap-4">
            <div>
              <label>File Type:</label>
              <select
                onChange={(e) => setFileType(e.target.value)}
                value={fileType}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="json">JSON</option>
                {/* Add other file types as needed */}
              </select>
            </div>
            <div>
              <label>Character Encoding:</label>
              <select
                onChange={(e) => setCharacterEncoding(e.target.value)}
                value={characterEncoding}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="utf-8">UTF-8</option>
                {/* Add other character encodings as needed */}
              </select>
            </div>
            <div>
              <label>Delimiter:</label>
              <select
                onChange={(e) => setDelimiter(e.target.value)}
                value={delimiter}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
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
                className="mt- ml-1  focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xl font-medium text-gray-700">
            Step 3: Select Fields to be Displayed
          </label>
          <div className="grid grid-cols-2 gap-4">
            {availableFields.map((field) => (
              <div key={field} className="col-span-1 flex items-center">
                <input
                  type="checkbox"
                  id={field}
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldToggle(field)}
                  className="mr-2"
                />
                <label htmlFor={field}>{field}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {products.length > 0 && (
        <div className="mt-8">
          <DisplayProductList
            products={products}
            selectedFields={selectedFields}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImportPage;
