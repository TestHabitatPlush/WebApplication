import Input from "@/components/shared/Input";
import SectionHeading from "@/components/shared/SectionHeading";
import Button from "@/components/ui/Button";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddTenant = () => {
  return (
    <div className="">
      <SectionHeading className={"flex gap-3 items-center"}>
        <FaPlus className="text-lg text-turquoise" />
        Add Tenant
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Input
          label="Mobile"
          type="text"
          placeholder="Enter Mobile Number..."
          value={""}
          onChange={(event) => console.log(event.target.value)}
          color="success"
          size="lg"
          className=""
          isFalse={false}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter Email..."
          value={""}
          onChange={(event) => console.log(event.target.value)}
          color="success"
          size="lg"
          className=""
          isFalse={false}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Button className="" size="lg">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddTenant;
