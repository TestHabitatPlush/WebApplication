import React from "react";
import Modal from "react-modal";
import classNames from "classnames";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import CloseButton from "./CloseButton";

const Dialog = (props) => {
  const {
    children,
    className,
    closable,
    width,
    height,
    style,
    isOpen,
    onClose,
    bodyOpenClassName,
    portalClassName,
    overlayClassName,
    contentClassName,
    closeTimeoutMS,
    ...rest
  } = props;

  const onCloseClick = (e) => {
    onClose(e);
  };

  const renderCloseButton = <CloseButton onClick={onCloseClick} absolute />;

  const contentStyle = {
    content: {
      inset: "unset",
    },
    ...style,
  };

  if (width !== undefined) {
    contentStyle.content.width = width;
    contentStyle.content.width = "auto";
  }
  if (height !== undefined) {
    contentStyle.content.height = height;
  }

  const defaultDialogContentClass = "dialog-content";

  const dialogClass = classNames(defaultDialogContentClass, contentClassName);

  const default_overlay_class = "bg-opacity-60 bg-black";
  const overlay_class = classNames(overlayClassName, default_overlay_class);

  return (
    <Modal
      shouldCloseOnOverlayClick={closable}
      className={{
        base: classNames("dialog", className),
        afterOpen: "dialog-after-open",
        beforeClose: "dialog-before-close",
      }}
      overlayClassName={{
        base: classNames("dialog-overlay", overlay_class),
        afterOpen: "dialog-overlay-after-open",
        beforeClose: "dialog-overlay-before-close",
      }}
      portalClassName={classNames("dialog-portal", portalClassName)}
      bodyOpenClassName={classNames("dialog-open", bodyOpenClassName)}
      ariaHideApp={false}
      isOpen={isOpen}
      style={{ ...contentStyle }}
      closeTimeoutMS={closeTimeoutMS}
      {...rest}
    >
      <motion.div
        className={dialogClass}
        initial={{ transform: "scale(0.9)" }}
        animate={{
          transform: isOpen ? "scale(1)" : "scale(0.9)",
        }}
      >
        {closable && renderCloseButton}
        {children}
      </motion.div>
    </Modal>
  );
};

Dialog.propTypes = {
  closable: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  overlayClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClose: PropTypes.func,
  portalClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  closeTimeoutMS: PropTypes.number,
  bodyOpenClassName: PropTypes.string,
};

Dialog.defaultProps = {
  closable: true,
  width: 520,
  closeTimeoutMS: 150,
};

export default Dialog;
