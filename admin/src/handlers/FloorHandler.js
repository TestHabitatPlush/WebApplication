
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createFloorService, getFloorBySocietyIdService } from "../services/floorService";

const FloorHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const createFloorHandler = async (data) => {
    const { floorName, shortForm } = data;
    if (!floorName || !shortForm) {
      toast.error("Fill all the fields !");
      return;
    }

    return await createFloorService({ floorName, shortForm, societyId }, token)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Floor created");
        }
        return res;
      })
      .catch((err) => {
        if (err.status === 400) {
          toast.error(err.response.data.message);
        }
        console.log(err);
      });
  };

  const getFloorHandler = async () => {
    return await getFloorBySocietyIdService( societyId, token)
    .then((res)=> res)
    .catch((err)=>{
      console.error("Error featching floor:",err)
    })
  };

  return { createFloorHandler, getFloorHandler };
};

export default FloorHandler;