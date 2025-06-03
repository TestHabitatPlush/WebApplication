
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createFloorService, getFloorBySocietyIdService ,deleteFloorService,updateFloorService} from "../services/floorService";

const FloorHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const createFloorHandler = async (data) => {
    const { floorName, shortForm } = data;
   // if (!floorName || !shortForm) {
    //  toast.error("Fill all the fields !");
    //  return;
   // }

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
  
  const deleteFloorHandler = async (floorId) => {
    try {
      const res = await deleteFloorService(floorId, token);
      return res;
    } catch (err) {
      console.error("Delete floor failed", err);
      throw err;
    }
  };
const updateFloorHandler = async (data) => {
  if (!data.floorId) {
    console.error("Error: Missing floorId in update data", data);
    return;
  }

  try {
    const res = await updateFloorService(data, token);
    if (res.status === 200 && res.data?.data) {
      toast.success("floor updated successfully.");
      return res.data.data; // ✅ updated building
    } else {
      toast.error("Unexpected response status while updating.");
    }
  } catch (err) {
    console.error("Update failed:", err.response?.data || err.message);
    toast.error("Failed to update floorId.");
  }
};


  return { createFloorHandler, getFloorHandler ,deleteFloorHandler,updateFloorHandler};
};

export default FloorHandler;