import Input from '@/components/shared/Input';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/ui/Button';
import FileSelector from '@/components/ui/FileSelector';
import TextArea from '@/components/ui/TextArea';
import { FaPlus } from 'react-icons/fa6';
import React, { useState } from 'react';

const AddDocument = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("document");

  const handleUpload = () => {
    if (fileName) {
      onFileUpload(fileName, fileType);
      setFileName("");
    }
  };

  return (
    <div className="w-full">
      <SectionHeading className={"flex gap-3 items-center"}>
        <FaPlus className="text-lg text-turquoise" />
        Upload Documents & Pictures
      </SectionHeading>
      <SectionContainer>
        <div className="w-full mt-4 space-y-3">
          <FileSelector onChange={(e) => setFileName(e.target.value)} />
          <Input
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Button color="lime" size="lg" onClick={handleUpload}>Submit</Button>
        </div>
      </SectionContainer>
    </div>
  );
};

export default AddDocument;
