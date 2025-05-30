import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import ProfileHandler from "../../../../handlers/ProfileHandler";
import { GoAlertFill } from "react-icons/go";

function ViewGateUserDetails({ deleteButton, isOpen, onClose, formData }) {
    const [noticeViewForm, setNoticeViewForm] = useState(formData);
    const { removeGuardUser } = ProfileHandler();

    useEffect(() => {
        setNoticeViewForm(formData); // Set the form data when component mounts or formData changes
    }, [formData]);

    // String Modification
    function formatString(inputString) {
        if (!inputString) {
            return ""; // Handle empty or null input
        }
        const words = inputString.split('_');
        const capitalizedWords = words.map(word => {
            if (!word) {
                return ""; // Handle empty words after splitting
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        return capitalizedWords.join(' ');
    }

    function removeGateUser(profileId) {
        // console.log("Profile ID triggerred", profileId);
        removeGuardUser(profileId);
    }


    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose} className="h-full w-full overflow-auto p-10" contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`} overlayClassName="backdrop-blur">


                {deleteButton && (
                    <div className="flex justify-center mt-10 gap-4">
                    <GoAlertFill className="text-3xl mt-3 text-red-500"/>
                    <button className="bg-yellow-500 p-3 rounded-lg">
                        <h3 className="text-2xl text-black">
                            Are you Sure ?
                        </h3>
                    </button >
                    <GoAlertFill className="text-3xl mt-3 text-red-500"/>
                </div>
                )}


                <div className="flex mt-28 justify-center">

                    <div className="flex">
                        <img className="h-56 w-44 border-2 rounded-md" src={noticeViewForm?.profilePhoto} alt="No Photo Available." />
                    </div>


                    <div className="flex-col ml-40 space-y-4 text-gray-800">
                        <p className="text-xl">Name: &nbsp; {noticeViewForm?.firstName} {noticeViewForm?.lastName}</p>
                        <p className="text-xl">Status: &nbsp; {noticeViewForm?.status}</p>
                        <p className="text-xl">Job Role: {formatString(noticeViewForm?.roleCategory)}</p>
                        <p className="text-xl">Email: {noticeViewForm?.email}</p>
                        <p className="text-xl">Mobile Number: {noticeViewForm?.mobileNo}</p>
                    </div>
                </div>


                {deleteButton && (<div className=" flex justify-center mt-8">
                    <button onClick={() => removeGateUser(noticeViewForm?.profileId)} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">Remove User</button>
                </div>)}


            </Dialog>
        </>
    )
}

export default ViewGateUserDetails