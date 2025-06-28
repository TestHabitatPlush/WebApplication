import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const sizeClasses = {
  small: "w-8 h-8",
  medium: "w-16 h-16",
  large: "w-24 h-24",
};

const ProfilePhoto = ({ src, alt, size = "small" }) => {
  const sizeClass = sizeClasses[size] || sizeClasses.small;

  return (
    <div className={`relative rounded-full ${sizeClass}`}>
      <Image layout="fill" src={src} alt={alt} className="rounded-full"/>
    </div>
  );
};

ProfilePhoto.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default ProfilePhoto;
