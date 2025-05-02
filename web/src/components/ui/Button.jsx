import PropTypes from "prop-types";
import classNames from "classnames";
import { COLORS } from "@/constants/config.color";
import { BUTTON_SIZES } from "@/constants/config.size";

const Button = ({
  children,
  onClick,
  type = "button",
  color = "turquoise",
  size = "md",
  className = "",
  disabled = false,
}) => {
  // Check if the provided color exists in COLORS, else use primary color
  const colorClass = COLORS[color]
    ? `bg-${COLORS[color]}`
    : `bg-${COLORS.primary}`;
  const sizeClass = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const defaultStyle =
    "text-white border rounded font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90 w-full";

  const buttonClasses = classNames(
    className,
    sizeClass,
    colorClass,
    defaultStyle,
    { "opacity-80 cursor-not-allowed": disabled }
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  color: PropTypes.oneOf(Object.keys(COLORS)),
  size: PropTypes.oneOf(Object.keys(BUTTON_SIZES)),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
