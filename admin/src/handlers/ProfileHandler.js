import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GuardUserCreationService, gateUserListService } from "../services/profileService"

const ProfileHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const GuardRelationshipHandler = async (profileData) => {
    try {
      console.log("Handler Called!!!");
      const payload = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        mobileNumber: profileData.mobileNumber,
        documentType: profileData.documentType,
        roleCategory: profileData.role,
        profilePhoto: profileData.profilePhoto,
        idProof: profileData.documentFile,
      };

      console.log("Payload Value is given bellow: ");
      console.log(payload);

      const response = await GuardUserCreationService(payload, token,societyId);

      if (response.status === 201) {
        toast.success(response.data.message);
      }

      return response.status;

    } catch (error) {
      console.error("User submission error:", error);
      toast.error(error.message || "Failed to submit User.");
      throw error;
    }
  };

  const getGateUserList = async (data) => {

    return await gateUserListService(data, token, societyId)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    GuardRelationshipHandler,
    getGateUserList,
  };
};

export default ProfileHandler;