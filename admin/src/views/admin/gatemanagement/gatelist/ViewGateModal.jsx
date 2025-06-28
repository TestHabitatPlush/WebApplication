import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import Input from "../../../../components/shared/Input";
import GateHandler from "../../../../handlers/GateHandler";

function ViewGateModal({ isOpen, onClose, gateData, gateId, setClose }) {
    const [userViewForm, setUserViewForm] = useState(gateData);

    const { getChangeGateName } = GateHandler();

    useEffect(() => {
        setUserViewForm(gateData);
    }, [gateData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserViewForm({
            ...userViewForm,
            [name]: value
        });
    };

    const onSubmitGn = () => {
        const dataToSubmit = {
        gateId: gateId,
        gateName: userViewForm.gateName,
        gateNumber: userViewForm.gateNumbar,
        };
        getChangeGateName(dataToSubmit);
        setClose(false);
    }

    return (
        <>
            <Dialog
                isOpen={isOpen}
                onClose={onClose}
                className="h-full w-full overflow-auto p-10"
                contentClassName="w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5"
                overlayClassName="backdrop-blur"
            >

                <div className="border-b pb-4 mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Edit Gate</h2>
                </div>

                <div className="p-10 my-5 border rounded-lg bg-gray-100">
                    <div className="grid grid-cols-3 gap-5 items-center py-6">
                        <Input
                            label="Gate Number"
                            type="text"
                            name="userId"
                            value={userViewForm.gateNumbar}
                            readOnly
                        />
                        <Input
                            label="Gate Name"
                            type="text"
                            name="gateName"
                            value={userViewForm.gateName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end mb-6 mt-12 mr-10">
                    <button onClick={onSubmitGn} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">
                        Submit
                    </button>
                </div>

            </Dialog>
        </>
    )
}

export default ViewGateModal