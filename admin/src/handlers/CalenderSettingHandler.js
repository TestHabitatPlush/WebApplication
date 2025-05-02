import toast from "react-hot-toast";
import { createCalenderSettingService } from "../services/calenderSettingService";

const CalenderSettingHandler = () => {
  const CreateCalenderSettingHandler = (data) => {
    createCalenderSettingService(data).then((res) => {
      if (res.status === 201) {
        toast.success("Calender updated successfully.");
      }
    });
  };
  return {
    CreateCalenderSettingHandler,
  };
};
export default CalenderSettingHandler;
