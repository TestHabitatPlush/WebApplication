import React from "react";
import Modal from "react-modal";
import classNames from "classnames";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import CloseButton from "./CloseButton";

const Dialog = (props) => {
  const {
    children,
    className,
    closable,
    width,
    height, // keep prop (optional)
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

  const onCloseClick = (e) => onClose && onClose(e);

  const renderCloseButton =
    closable && <CloseButton onClick={onCloseClick} absolute />;

  // ✅ FIXED: removed height forcing
  const contentStyle = {
    content: { inset: "unset", width: width ?? 520 },
    ...style,
  };

  const dialogClass = classNames("dialog-content", contentClassName);
  const overlayClass = classNames(
    "dialog-overlay",
    overlayClassName,
    "bg-opacity-60 bg-black"
  );

  return (
    <AnimatePresence>
      <Modal
        shouldCloseOnOverlayClick={closable}
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        portalClassName={classNames("dialog-portal", portalClassName, props.key)}
        bodyOpenClassName={classNames("dialog-open", bodyOpenClassName)}
        className={{
          base: classNames("dialog", className),
          afterOpen: "dialog-after-open",
          beforeClose: "dialog-before-close",
        }}
        overlayClassName={{
          base: overlayClass,
          afterOpen: "dialog-overlay-after-open",
          beforeClose: "dialog-overlay-before-close",
        }}
        style={contentStyle}
        closeTimeoutMS={closeTimeoutMS}
        {...rest}
      >
        <motion.div
          key="dialog-motion"
          className={dialogClass}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          {renderCloseButton}
          {children}
        </motion.div>
      </Modal>
    </AnimatePresence>
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
