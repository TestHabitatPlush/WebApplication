import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { gateAllocationService, gateAllocationListService, gateListServices, CreateGateService, ChangeGateNameService } from "../services/gateService"
import { delay } from "framer-motion";

const GateHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const GateRelationshipHandler = async (gates) => {
    try {
      console.log("Input gates:", JSON.stringify(gates, null, 2));
      console.log("Society ID type:", typeof societyId);
      console.log("Society ID value:", societyId);

      const payload = gates.map((gate) => ({
        societyId: societyId,
        gateName: gate.gateName,
        gateNumber: gate.gateNumber,
      }));

      // Add To see exact payload structure
      console.log("Final payload:", JSON.stringify(payload, null, 2));

      const response = await CreateGateService(payload, token);
      console.log("API Response:", response);

      if (response.status === 201) {
        toast.success("Gates submitted successfully.");
        return response;
      } else {
        const errorMessage = response.data?.message || "Failed to submit gates.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Gate submission error:", error);
      toast.error(error.message || "Failed to submit gates.");
      throw error;
    }
  };

  const getGateListHandler = async (data) => {

    return await gateListServices({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const makeGateAllocation = async (data) => {
    try {
      console.log("Handler Called!!");
      console.log(data);
      console.log(typeof (data));

      const payload = data.map((value) => ({
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

  const getGateAllocationList = async (data) => {
    return await gateAllocationListService(data, token, societyId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      })
  };


  const getChangeGateName = async (data) => {
    try {
      const {gateId, ...payLoad} = data;
      await ChangeGateNameService(payLoad, token, data.gateId)
        .then((res) => {
          if(res.data.data === 200){
            toast.success("Gate Name Changed !!");
          }
        })
        .catch((err) => {
          console.log(err);

        })

    } catch (error) {
      console.error("Error in Gatename Change: ", error);
      throw error;
    }
  }



  return {
    getChangeGateName,
    GateRelationshipHandler,
    getGateListHandler,
    makeGateAllocation,
    getGateAllocationList,
  };
};

export default GateHandler;