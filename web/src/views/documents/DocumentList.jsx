// import React from "react";
// import { Card } from "@/components/ui/Card";
// import { Eye } from "lucide-react";

// const DocumentList = ({ files }) => {
//   return (
//     <Card className="w-80 p-4 shadow-lg">
//       <h2 className="text-xl font-bold">My Files List</h2>
//       <div className="mt-4">
//         {files.map((file, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center border-b py-2"
//           >
//             <span className="text-green-700">{file.name}</span>
//             <Eye className="text-gray-600 cursor-pointer" />
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default DocumentList ;

// import React from 'react';
// import { FaFilePdf, FaImage, FaEye } from 'react-icons/fa6';
// import SectionContainer from '@/components/shared/SectionContainer';
// import SectionHeading from '@/components/shared/SectionHeading';

// const DocumentsList = ({ files }) => {
//   return (
//     <SectionContainer className={"space-y-5"}>
//       <SectionHeading className={"text-gray-600 lg:my-0 flex justify-between items-center"}>
//         <span className="text-md lg:text-lg">My Files List</span>
//       </SectionHeading>
//       <div className="space-y-5">
//         {files.length > 0 ? (
//           files.map((file, index) => (
//             <div
//               key={index}
//               className="flex justify-between items-center p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer border"
//             >
//               <div className="flex gap-5 items-center">
//                 {file.type === "document" ? <FaFilePdf className="text-xl text-orange-500" /> : <FaImage className="text-xl text-blue-500" />}
//                 <div>{file.name}</div>
//               </div>
//               <button className="bg-lime text-white px-2 py-1 rounded-lg flex items-center gap-2">
//                 <FaEye /> View
//               </button>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No files uploaded yet.</p>
//         )}
//       </div>
//     </SectionContainer>
//   );
// };

// export default DocumentsList;


// import React from "react";

// const DocumentList = ({ files }) => {
//   return (
//     <div className="p-4 border rounded-lg shadow-md bg-white mt-4">
//       <h2 className="text-lg font-semibold mb-2">My Files List</h2>
//       {files.map((file, index) => (
//         <div key={index} className="flex justify-between items-center border p-2 mb-2">
//           <span>{file}</span>
//           <button className="text-blue-500">👁</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DocumentList; 
import React from "react";
import Button from "@/components/ui/Button";

const DocumentList = ({ files }) => { // Fixed prop name
  const handleView = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    } else {
      alert("File not found!");
    }
  };

  const handleDownload = (file, name) => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("File not found!");
    }
  };

  return (
    <div className="mt-4 border p-4 rounded-lg bg-gray-50">
      <h3 className="text-md font-semibold mb-2">My Files List</h3>
      {files.length > 0 ? (
        files.map((fileItem, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded shadow mb-2">
            <span className="text-gray-700">{fileItem.name}</span>
            <div className="flex gap-2">
              <Button className="bg-gray-500 text-white px-2 py-1" onClick={() => handleView(fileItem.file)}>
                👁 View
              </Button>
              <Button className="bg-green-500 text-white px-2 py-1" onClick={() => handleDownload(fileItem.file, fileItem.name)}>
                ⬇ Download
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default DocumentList;
