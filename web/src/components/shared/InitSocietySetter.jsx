// components/InitSocietySetter.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSociety } from "@/redux/slices/societySlice";

const InitSocietySetter = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const society = user?.Customer || user?.customer;
    if (society?.customerId) {
      dispatch(
        setSelectedSociety({
          id: society.customerId,
          name: society.customerName,
          type: society.customerType,
        })
      );
      console.log("✅ selectedSociety set:", society);
    } else {
      console.warn("⚠️ No society info found in user");
    }
  }, [user, dispatch]);

  return null;
};

export default InitSocietySetter;
