import toast from "react-hot-toast"
import {gateAllocationService, gateAllocationListService} from "../services/gateAllocationService";
import { useSelector } from "react-redux";

import React from 'react'


const GateAllocationHandler = () => {
    const token = useSelector((state) => state.auth.token);
    const societyId = useSelector((state) => state.auth.user.Customer.customerId);

    const makeGateAllocation = async(data) => {
        try {
            console.log("Handler Called!!");
            console.log(data);
            console.log(typeof(data));

            const payload = data.map((value)=>({
                societyId: societyId,
                gate: value.gate,
                allocatedTo: value.allocatedTo
            }));

            console.log("Final Payload:", JSON.stringify(payload, null, 2));

            const response = await gateAllocationService(payload, token);
            // console.log("Response From Gate Handler:",response);
            toast.success(response.data.message);
            
        } catch (error) {
            console.error("Gateallocation Error", error);
            // toast.error(error.message || "Faild to submit gate!");
            console.log("The Error Message is:", error.message.message);
            console.log("My Error: ", error);
            throw error;
        }
    };

    const getGateAllocationList = async(data) => {
        return await gateAllocationListService(data, token)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return {
        makeGateAllocation,
        getGateAllocationList,
    };
}


export default GateAllocationHandler;