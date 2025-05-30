import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import ProfileHandler from "../../../../handlers/ProfileHandler";

function EditGateUserDetails({ isOpen, onClose, formData }) {

    const [noticeViewForm, setNoticeViewForm] = useState(formData);
    const { editGuardUser } = ProfileHandler();

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
    
    function updateGateUser(profileId){
        const dataToSubmit = {
            profileId: profileId,
            firstName: noticeViewForm?.firstName,
            lastName: noticeViewForm?.lastName,
            email: noticeViewForm?.email,
            mobileNumber: noticeViewForm?.mobileNo,
        }
        editGuardUser(dataToSubmit);
        onClose(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoticeViewForm({
            ...noticeViewForm,
            [name]: value
        });
    };


    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose} className="h-full w-full overflow-auto p-10" contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`} overlayClassName="backdrop-blur">


                <div className="flex mt-28 justify-center">
                    <div className="flex">
                        <img className="h-56 w-44 border-2 rounded-md" src={noticeViewForm?.profilePhoto} alt="No Photo Available." />
                    </div>


                    <div className="flex-col ml-40 space-y-4 text-gray-800">
                        <Input label="First Name" type="text" name='firstName' value={noticeViewForm?.firstName} onChange={handleInputChange} />
                        <Input label="Last Name" type="text" name='lastName' value={noticeViewForm?.lastName} onChange={handleInputChange} />
                        {/* <p className="text-xl">Status: &nbsp; {noticeViewForm?.status}</p> */}
                        <p className="text-xl">Job Role: {formatString(noticeViewForm?.roleCategory)}</p>
                        <Input label="Email" type="text" name="email" value={noticeViewForm?.email} onChange={handleInputChange}/>
                        <Input label="Mobile" type="text" name="mobileNo" value={noticeViewForm?.mobileNo} onChange={handleInputChange}/>
                    </div>
                </div>

                <div className=" flex justify-center mt-8">
                    <button onClick={() => updateGateUser(noticeViewForm?.profileId)} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-800 focus:outline-none">Submit</button>
                </div>



            </Dialog>
        </>
    )
}

export default EditGateUserDetails