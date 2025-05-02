import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCreativeCommons } from "react-icons/fa";
import { GuardUserCreationService } from "../services/GuardUserCreationService"

const GuardUserCreationHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const GuardRelationshipHandler = async (profileData) => {
    try {
      console.log("Handler Called!!!");
      console.log("Input User Data:", profileData);
      console.log("First Name: ", profileData.firstName);

      // Document Type is missing
      const payload = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        profilePhoto: profileData.profilePhoto,
        idProof: profileData.documentFile,
        email: profileData.email,
        mobileNo: profileData.mobileNumber,
        societyId: societyId,
        roleId: profileData.role,
        status: "active"
      };

      console.log("Payload Value is given bellow: ");
      console.log(payload);

      const response = await GuardUserCreationService(payload, token);

      if(response.status === 201){
        toast.success(response.data.message);
      }

      return response.status;

    } catch (error) {
      console.error("Gate submission error:", error);
      toast.error(error.message || "Failed to submit gates.");
      throw error;
    }
  };

  return {
    GuardRelationshipHandler,
  };
};

export default GuardUserCreationHandler;


