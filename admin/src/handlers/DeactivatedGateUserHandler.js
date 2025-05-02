import toast from "react-hot-toast";
import { createDefineUnitService, getUnitsServices } from "../services/defineunitService";
import { useSelector } from "react-redux";

const DeactivatedGateUserHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const CreateDeactivatedGateUserHandler = async (data, token) => {
    const { firstName, lastName, gateNo, mobileNo, email } = data;

    if (!firstName) {
      return toast.error("First Name is missing");
    }
    if (!lastName) {
      return toast.error("Last Name is missing");
    }
    if (!gateNo) {
      return toast.error("Gate No. is missing");
    }
    if (!mobileNo) {
      return toast.error("Mobile is missing");
    }
    if (!email) {
      return toast.error("Unit Number is missing");
    }
    
    return await createDefineUnitService({ societyId , ...data }).then((res) => {
      if (res.status === 201) {
        toast.success(`Unit ${data.unitName} created successfully.`);
      }
      return res;
    }).catch(err => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    })
  };

  const getDeactivatedUserHandler = async(data) => {
    return await getUnitsServices({ societyId, ...data }, token);
  }

  return {
    CreateDeactivatedGateUserHandler,
    // getUnitTypeHandler
    getDeactivatedUserHandler,
  };
};

export default DeactivatedGateUserHandler;
