import { COLORS } from "@/constants/config.color";
import PropTypes from "prop-types";

const sizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const Label = ({ children, color = "primary", size = "md", className}) => {
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  const colorClass = COLORS[color] || COLORS.primary;

  return (
    <label className={`font-semibold ${sizeClass} ${colorClass} ${className}`}>
      {children}
    </label>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default Label;
