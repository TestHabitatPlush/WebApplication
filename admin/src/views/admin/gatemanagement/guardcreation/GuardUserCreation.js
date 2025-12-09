import React, { useRef, useState } from "react";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import { FaCamera } from "react-icons/fa";
import Button from "../../../../components/ui/Button";
import toast from "react-hot-toast";
import ProfileHandler from "../../../../handlers/ProfileHandler";
import PhoneCodeSelector from "../../../../components/shared/PhoneCodeSelector";

const GuardUserCreation = () => {
  const paths = ["Gate Management", "Guard Profile Creation"];
  const Heading = ["Security Guard User Creation"];
  const fileInputRef = useRef(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photomsg, setPhotomsg] = useState("");

  const { GuardRelationshipHandler } = ProfileHandler();

  const initialFormData = {
    title: "MR",
    firstName: "",
    lastName: "",
    countryCode: "",
    mobileNumber: "",
    email: "",
    documentType: "",
    documentFile: null,
    role: "",
    profilePhoto: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setProfilePhoto(null);
    setPhotomsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const profileHandleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setPhotomsg("Image size above 2MB. Please choose a smaller file.");
        return;
      } else {
        setPhotomsg("");
      }

      setProfilePhoto(URL.createObjectURL(file));
      setFormData((prevData) => ({
        ...prevData,
        profilePhoto: file,
      }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setPhotomsg("Document size above 2MB. Please choose a smaller file.");
        return;
      } else {
        setPhotomsg("");
      }

      setFormData((prevData) => ({
        ...prevData,
        documentFile: file,
      }));
    }
  };

  const countryCodes = [
    { code: "+1", country: "United States" },
    { code: "+44", country: "United Kingdom" },
    { code: "+91", country: "India" },
    { code: "+86", country: "China" },
  ];

  const documentTypeList = [
    { idCode: "1", document: "Aadhaar" },
    { idCode: "2", document: "PAN" },
    { idCode: "3", document: "CompanyId" },
    { idCode: "4", document: "VoterId" },
  ];

  const validateForm = () => {
    const {
      title,
      firstName,
      lastName,
      countryCode,
      mobileNumber,
      email,
      documentType,
      documentFile,
      role,
      profilePhoto,
    } = formData;

    if (
      !title ||
      !firstName ||
      !lastName ||
      !countryCode ||
      !mobileNumber ||
      !email ||
      !documentType ||
      !documentFile ||
      !role ||
      !profilePhoto
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const myStatus = await GuardRelationshipHandler(formData);
      if (myStatus === 201) {
        toast.success("Guard user created successfully!");
        resetForm();
      } else {
        toast.error("Failed to create user.");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      toast.error("Submission failed. Try again.");
    }
  };

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      {/* Profile Section */}
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="text-xl font-semibold text-lime">Profile Details</div>
        <div className="flex items-center gap-5 mt-5">
          <div
            className="relative border-2 rounded-full h-28 w-28 border-lime"
            style={{
              backgroundImage: profilePhoto ? `url(${profilePhoto})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <FaCamera
              onClick={handleIconClick}
              className="absolute bottom-0 right-0 bg-lime text-white text-[30px] p-2 rounded-full cursor-pointer"
              size={38}
            />
            <input
              name="profilePhoto"
              type="file"
              ref={fileInputRef}
              onChange={profileHandleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h2>Choose Profile Photo</h2>
            <div className="text-red-700">{photomsg}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 py-6">
          <div>
            <label className="block pb-2 ml-1 -mt-3 text-sm font-medium text-gray-900">
              MR./MRS.
            </label>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-md w-28"
            >
              <option value="MR">MR</option>
              <option value="MRS">MRS</option>
            </select>
          </div>

          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-72"
            label={<div>First Name</div>}
            type="text"
            placeholder="Enter Your First Name"
            size="lg"
          />

          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-72"
            label={<div>Last Name</div>}
            type="text"
            placeholder="Enter Your Last Name"
            size="lg"
          />
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <div>
           
            <PhoneCodeSelector
              label={
                <span>
                  Country Code<span className="text-red-500">*</span>
                </span>
              }
              name="countryCode"
              value={formData.countryCode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  countryCode: e.target.value,
                }))
              }
            />
          </div>

          <Input
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            className="w-72"
            label={<div>Mobile No.</div>}
            type="text"
            placeholder="Enter Mobile Number"
            size="lg"
          />

          <Input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-72"
            label={<div>Email</div>}
            type="email"
            placeholder="Enter Your Email"
            size="lg"
          />
        </div>

        <div className="flex flex-wrap items-center gap-5 mt-6">
          <div className="flex flex-col w-72">
            <label className="font-semibold text-gray-800">Document Type</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleInputChange}
              className="p-3 mt-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                Select your ID type
              </option>
              {documentTypeList.map((item) => (
                <option key={item.idCode} value={item.document}>
                  {item.idCode} - {item.document}
                </option>
              ))}
            </select>
          </div>

          <div className="p-8 border rounded-lg">
            <Input
              name="documentFile"
              onChange={handleFileChange}
              label={
                <div>
                  Upload Document (Image, PDF)
                  <p className="text-red-500">(Max size 2MB)</p>
                </div>
              }
              type="file"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Role Section */}
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="text-xl font-semibold text-lime">Role Allocation</div>
        <div className="flex flex-wrap items-center gap-5 mt-5">
          {[
            { label: "Security", value: "society_security_guard" },
            { label: "Supervisor", value: "society_security_supervisor" },
            { label: "Facility Manager", value: "society_facility_manager" },
          ].map((role) => (
            <div key={role.value} className="flex items-center gap-2">
              <label className="text-lg">{role.label}</label>
              <input
                type="radio"
                name="role"
                value={role.value}
                checked={formData.role === role.value}
                onChange={() => handleRoleChange(role.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          onClick={handleSubmit}
          className="max-w-sm"
          type="submit"
          size="lg"
        >
          Add User
        </Button>
      </div>
    </div>
  );
};

export default GuardUserCreation;
