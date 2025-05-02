import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createUnitTypeService, getUnitTypeBySocietyIdService } from "../../services/building_management/unitTypeService";

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
  return { createUnitTypeHandler, getUnitTypeHandler };
};

export default UnitTypeHandler;