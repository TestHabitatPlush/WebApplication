import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { SELECT_INPUT_SIZES } from "../../constants/config.size";
import { COLORS_HEX } from "../../constants/config.color";

const hexToRgba = (hex, alpha) => {
  if (!hex) {
    console.error("hexToRgba: hex value is undefined or null");
    return `rgba(0, 0, 0, ${alpha})`; 
  }

  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Select = ({
  label,
  options = [],
  value,
  onChange,
  color = "turquoise",
  size = "md",
  className = "",
  border = "",
  hideBorder,
  borderSize = 1,
  hideRing = false,
  name,
  readOnly
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClass = SELECT_INPUT_SIZES[size] || SELECT_INPUT_SIZES.md;

  const selectStyle = {
    border:
      hideBorder ||
      `${borderSize}px solid ${hexToRgba(
        COLORS_HEX[border ? (isFocused ? color : border) : "secondary"],
        0.5
      )}`,
    outline: "none",
    boxShadow:
      hideRing || isFocused
        ? `0 0 0 2px ${hexToRgba(COLORS_HEX[color], 0.5)}`
        : "none",
  };

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className={classNames("mb-2 font-semibold", "text-gray-700")}>
          {label}
        </label>
      )}
      <select
        className={classNames(
          className,
          sizeClass,
          "rounded",
          "text-black disabled:cursor-nodrop"
        )}
        style={selectStyle}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name={name} 
        disabled={readOnly}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(SELECT_INPUT_SIZES)),
  className: PropTypes.string,
  borderSize: PropTypes.number,
  hideBorder: PropTypes.bool,
  hideRing: PropTypes.bool,
  name: PropTypes.string,
};

export default Select;
