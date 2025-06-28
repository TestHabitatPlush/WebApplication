import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCreativeCommons } from "react-icons/fa";
import { GuardUserCreationService, RemoveGuardProfile, gateUserListService, EditGuardUser } from "../services/profileService"

const ProfileHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const GuardRelationshipHandler = async (profileData) => {
    try {
      console.log("Handler Called!!!");
      // console.log("Input User Data:", profileData);
      // console.log("First Name: ", profileData.firstName);

      // Document Type is missing
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

  const removeGuardUser = async (profileId) =>{
    const payload = { status: 'inactive'}
    return await RemoveGuardProfile(payload, profileId, token)
    .then((res) =>{
      // console.log(res.data.message);
      if(res.data.message === 'JobProfile guard updated successfully'){
        toast.success(<div>
          Guard User Removed Successfully! <br />
          {'\u00A0'.repeat(12)} Reload the Page!
        </div>);
      }
      return res.message;
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  const editGuardUser = async (data) => {
    const prfId = data.profileId;
    const {profileId, ...payload} = data;
    return await EditGuardUser(payload, token, prfId)
    .then((res)=>{
      if(res.status === 200){
        toast.success("Details Changed Successfully !!")
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  return {
    GuardRelationshipHandler,
    editGuardUser,
    getGateUserList,
    removeGuardUser,
  };
};

export default ProfileHandler;