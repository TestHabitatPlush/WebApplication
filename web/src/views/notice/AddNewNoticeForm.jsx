

'use client';

import React, { useState } from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/ui/Button";
import NoticeHandler from "@/handlers/NoticeHandler";

const visibilityOptions = [
  { label: "Only for Owners", value: "owner" },
  { label: "Only for Tenants", value: "tenant" },
  { label: "All Members", value: "all" },
  { label: "All Primary Contacts", value: "primary" },
];

const AddNewNoticeForm = () => {
  const { createNoticeByUserHandler } = NoticeHandler();
  const [noticeform, setNoticeForm] = useState({
    noticeHeading: "",
    noticeDescription: "",
    noticeExpireDate: "",
    visibilityOption: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNoticeForm({ ...noticeform, [name]: value });
  };

  const handleRadioChange = (e) => {
    setNoticeForm({ ...noticeform, visibilityOption: e.target.value });
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!noticeform.noticeHeading.trim())
      tempErrors.noticeHeading = "Notice Heading is required.";
    if (!noticeform.noticeDescription.trim())
      tempErrors.noticeDescription = "Notice Description is required.";
    if (!noticeform.noticeExpireDate)
      tempErrors.noticeExpireDate = "Expire Date is required.";
    if (!noticeform.visibilityOption)
      tempErrors.visibilityOption = "Please select a visibility option.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const submitHandler = async () => {
    if (!validateFields()) return;

    try {
      await createNoticeByUserHandler(noticeform);
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Notice Description <span className="ml-1 text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            name="noticeDescription"
            value={noticeform.noticeDescription}
            onChange={handleInput}
            className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
              errors.noticeDescription
                ? "border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
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
          {visibilityOptions.map((option) => (
            <div key={option.value} className="flex flex-row items-center gap-3">
              <label>{option.label}</label>
              <input
                type="radio"
                name="visibilityOption"
                value={option.value}
                checked={noticeform.visibilityOption === option.value}
                onChange={handleRadioChange}
                className="text-lg"
              />
            </div>
          ))}
        </div>
        {errors.visibilityOption && (
          <p className="text-sm text-red-500">{errors.visibilityOption}</p>
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
