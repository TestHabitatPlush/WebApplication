// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import classNames from "classnames";
// import { INPUT_SIZES } from "../../constants/config.size";
// import { COLORS_HEX } from "../../constants/config.color";

// const hexToRgba = (hex, alpha) => {
//   let r = parseInt(hex.slice(1, 3), 16);
//   let g = parseInt(hex.slice(3, 5), 16);
//   let b = parseInt(hex.slice(5, 7), 16);
//   return `rgba(${r}, ${g}, ${b}, ${alpha})`;
// };

// const Input = ({
//   label,
//   type = "text",
//   placeholder,
//   value,
//   onChange,
//   color = "turquoise",
//   size = "md",
//   className = "",
//   isFalse = false,
//   name,
//   border = "",
//   hideBorder,
//   borderSize = 1,
//   hideRing = false
// }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   const sizeClass = INPUT_SIZES[size] || INPUT_SIZES.md;

//   const InputStyle = {
//     border:
//       hideBorder ||
//       `${borderSize}px solid ${hexToRgba(
//         COLORS_HEX[border ? isFocused ? color : border : "secondary"],
//         0.5
//       )}`,
//     outline: "none",
//     boxShadow:
//       hideRing || isFocused
//         ? `0 0 0 2px ${hexToRgba(COLORS_HEX[color], 0.5)}`
//         : "none",
//   };

//   return (
//     <div className="flex flex-col mb-4">
//       {label && (
//         <label className={classNames("mb-2 font-semibold", "text-gray-700")}>
//           {label}
//         </label>
//       )}
//       <input
//         className={classNames(className, sizeClass, "rounded", "text-black")}
//         style={InputStyle}
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         name={name}
//       />
//     </div>
//   );
// };

// Input.propTypes = {
//   label: PropTypes.string,
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   color: PropTypes.string,
//   size: PropTypes.oneOf(Object.keys(INPUT_SIZES)),
//   className: PropTypes.string,
//   isFalse: PropTypes.bool,
//   name: PropTypes.string,
//   borderSize: PropTypes.number,
// };

// export default Input;


import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { INPUT_SIZES } from "../../constants/config.size";
import { COLORS_HEX } from "../../constants/config.color";

const hexToRgba = (hex, alpha) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  color = "turquoise",
  size = "md",
  className = "",
  isFalse = false,
  name,
  border = "",
  hideBorder,
  borderSize = 1,
  hideRing = false,
  readOnly = false, // Added readOnly prop with default value as false
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClass = INPUT_SIZES[size] || INPUT_SIZES.md;

  const InputStyle = {
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
    cursor: readOnly ? "no-drop" : "text", // Change cursor style based on readOnly prop
  };

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className={classNames("mb-2 font-semibold", "text-gray-700")}>
          {label}
        </label>
      )}
      <input
        className={classNames(className, sizeClass, "rounded", "text-black")}
        style={InputStyle}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={readOnly ? undefined : onChange} // Disable onChange if readOnly is true
        onFocus={() => !readOnly && setIsFocused(true)} // Disable focus change if readOnly is true
        onBlur={() => !readOnly && setIsFocused(false)} // Disable blur change if readOnly is true
        name={name}
        readOnly={readOnly} // Set readOnly attribute on input element
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(INPUT_SIZES)),
  className: PropTypes.string,
  isFalse: PropTypes.bool,
  name: PropTypes.string,
  borderSize: PropTypes.number,
  readOnly: PropTypes.bool, // Added readOnly prop to PropTypes
};

export default Input;
