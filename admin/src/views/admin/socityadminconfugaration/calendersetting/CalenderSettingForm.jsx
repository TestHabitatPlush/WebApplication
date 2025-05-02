import React, { useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import CalenderSettingHandler from "../../../../handlers/CalenderSettingHandler";

const CalenderSettingForm = () => {
  const { CreateCalenderSettingHandler } = CalenderSettingHandler();
  const [dateform, setDateform] = useState({
    month: "",
    year: "",
  });

  const handlerChange = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;
    // console.log("name", name);
    // console.log("value", value);
    setDateform({ ...dateform, [name]: value });
  };
  const submitHandler = () => {
    console.log("Submit data", dateform);
    CreateCalenderSettingHandler(dateform);
  };

  return (
    <div>
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="text-xl font-sans font-semibold text-lime">
          Month & Year Setting
        </div>
        <div className="grid grid-cols-1 items-center py-4">
          <Input
            label={<div>Month </div>}
            type="text"
            name="month"
            placeholder={"Enter Month"}
            size={"lg"}
            onChange={handlerChange}
          />
          <Input
            label={<div>Year</div>}
            type="number"
            name="year"
            placeholder={"Enter Year"}
            size={"lg"}
            onChange={handlerChange}
          />
        </div>
        <div className="flex justify-center mt-5">
          <Button
            className="max-w-sm"
            type="submit"
            onClick={submitHandler}
            size="lg"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalenderSettingForm;
