import Input from "@/components/shared/Input";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import FileSelector from "@/components/ui/FileSelector";
import TextArea from "@/components/ui/TextArea";
import React from "react";

const CreatePost = () => {
  return (
    <div>
      <SectionHeading>Add Post</SectionHeading>
      <SectionContainer>
        <div className="">
          <div className="">
            <Input
              label="Topic"
              type="text"
              placeholder="Write about the topics."
              className="w-full"
            />
            <TextArea
              label="Details"
              placeholder="Write about the document."
              rows={5}
              className="w-full p-3 rounded-xl"
            />
            <FileSelector />
          </div>
          <div className="w-full grid gap-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
            <Button
              color="lime"
              size="lg"
              onClick={() => alert("Secondary Button Clicked")}
              className=""
            >
              Submit
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default CreatePost;
