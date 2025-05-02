
import React, { useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import NoticeHandler from "../../../../handlers/NoticeHandler";

const AddNewNoticeForm = () => {
  const { createNoticeHandler } = NoticeHandler();
  const [noticeform, setNoticeForm] = useState({
    noticeHeading: "",
    noticeDescription: "",
    noticeExpireDate: "",
    userGroupId: "",
  });

  const [errors, setErrors] = useState({}); // To track field errors

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNoticeForm({ ...noticeform, [name]: value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setNoticeForm({ ...noticeform, userGroupId: value });
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!noticeform.noticeHeading.trim())
      tempErrors.noticeHeading = "Notice Heading is required.";
    if (!noticeform.noticeDescription.trim())
      tempErrors.noticeDescription = "Notice Description is required.";
    if (!noticeform.noticeExpireDate)
      tempErrors.noticeExpireDate = "Expire Date is required.";
    if (!noticeform.userGroupId)
      tempErrors.userGroupId = "Please select a user group.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // Return true if no errors
  };

  const submitHandler = () => {
    if (validateFields()) {
      console.log("noticeform", noticeform);
      createNoticeHandler(noticeform)
        .then(() => {
          // Reset fields after successful submission
          setNoticeForm({
            noticeHeading: "",
            noticeDescription: "",
            noticeExpireDate: "",
            userGroupId: "",
          });
          setErrors({}); // Clear errors
        })
        .catch((err) => {
          console.error("Error submitting form:", err);
        });
    } else {
      console.error("Validation failed.");
    }
  };

  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="flex flex-col w-full gap-5 py-6">
        <div>
          <Input
            label={
              <div>
                Notice Heading <span className="ml-1 text-red-500">*</span>
              </div>
            }
            type="text"
            name="noticeHeading"
            placeholder="Enter Notice Heading"
            size="lg"
            value={noticeform.noticeHeading}
            onChange={handleInput}
            className={errors.noticeHeading ? "border-red-500" : ""}
          />
          {errors.noticeHeading && (
            <p className="text-sm text-red-500">{errors.noticeHeading}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="message" // Fixed htmlFor instead of for
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Notice Description <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows="4"
            name="noticeDescription"
            value={noticeform.noticeDescription}
            onChange={handleInput}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.noticeDescription
                ? "border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Write your thoughts here..."
          ></textarea>
          {errors.noticeDescription && (
            <p className="text-sm text-red-500">{errors.noticeDescription}</p>
          )}
        </div>
        <div>
          <Input
            label={
              <div>
                Enter Expire Date <span className="ml-1 text-red-500">*</span>
              </div>
            }
            type="date"
            name="noticeExpireDate"
            value={noticeform.noticeExpireDate}
            placeholder="Enter Expire Date"
            size="lg"
            onChange={handleInput}
            className={errors.noticeExpireDate ? "border-red-500" : ""}
          />
          {errors.noticeExpireDate && (
            <p className="text-sm text-red-500">{errors.noticeExpireDate}</p>
          )}
        </div>
        <div className="grid items-center grid-cols-4 gap-5 my-5">
          <div className="flex flex-row items-center gap-3">
            <label>Only for Owners</label>
            <input
              type="radio"
              name="userGroupId" // Using the same name for all radio buttons
              value="1" // Value for Owners
              checked={noticeform.userGroupId === "1"}
              onChange={handleRadioChange}
              className="text-lg"
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label>Only for Tenants</label>
            <input
              type="radio"
              name="userGroupId" // Using the same name
              value="2" // Value for Tenants
              checked={noticeform.userGroupId === "2"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label>All Members</label>
            <input
              type="radio"
              name="userGroupId" // Using the same name
              value="3" // Value for All Members
              checked={noticeform.userGroupId === "3"}
              onChange={handleRadioChange}
            />
          </div>
          <div className="flex flex-row items-center gap-3">
            <label>All Primary Contacts</label>
            <input
              type="radio"
              name="userGroupId" // Using the same name
              value="4" // Value for All Primary Contacts
              checked={noticeform.userGroupId === "4"}
              onChange={handleRadioChange}
            />
          </div>
        </div>
        {errors.userGroupId && (
          <p className="text-sm text-red-500">{errors.userGroupId}</p>
        )}
        <div className="flex justify-center mt-5">
          <Button
            className="max-w-sm"
            type="button"
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

export default AddNewNoticeForm;
