import React, { useState, useEffect } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";

// Helper to format the date to "YYYY-MM-DD"
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};

const UpdateNoticeDetailsModal = ({
  isOpen,
  onClose,
  formData,
  onEditHandler,
}) => {
  const [noticeform, setNoticeForm] = useState(formData);

  useEffect(() => {
    setNoticeForm(formData); // Set the form data when component mounts or formData changes
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setNoticeForm({ ...noticeform, [name]: value });
  };

  const handleRadioChange = (value) => {
    setNoticeForm({ ...noticeform, userGroupId: value });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`}
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="flex flex-col w-full gap-5 py-6">
          <div>
            <Input
              label="Notice Heading"
              value={noticeform?.noticeHeading || ""}
              type="text"
              name="noticeHeading"
              placeholder={"Enter Notice Heading"}
              size={"lg"}
              onChange={handleInput}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Notice Description
            </label>
            <textarea
              id="message"
              rows="4"
              value={noticeform?.noticeDescription || ""}
              name="noticeDescription"
              onChange={handleInput}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          {/* Date Field */}
          <div>
            <Input
              label={<div>Enter Expire Date</div>}
              type="date"
              value={formatDate(noticeform?.noticeExpireDate)} // Format date to "YYYY-MM-DD"
              name="noticeExpireDate"
              placeholder={"Enter Expire Date"}
              size={"lg"}
              onChange={handleInput}
            />
          </div>

          {/* Radio Buttons */}
          <div className="grid grid-cols-4 gap-5 items-center my-5">
            <div className="flex flex-row items-center gap-3">
              <label>Only for Owners</label>
              <input
                type="radio"
                name="userGroupId"
                checked={noticeform.userGroupId === 1} // Check if the value is 1
                onChange={() => handleRadioChange(1)}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <label>Only for Tenants</label>
              <input
                type="radio"
                name="userGroupId"
                checked={noticeform.userGroupId === 2} // Check if the value is 2
                onChange={() => handleRadioChange(2)}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <label>All Members</label>
              <input
                type="radio"
                name="userGroupId"
                checked={noticeform.userGroupId === 3} // Check if the value is 3
                onChange={() => handleRadioChange(3)}
              />
            </div>
            <div className="flex flex-row items-center gap-3">
              <label>All Primary Contacts</label>
              <input
                type="radio"
                name="userGroupId"
                checked={noticeform.userGroupId === 4} // Check if the value is 4
                onChange={() => handleRadioChange(4)}
              />
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <Button
              className="max-w-sm"
              type="submit"
              onClick={() => onEditHandler(noticeform)}
              size="lg"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateNoticeDetailsModal;
