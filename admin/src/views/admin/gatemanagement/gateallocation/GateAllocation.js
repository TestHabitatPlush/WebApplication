import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import { FaPlus } from "react-icons/fa";
import Button from "../../../../components/ui/Button";

import GateHandler from "../../../../handlers/GateHandler";
import ProfileHandler from "../../../../handlers/ProfileHandler";
import toast from "react-hot-toast";

function GateAllocation() {
    const paths = ["Gate Management", "Guard Profile Creation", "Gate Allocation"];

    const [gateName, setGateName] = useState("");
    const [guardName, setGuardName] = useState("");
    const [allocatedGate, setAllocatedGate] = useState([]); //Onbord gate Allocation Data

    const [gateData, setGateData] = useState([]);  // Comming Gate data
    const [securityUserData, setSecurityUserData] = useState([]); // Comming Security Data

    const { getGateListHandler } = GateHandler();
    const { getGateUserList } = ProfileHandler();
    const { makeGateAllocation } = GateHandler();

    const allocateGateHandler = () => {
        // Store current values to use in allocation
        const currentGate = gateName;
        const currentGuard = guardName;

        if (!currentGate || !currentGuard) {
            toast.error("Please select both a gate and a guard before allocating.");
            return;
        }

        // Check if this combination already exists
        const isDuplicate = allocatedGate.some(
            allocation => allocation.gate === currentGate && allocation.allocatedTo === currentGuard
        );

        if (isDuplicate) {
            toast.error("This gate and guard combination has already been allocated.");
            return;
        }

        // Add new allocation using the stored current values
        setAllocatedGate(prevAllocations => [
            ...prevAllocations,
            {
                gate: currentGate,
                allocatedTo: currentGuard,
                // Add these for display purposes
                // gateName: gateData.find(g => g.gateId === currentGate)?.gateName,
                // guardName: securityUserData.find(s => s.profileId === currentGuard)?.firstName
            }
        ]);

        console.log(allocatedGate);


        // Reset selection fields after allocation is done
        setGateName("");
        setGuardName("");
    };


    const removeAllocation = (index) => {
        setAllocatedGate(prevAllocations =>
            prevAllocations.filter((_, i) => i !== index)
        );
    };

    const transformGateData = (response) => {
        if (!response?.data) return [];

        return response.data.map(element => ({
            ...element,
            gateNumbar: element.gateNumber,
            gateName: element.gateName,
            societyId: element.societyId,
            gateId: element.gateId
        }));
    };


    const transformSecurityUserData = (response) => {
        if (!response || !Array.isArray(response)) return [];

        return response.map(element => ({
            profileId: element.profileId, // Keep profileId if needed
            firstName: element.firstName || '', // Default to empty string if undefined
            lastName: element.lastName || '',
            email: element.email || '',
            mobileNo: element.mobileNo || '', // Include mobile number if needed
            profilePhoto: element.profilePhoto || null, // Handle profile photo
            idProof: element.idProof || null, // Handle ID proof
            roleId: element.roleId || null, // Include roleId
            status: element.status || 'inactive', // Default status if needed
            createdAt: element.createdAt || null, // Include createdAt
            updatedAt: element.updatedAt || null // Include updatedAt
        }));
    };


    const countryCodes = [
        { gateNo: "1", gateName: "Gate One" },
        { gateNo: "44", gateName: "Gate Fourtyfour" },
        { gateNo: "91", gateName: "Gate Nintynine" },
        { gateNo: "86", gateName: "Gate Eightysix" },
        // Add more country codes as needed
    ];

    useEffect(() => {
        getGateListHandler()
            .then((res) => {
                if(res && res.data){
                    setGateData(transformGateData(res.data));
                }else{
                    setGateData([]);
                }
            }).catch((error)=>{
                console.error("Error fetching gate list:", error);
                setGateData([]);
            });

            getGateUserList()
            .then((res) => {
                setSecurityUserData(transformSecurityUserData(res.data));
            }).catch((error)=>{
                console.log(error);
                setSecurityUserData([]);
            })

    }, [])

    // console.log(gateData);
    // console.log("Index Zero: ",gateData[0]);

    // console.log("Gate user Data: ", securityUserData);


    const handleSubmit = async() => {
        console.log("Form Submit called!!");
        if(allocatedGate.length === 0){
            toast.error("Plz Add atleast one gate!");
            return;
        }


        try {
            await makeGateAllocation(allocatedGate);
            setAllocatedGate([]);
            // toast.success("Gate added Successfully!");
        }catch(error){
            console.log("Error in form submition: ", error);
        }
    };


    return (
        <>
            <UrlPath paths={paths} />

            <div className="p-10 my-5 border rounded-lg bg-gray-100">
                <div className="text-xl font-sans font-semibold text-lime">
                    Gate Allocation
                </div>

                <div className="grid grid-cols-3 gap-5 items-center">
                    <select
                        value={gateName}
                        onChange={(e) => setGateName(e.target.value)}
                        className="w-[15rem] mt-8 block border-gray-300 py-[15px] rounded-md shadow-sm focus:border-turquoise focus:ring focus:ring-turquoise focus:ring-opacity-50"
                    >
                        <option>
                            Select Your Gate No.
                        </option>
                        {gateData.map((item) => (
                            <option key={item.gateNumbar} value={item.gateId}>
                                {item.gateNumbar}. {item.gateName}
                            </option>
                        ))}
                    </select>



                    <select
                        value={guardName}
                        onChange={(e) => setGuardName(e.target.value)}
                        className="w-[15rem] mt-8 block border-gray-300 py-[15px] rounded-md shadow-sm focus:border-turquoise focus:ring focus:ring-turquoise focus:ring-opacity-50"
                    >
                        <option>
                            Select Guard Profile
                        </option>
                        {securityUserData.map((item) => (
                            <option key={item.profileId} value={item.profileId}>
                                {item.firstName} {item.lastName} 
                            </option>
                        ))}
                    </select>


                    <div className="mt-8">
                        <Button
                            onClick={allocateGateHandler}
                            className="flex items-center">
                            <FaPlus className="mr-2" /> Allocate
                        </Button>
                    </div>

                </div>

                <div className="flex justify-center">
                    <div className="mt-4">
                        {allocatedGate.map((value, index) => (
                            <div
                                key={index}
                                className="justify-center w-[28rem] relative p-4 mb-4 border rounded-lg bg-white shadow-md"
                            >
                                <MdOutlineCancel
                                    onClick={() => removeAllocation(index)}
                                    className="absolute right-3 top-3 text-red-600 cursor-pointer text-xl"
                                />
                                <p className="font-medium text-gray-700">
                                    <strong>Gate:</strong> {value.gate} (AllocatedTo User:{" "}
                                    {value.allocatedTo})
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-md mx-auto mt-6 flex justify-center">
                    <Button
                        onClick={handleSubmit} 
                        size="md">
                        Submit
                    </Button>
                </div>

            </div>
        </>
    )
}

export default GateAllocation