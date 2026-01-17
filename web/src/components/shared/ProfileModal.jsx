// src/components/shared/ProfileModal.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserHandler from "@/handlers/UserHandler";
<<<<<<< HEAD
import Logo from "../../../assets/svg&pngicon/user (1).png";

const ProfileModal = ({ isOpen, onClose, user }) => {
  const { updateResidentBySocietyIdHandler } = UserHandler();
  const society = useSelector((state) => state.society.selectedSocietyId);
=======

const ProfileModal = ({ isOpen, onClose, user }) => {
  const { updateResidentBySocietyIdHandler } = UserHandler();
  const societyId = useSelector((state) => state.auth.user?.societyId);
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    mobileNumber: user?.mobileNumber || "",
  });
  const [photoFile, setPhotoFile] = useState(null);
<<<<<<< HEAD
  const profileImageUrl = user?.photo
  ? `${process.env.NEXT_PUBLIC_BASE_URL}/${user.photo.replace(/\\/g, "/")}`
  : Logo;
=======

>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

<<<<<<< HEAD
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await updateResidentBySocietyIdHandler(user.userId, {
      firstName: formState.firstName,
      lastName: formState.lastName,
      mobileNumber: formState.mobileNumber,
      photo: photoFile,
    });

    setIsEditing(false);
    onClose();
  } catch (error) {
    console.error(error);
  }
};
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const residentData = {
        userId: user?.userId,
        firstName: formState.firstName,
        lastName: formState.lastName,       
        mobileNumber: formState.mobileNumber,
        photo: photoFile,
      };

      await updateResidentBySocietyIdHandler({ societyId, residentData, token });
      alert("Profile updated successfully.");
      setIsEditing(false);
      onClose();
    } catch (error) {
      alert("Failed to update profile.");
      console.error(error);
    }
  };
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <h2 className="mb-4 text-xl font-semibold">
          {isEditing ? "Edit Profile" : ""}
        </h2>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="block font-medium">First Name</label>
              <input
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Last Name</label>
              <input
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Mobile Number</label>
              <input
                name="mobileNumber"
                value={formState.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Photo</label>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-2 text-sm">
<<<<<<< HEAD
               <div>
                {profileImageUrl ? (
                    <img
                      src={profileImageUrl}
                      alt="Profile"
                      className="object-cover w-24 h-24 border rounded-full"
                    />
                 ) : (
                      <div className="flex items-center justify-center w-24 h-24 text-xs text-gray-400 border rounded-full">
                        No Image
                      </div>
                    )}
                   
             </div>
       
=======
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6
            <div><strong>Name:</strong> {user?.firstName} {user?.lastName}</div>
            <div><strong>Email:</strong> {user?.email}</div>
            <div><strong>Mobile:</strong> {user?.mobileNumber}</div>
            <div><strong>Role:</strong> {user?.role?.roleName}</div>
            <div><strong>Role Category:</strong> {user?.role?.roleCategory}</div>
            <div><strong>Occupancy Status:</strong> {user?.role?.occupancyStatus}</div>
<<<<<<< HEAD
          
=======
            <div><strong>Group ID:</strong> {user?.role?.userGroupId}</div>
>>>>>>> 94127e2f3a1c741a8f58f809a9c418279221d1f6

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
