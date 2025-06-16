import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTrashAlt } from "react-icons/fa";
import Button from "../ui/Button";

const ReusableInputForm = ({
  columns,
  numberOfRows = 1,
  onSubmit,
  onRowAdd,
  onRowRemove,
  initialData = [],
  formTitle = "Input Form",
  showAddRemoveButtons = true,
  showSubmitButton = true,
  submitButtonText = "Submit",
  className = ""
}) => {
  // Initialize form data with empty rows
  const [formData, setFormData] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);


  // Initialize form data when component mounts or numberOfRows changes
  useEffect(() => {
    // Only initialize once or when numberOfRows actually changes
    if (!isInitialized || formData.length !== numberOfRows) {
      const initializeData = () => {
        const newData = [];
        for (let i = 0; i < numberOfRows; i++) {
          const row = {};
          columns.forEach(column => {
            // Use initial data if available, otherwise empty string
            row[column.accessor] = initialData[i] ? initialData[i][column.accessor] || '' : '';
          });
          newData.push(row);
        }
        setFormData(newData);
        setIsInitialized(true);
      };

      initializeData();
    }
  }, [numberOfRows, columns.length]);

  // Handle input change for a specific row and field
  const handleInputChange = (rowIndex, fieldName, value) => {
    setFormData(prevData => {
      const newData = [...prevData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [fieldName]: value
      };
      return newData;
    });
  };

  // Add a new row
  const handleAddRow = () => {
    const newRow = {};
    columns.forEach(column => {
      newRow[column.accessor] = '';
    });
    setFormData(prevData => [...prevData, newRow]);
    
    if (onRowAdd) {
      onRowAdd(formData.length);
    }
  };

  // Remove a row
  const handleRemoveRow = (rowIndex) => {
    if (formData.length > 1) {
      setFormData(prevData => prevData.filter((_, index) => index !== rowIndex));
      
      if (onRowRemove) {
        onRowRemove(rowIndex);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Render input based on column type
  const renderInput = (column, rowIndex, value) => {
    const inputProps = {
      id: `${column.accessor}-${rowIndex}`,
      name: `${column.accessor}-${rowIndex}`,
      value: value || '',
      onChange: (e) => handleInputChange(rowIndex, column.accessor, e.target.value),
      className: "w-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      placeholder: column.placeholder || `${column.Header}`,
      required: column.required || false
    };

    // Handle different input types based on column configuration
    switch (column.inputType) {
      case 'textarea':
        return (
          <textarea
            {...inputProps}
            rows={column.rows || 3}
            className={`${inputProps.className} resize-vertical`}
          />
        );
      
      case 'select':
        return (
          <select
            {...inputProps}
            className={inputProps.className}
          >
            <option value="">Select {column.Header}</option>
            {column.options?.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            {...inputProps}
            type="number"
            min={column.min}
            max={column.max}
            step={column.step}
          />
        );
      
      case 'email':
        return <input {...inputProps} type="email" />;
      
      case 'tel':
        return <input {...inputProps} type="tel" />;
      
      case 'date':
        return <input {...inputProps} type="date" />;
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value === true || value === 'true'}
            onChange={(e) => handleInputChange(rowIndex, column.accessor, e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        );
      
      default:
        return <input {...inputProps} type="text" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{formTitle}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {column.Header}
                    {column.required && <span className="text-red-500 ml-1">*</span>}
                  </th>
                ))}
                {showAddRemoveButtons && (
                  <th className="px-4 py-3 border-b border-gray-300 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 border-b border-gray-300">
                      {renderInput(column, rowIndex, row[column.accessor])}
                    </td>
                  ))}
                  {showAddRemoveButtons && (
                    <td className="px-4 py-3 border-b border-gray-300 text-center">
                      <FaTrashAlt
                      disabled={formData.length <= 1}
                      className="text-lg text-red-500 hover:text-red-700 cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
                      onClick={() => handleRemoveRow(rowIndex)} 
                      title="Remove row"
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form Controls */}
        <div className="flex justify-between items-center mt-6">
          {showAddRemoveButtons && (
            <button
              type="button"
              onClick={handleAddRow}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              + Add Row
            </button>
          )}

          <div className="flex space-x-3">
            {showSubmitButton && (
              <Button
                type="submit"
                className="px-6 py-2 mr-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {submitButtonText}
              </Button>
            )}
          </div>
        </div>

        {/* Form Info */}
        <div className="mt-4 text-sm text-gray-600">
          <span>Total Rows: <strong>{formData.length}</strong></span>
        </div>
      </form>
    </div>
  );
};

ReusableInputForm.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired, // Column header text
      accessor: PropTypes.string.isRequired, // Field name
      inputType: PropTypes.oneOf(['text', 'number', 'email', 'tel', 'date', 'textarea', 'select', 'checkbox']), // Input type
      required: PropTypes.bool, // Is field required
      placeholder: PropTypes.string, // Placeholder text
      options: PropTypes.array, // For select dropdowns
      min: PropTypes.number, // For number inputs
      max: PropTypes.number, // For number inputs
      step: PropTypes.number, // For number inputs
      rows: PropTypes.number, // For textarea
    })
  ).isRequired,
  numberOfRows: PropTypes.number,
  onSubmit: PropTypes.func,
  onRowAdd: PropTypes.func,
  onRowRemove: PropTypes.func,
  initialData: PropTypes.array,
  formTitle: PropTypes.string,
  showAddRemoveButtons: PropTypes.bool,
  showSubmitButton: PropTypes.bool,
  submitButtonText: PropTypes.string,
  className: PropTypes.string,
};

export default ReusableInputForm;