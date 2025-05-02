import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-red-400 hover:text-red-600 transition-all duration-150"
      fill="red"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const SideDrawer = ({
  show,
  onClose,
  position = "right",
  className = "",
  children,
  width = "w-1/2",
  hideClose = false
}) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const positionClass = position === "right" ? "right-0" : "left-0";
  const transformClass =
    position === "right" ? "translate-x-full" : "-translate-x-full";
  const openTransformClass = "translate-x-0";

  return (
    <aside>
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
          onClick={onClose}
        />
      )}
      <div
        className={classNames(
          className,
          width,
          `fixed h-full top-0 ${positionClass} h-full bg-white shadow-lg transform transition-transform duration-300 ease-out`,
          { [transformClass]: !show },
          { [openTransformClass]: show }
        )}
        style={{
          animation: show
            ? `slide-in-${position} 0.3s forwards`
            : `slide-out-${position} 0.3s forwards`,
        }}
      >
        <div className="relative h-full">
          {hideClose && <button className="absolute top-2 right-2" onClick={onClose}>
            <CloseIcon />
          </button>}
          <div className="h-full">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(["left", "right"]),
  width: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SideDrawer;
