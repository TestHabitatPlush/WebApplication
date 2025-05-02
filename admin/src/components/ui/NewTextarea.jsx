// Textarea.js
import React from "react";
import PropTypes from "prop-types";
import "./Textarea.css"; // Optional: If you want to style it externally

const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows,
  cols,
  style,
  className,
  ...rest
}) => {
  return (
    <div className={`textarea-container ${className}`} style={style}>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        {...rest}
      />
    </div>
  );
};

// Define default prop values in case they're not passed in
Textarea.defaultProps = {
  placeholder: "Enter text...",
  rows: 5,
  cols: 50,
  style: {},
  className: "",
};

// Define the expected types of props
Textarea.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default Textarea;
