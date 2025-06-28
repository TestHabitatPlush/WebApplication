import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import ProfileHandler from "../../../../handlers/ProfileHandler";

function EditGateUserDetails({ isOpen, onClose, formData }) {
  const [noticeViewForm, setNoticeViewForm] = useState(formData);
  const { editGuardUser } = ProfileHandler();

  useEffect(() => {
    setNoticeViewForm(formData);
  }, [formData]);

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${process.env.REACT_APP_PUBLIC_BASE_URL}/${path}`;
  };

  const imageUrl = getImageUrl(noticeViewForm?.profilePhoto);

  const formatString = (inputString) => {
    if (!inputString) return "";
    return inputString
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const updateGateUser = (profileId) => {
    const dataToSubmit = {
      profileId: profileId,
      firstName: noticeViewForm?.firstName,
      lastName: noticeViewForm?.lastName,
      email: noticeViewForm?.email,
      mobileNumber: noticeViewForm?.mobileNo,
    };
    editGuardUser(dataToSubmit);
    onClose(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoticeViewForm({
      ...noticeViewForm,
      [name]: value,
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
      overlayClassName="backdrop-blur"
    >
      {/* Profile Image + Inputs in center */}
      <div className="flex flex-col items-center justify-center gap-10 mt-10 lg:flex-row">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            className="object-cover h-56 border-2 rounded-md w-44"
            src={imageUrl}
            alt="No Photo Available"
          />
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-md space-y-4 text-gray-800">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={noticeViewForm?.firstName || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={noticeViewForm?.lastName || ""}
            onChange={handleInputChange}
          />
          <p className="text-xl">Job Role: {formatString(noticeViewForm?.roleCategory)}</p>
          <Input
            label="Email"
            type="text"
            name="email"
            value={noticeViewForm?.email || ""}
            onChange={handleInputChange}
          />
          <Input
            label="Mobile"
            type="text"
            name="mobileNo"
            value={noticeViewForm?.mobileNo || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => updateGateUser(noticeViewForm?.profileId || noticeViewForm?.id)}
          className="px-6 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-800 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </Dialog>
  );
}

export default EditGateUserDetails;
