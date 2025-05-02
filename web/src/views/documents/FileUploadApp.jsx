// import React, { useState } from "react";
// import MyFile from "./MyFile";
// import DocumentList from "./DucumentList";

// const FileUploadApp = () => {
//   const [files, setFiles] = useState([]);

//   const handleUpload = (file) => {
//     setFiles([...files, file]);
//   };

//   return (
//     <div>
//       <MyFile addFile={handleUpload} />
//       <DocumentList files={files} />
//     </div>
//   );
// };

// export default FileUploadApp;

import React, { useState } from "react";
import MyFile from "./MyFile";
import DocumentList from "./DocumentList";

const FileUploadApp = () => {
  const [files, setFiles] = useState([]);

  const handleUpload = (file) => {
    setFiles([...files, file]);
  };

  return (
    <div>
      <MyFile addFile={handleUpload} />
      <DocumentList files={files} /> {/* Fixed prop name */}
    </div>
  );
};

export default FileUploadApp;
