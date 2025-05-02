import { useRef } from "react";
import { MdAttachFile } from "react-icons/md";

const FileSelector = (props) => {
  const filePickerRef = useRef(null);
  const { icon, onChange, className, accept, disabled, text, ...rest } = props;

  const handleClick = () => {
       filePickerRef.current.click();
  };

  const Icon = (
    <span className="flex gap-1 items-center">
      <button className="text-gray-500 bg-gray-100 rounded-full p-2">
        <MdAttachFile className="text-2xl" />
      </button>{" "}
      Select File
    </span>
  );

  return (
    <div
      onClick={handleClick}
      className={`${className} ${
        disabled ? "cursor-no-drop" : "cursor-pointer"
      }`}
    >
      {icon || Icon}
      <input
        hidden
        type="file"
        onChange={onChange}
        ref={filePickerRef}
        accept={accept}
        {...rest}
        disabled={disabled}
      />
      {text}
    </div>
  );
};

export default FileSelector;
