import React, { useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import NoticeHandler from "../../../../handlers/NoticeHandler";

const visibilityOptions = [
  { label: "Only for Owners", value: "owner" },
  { label: "Only for Tenants", value: "tenant" },
  { label: "All Members", value: "all" },
  { label: "All Primary Contacts", value: "primary" },
];

const AddNewNoticeForm = () => {
  const { createNoticeBySocietyHandler } = NoticeHandler();

  const [noticeForm, setNoticeForm] = useState({
    noticeHeading: "",
    noticeDescription: "",
    noticeExpireDate: "",
    visibilityOption: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNoticeForm({ ...noticeForm, [name]: value });
  };

  const handleRadioChange = (e) => {
    setNoticeForm({ ...noticeForm, visibilityOption: e.target.value });
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!noticeForm.noticeHeading.trim()) tempErrors.noticeHeading = "Notice Heading is required.";
    if (!noticeForm.noticeDescription.trim()) tempErrors.noticeDescription = "Notice Description is required.";
    if (!noticeForm.noticeExpireDate) tempErrors.noticeExpireDate = "Expire Date is required.";
    if (!noticeForm.visibilityOption) tempErrors.visibilityOption = "Please select a visibility option.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submitHandler = async () => {
    if (!validateFields()) return;
    try {
      await createNoticeBySocietyHandler({ ...noticeForm });
      setNoticeForm({
        noticeHeading: "",
        noticeDescription: "",
        noticeExpireDate: "",
        visibilityOption: "",
      });
      setErrors({});
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="p-10 my-5 bg-gray-100 border rounded-lg">
      <div className="flex flex-col w-full gap-5 py-6">
        <Input
          label={<div>Notice Heading <span className="ml-1 text-red-500">*</span></div>}
          type="text"
          name="noticeHeading"
          placeholder="Enter Notice Heading"
          size="lg"
          value={noticeForm.noticeHeading}
          onChange={handleInput}
          className={errors.noticeHeading ? "border-red-500" : ""}
        />
        {errors.noticeHeading && <p className="text-sm text-red-500">{errors.noticeHeading}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-900">
          Notice Description <span className="ml-1 text-red-500">*</span>
        </label>
        <textarea
          rows="4"
          name="noticeDescription"
          value={noticeForm.noticeDescription}
          onChange={handleInput}
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
            errors.noticeDescription ? "border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          }`}
          placeholder="Write your notice here..."
        ></textarea>
        {errors.noticeDescription && <p className="text-sm text-red-500">{errors.noticeDescription}</p>}

        <Input
          label={<div>Enter Expire Date <span className="ml-1 text-red-500">*</span></div>}
          type="date"
          name="noticeExpireDate"
          value={noticeForm.noticeExpireDate}
          placeholder="Enter Expire Date"
          size="lg"
          onChange={handleInput}
          className={errors.noticeExpireDate ? "border-red-500" : ""}
        />
        {errors.noticeExpireDate && <p className="text-sm text-red-500">{errors.noticeExpireDate}</p>}

        <div className="grid items-center grid-cols-4 gap-5 my-5">
          {visibilityOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-3">
              <label>{option.label}</label>
              <input
                type="radio"
                name="visibilityOption"
                value={option.value}
                checked={noticeForm.visibilityOption === option.value}
                onChange={handleRadioChange}
              />
            </div>
          ))}
        </div>
        {errors.visibilityOption && <p className="text-sm text-red-500">{errors.visibilityOption}</p>}

        <div className="flex justify-center mt-5">
          <Button type="button" onClick={submitHandler} size="lg" className="max-w-sm">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewNoticeForm;
