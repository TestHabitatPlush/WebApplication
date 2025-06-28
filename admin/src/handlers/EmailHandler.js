import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import { createEmailConfigurationService } from "../services/emailConfigurationService";

const EmailHandler = () => {

  const createEmailHandler = (data) => {
    createEmailConfigurationService(data).then((res) => {
      if (res.status === 201) {
        toast.success("Email sent successfully.");
      }
    });
  };

  return {
    createEmailHandler,
  };
};
export default EmailHandler;
