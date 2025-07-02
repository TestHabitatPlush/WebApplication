import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import ProfileHandler from "../../../../handlers/ProfileHandler";

function ViewGateUserDetails({ isOpen, onClose, formData }) {
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
    function formatDate(isoString) {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }


    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose} className="h-full w-full overflow-auto p-10" contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`} overlayClassName="backdrop-blur">


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
                        <p className="text-xl">Last Working Date: {formatDate(noticeViewForm?.updatedAt)}</p>
                    </div>
                </div>



            </Dialog>
        </>
    )
}

export default ViewGateUserDetails