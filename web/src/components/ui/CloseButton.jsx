"use client";

import React from "react";
import { HiX } from "react-icons/hi";
import classNames from "classnames";

const CloseButton = React.forwardRef((props, ref) => {
  const {
    absolute,
    className,
    defaultStyle,
    svgClass,
    onClick,
    ...rest
  } = props;

  const closeButtonAbsoluteClass = "absolute z-10 top-4 right-4";
  const closeButtonClass = classNames(
    defaultStyle && absolute && closeButtonAbsoluteClass,
    "text-gray-600 hover:text-black transition",
    className
  );

  return (
    <button
      type="button"
      className={closeButtonClass}
      onClick={onClick}
      aria-label="Close"
      ref={ref}
      {...rest}
    >
      <HiX className={svgClass} />
    </button>
  );
});

CloseButton.defaultProps = {
  defaultStyle: true,
};

CloseButton.displayName = "CloseButton";

export default CloseButton;

