import PropTypes from "prop-types";

const sizeClasses = {
  sm: "text-sm md:text-base lg:text-lg",
  md: "text-base md:text-lg lg:text-xl",
  lg: "text-lg md:text-xl lg:text-2xl",
};

const SectionHeading = ({ children, color = 'black', size = "md", className }) => {
  const HeadingTag = `h1`;
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <HeadingTag className={`${className} my-2 md:my-3 lg:my-5 font-bold ${sizeClass} ${color} ${className}`}>{children}</HeadingTag>
  );
};

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

export default SectionHeading;
