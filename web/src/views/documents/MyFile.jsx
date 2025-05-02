// import React, { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
// import Button  from "@/components/ui/Button";
// import Input  from "@/components/ui/Input";

// const MyFile = ({ addFile }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [documentName, setDocumentName] = useState("");
//   const [file, setFile] = useState(null);

//   const handleUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   // const handleSubmit = () => {
//   //   if (file && documentName) {
//   //     addFile({ name: documentName, type: "document" });
//   //     setDocumentName("");
//   //     setFile(null);
//   //     setIsModalOpen(false);
//   //   }
//   // };


//   const handleSubmit = () => {
//     if (!file) {
//       alert("Please select a file!");
//       return;
//     }
//     if (!documentName.trim()) {
//       alert("Please enter a document name!");
//       return;
//     }

//     addFile({ name: documentName, type: "document" });
//     setDocumentName("");
//     setFile(null);
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-md bg-white">
//       <h2 className="text-lg font-semibold mb-2">My Files</h2>
//       <div className="flex gap-2">
//         <Button className="bg-gray-700 text-white" onClick={() => setIsModalOpen(true)}>
//           Document
//         </Button>
//         <Button className="bg-blue-500 text-white">Picture</Button>
//       </div>

//       {/* Document Upload Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="p-6">
//           <DialogHeader>
//             <DialogTitle>Upload Document</DialogTitle>
//           </DialogHeader>
//           <Input type="file" onChange={handleUpload} className="mt-2" />
//           <Input
//             type="text"
//             placeholder="Document Name"
//             value={documentName}
//             onChange={(e) => setDocumentName(e.target.value)}
//             className="mt-2 "
//           />
//           <Button className="bg-green-500 text-white mt-4" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MyFile;


import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const MyFile = ({ addFile }) => {
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isPictureModalOpen, setIsPictureModalOpen] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [pictureName, setPictureName] = useState("");
  const [file, setFile] = useState(null);
  const [picture, setPicture] = useState(null);

  const handleUpload = (e, setFileFunction) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileFunction(selectedFile);
    }
  };

  // const handleSubmit = (type) => {
  //   if (type === "document") {
  //     if (!file || !documentName.trim()) {
  //       alert("Please enter a document name and select a file!");
  //       return;
  //     }
  //     addFile({ name: documentName, type: "document" });
  //     setDocumentName("");
  //     setFile(null);
  //     setIsDocumentModalOpen(false);
  //   } else {
  //     if (!picture || !pictureName.trim()) {
  //       alert("Please enter a picture name and select a file!");
  //       return;
  //     }
  //     addFile({ name: pictureName, type: "picture" });
  //     setPictureName("");
  //     setPicture(null);
  //     setIsPictureModalOpen(false);
  //   }
  // };


  const handleSubmit = (type) => {
    if (type === "document") {
      if (!file || !documentName.trim()) {
        alert("Please enter a document name and select a file!");
        return;
      }
      addFile({ name: documentName, type: "document", file }); // Include file
      setDocumentName("");
      setFile(null);
      setIsDocumentModalOpen(false);
    } else {
      if (!picture || !pictureName.trim()) {
        alert("Please enter a picture name and select a file!");
        return;
      }
      addFile({ name: pictureName, type: "picture", file: picture }); // Include file
      setPictureName("");
      setPicture(null);
      setIsPictureModalOpen(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">My Files</h2>
      <div className="flex gap-2">
        <Button className="bg-gray-700 text-white" onClick={() => setIsDocumentModalOpen(true)}>
          Document
        </Button>
        <Button className="bg-blue-500 text-white" onClick={() => setIsPictureModalOpen(true)}>
          Picture
        </Button>
      </div>

      {/* Document Upload Modal */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Upload Document</DialogTitle>
          </DialogHeader>
          <Input type="file" onChange={(e) => handleUpload(e, setFile)} className="mt-2 border p-2 rounded" />
          <Input
            type="text"
            placeholder="Document Name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="mt-2 border p-2 rounded"
          />
          <Button className="bg-green-500 text-white mt-4 w-full" onClick={() => handleSubmit("document")}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>

      {/* Picture Upload Modal */}
      <Dialog open={isPictureModalOpen} onOpenChange={setIsPictureModalOpen}>
        <DialogContent className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Upload Picture</DialogTitle>
          </DialogHeader>
          <Input type="file" accept="image/*" onChange={(e) => handleUpload(e, setPicture)} className="mt-2 border p-2 rounded" />
          <Input
            type="text"
            placeholder="Picture Name"
            value={pictureName}
            onChange={(e) => setPictureName(e.target.value)}
            className="mt-2 border p-2 rounded"
          />
          <Button className="bg-blue-500 text-white mt-4 w-full" onClick={() => handleSubmit("picture")}>
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyFile;
