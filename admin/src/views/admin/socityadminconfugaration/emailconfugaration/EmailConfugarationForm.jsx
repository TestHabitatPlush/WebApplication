import { React, useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import EmailHandler from "../../../../handlers/EmailHandler";

const EmailConfugarationForm = () => {
  const { createEmailHandler } = EmailHandler();

  const [emailData, setEmailData] = useState({
    from: "",
    to: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log("name", name);
    // console.log("value", value);
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const submitHandler = () => {
    console.log("all data", emailData);
    createEmailHandler(emailData);
  };

  return (
    <div className="p-10 my-5 border rounded-lg bg-gray-100">
      <div className="text-xl font-sans font-semibold text-lime">Email</div>
      <div className="grid grid-cols-1 items-center py-4">
        <Input
          label={<div>From </div>}
          type="text"
          name="from"
          size={"lg"}
          value={emailData.from}
          onChange={handleChange}
        />
        <Input
          label={<div>To</div>}
          type="text"
          name="to"
          size={"lg"}
          value={emailData.to}
          onChange={handleChange}
        />
        <div>
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your message
          </label>
          <textarea
            id="message"
            rows="4"
            name="message"
            onChange={handleChange}
            value={emailData.message}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your thoughts here..."
          ></textarea>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Button
          className="max-w-sm"
          type="submit"
          onClick={submitHandler}
          size="lg"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EmailConfugarationForm;
