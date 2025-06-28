import PropTypes from "prop-types";
import classNames from "classnames";
import { INPUT_SIZES } from "../../constants/config.size";
import { COLORS } from "../../constants/config.color";
// import { COLORS } from "@/constants/config.color";
// import { INPUT_SIZES } from "@/constants/config.size";

const TextArea = ({
  label,
  placeholder,
  value,
  onChange,
  color = "turquoise",
  size = "md",
  className = "",
  isFalse = false,
  rows = 3,
  name
}) => {
  const sizeClass = INPUT_SIZES[size] || INPUT_SIZES.md;
  const borderColorClass = isFalse ? "border-danger" : "border-gray-300";
  const ringColorClass = isFalse ? "focus:ring-danger" : "focus:ring-" + color;

  const textAreaClasses = classNames(
    className,
    "border",
    "rounded",
    "focus:outline-none",
    "focus:ring-2",
    sizeClass,
    borderColorClass,
    ringColorClass,
    "rounded-lg"
  );

  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label className={classNames("mb-2 font-semibold", "text-gray-700")}>
          {label}
        </label>
      )}
      <textarea
        className={textAreaClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        name={name}
      />
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.oneOf(Object.keys(INPUT_SIZES)),
  className: PropTypes.string,
  isFalse: PropTypes.bool,
  rows: PropTypes.number,
};

export default TextArea;
