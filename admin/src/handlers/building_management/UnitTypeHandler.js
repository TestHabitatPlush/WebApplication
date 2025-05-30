import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createUnitTypeService, getUnitTypeBySocietyIdService,deleteUnitTypeService,updateUnitTypeService } from "../../services/building_management/unitTypeService";

const UnitTypeHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);

  const createUnitTypeHandler = async (unitTypeName) => {

    if (!unitTypeName) {
      toast.error("Fill all the fields !");
      return;
    }

    return await createUnitTypeService({ unitTypeName, societyId }, token)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Unit Type Created");
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

  const getUnitTypeHandler = async () => {
    return await getUnitTypeBySocietyIdService(societyId, token)
    .then((res) => res)
 .catch((err) => {
  console.error(err);
  });
  }


  const deleteUnitTypeHandler = async (unitTypeId) => {
      try {
        const res = await deleteUnitTypeService(unitTypeId, token);
        return res;
      } catch (err) {
        console.error("Delete UnitType failed", err);
        throw err;
      }
    };

    const updateUnitTypeHandler = async (data) => {
      if (!data.unitTypeId) {
        console.error("Error: Missing UnitType in update data", data);
        return;
      }
    
      try {
        const res = await updateUnitTypeService(data, token);
        if (res.status === 200 && res.data?.data) {
          toast.success("UnitType updated successfully.");
          return res.data.data;
        } else {
          toast.error("Unexpected response status while updating.");
        }
      } catch (err) {
        console.error("Update failed:", err.response?.data || err.message);
        toast.error("Failed to update UnitType.");
      }
    };
    
  
  return { createUnitTypeHandler, getUnitTypeHandler ,deleteUnitTypeHandler,updateUnitTypeHandler};
};

export default UnitTypeHandler;