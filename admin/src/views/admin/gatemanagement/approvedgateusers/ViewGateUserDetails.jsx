import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";

function ViewGateUserDetails({ isOpen, onClose, formData }) {
    const [noticeViewForm, setNoticeViewForm] = useState(formData);

    useEffect(() => {
        setNoticeViewForm(formData); // Set the form data when component mounts or formData changes
    }, [formData]);

    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose} className="w-full h-full p-10 overflow-auto" contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`} overlayClassName="backdrop-blur">
                

                <div className="flex justify-center mt-28">
                    <div className="flex">
                        <img className="h-56 border-2 rounded-md w-44" src={noticeViewForm?.profilePhoto} alt="No Photo Available." />
                    </div>


                    <div className="flex-col ml-40 space-y-4 text-gray-800">
                        <p className="text-xl">Name: &nbsp; {noticeViewForm?.firstName} {noticeViewForm?.lastName}</p>
                        <p className="text-xl">Status: &nbsp; {noticeViewForm?.status}</p>
                        <p className="text-xl">Job Role: {noticeViewForm?.roleId}</p>
                        <p className="text-xl">Email: {noticeViewForm?.email}</p>
                        <p className="text-xl">Mobile Number: {noticeViewForm?.mobileNo}</p>
                    </div>
                </div>



            </Dialog>
        </>
    )
}

export default ViewGateUserDetails