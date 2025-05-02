import ProfilePhoto from "@/components/shared/ProfilePhoto";
import React from "react";
import photo from "../../../../../assets/images/demo.jpg";
import SectionHeading from "@/components/shared/SectionHeading";
import Input from "@/components/shared/Input";
import SectionContainer from "@/components/shared/SectionContainer";
import { FaPlus } from "react-icons/fa6";
import Label from "@/components/shared/Label";
import Button from "@/components/ui/Button";

const AddVisitor = () => {
  return (
    <div>
      <SectionHeading className={"flex gap-3 items-center"}>
        <FaPlus className="text-lg text-turquoise" />
        Add Visitor
      </SectionHeading>
      <SectionContainer>
        <div className="flex gap-10 items-center">
          <ProfilePhoto src={photo} slt={"profile_image"} size="large" />
          <div className="">
            <SectionHeading size="lg">
              Chinmaya Kumar Behera
              <br />
              <span className="text-lg font-normal">Flat Number</span>
            </SectionHeading>
          </div>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-2">
          <Input
            label="Date"
            type="date"
            placeholder="Enter text..."
            value={"2024-07-17"}
            onChange={(event) => console.log(event.target.value)}
            color="turquoise"
            size="lg"
            isFalse={false}
            className=""
          />
          <Input
            label="Mobile Number"
            type="number"
            placeholder="Enter Mobile number..."
            // value={"2024-07-17"}
            onChange={(event) => console.log(event.target.value)}
            color="turquoise"
            size="lg"
            className=""
            isFalse={false}
          />

          <Input
            label="Relation"
            type="text"
            placeholder="Enter text..."
            value={"Mother"}
            onChange={(event) => console.log(event.target.value)}
            color="turquoise"
            size="lg"
            className=""
            isFalse={false}
          />
        </div>
        <div className="w-full grid gap-2 grid-col-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
          <Button
            className="text-black"
            color="success"
            size="lg"
            onClick={() => alert("Primary Button Clicked")}
          >
            Generate
          </Button>
          <Button
            color="lime"
            size="lg"
            onClick={() => alert("Secondary Button Clicked")}
            className=""
          >
            Submit
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
};

export default AddVisitor;
