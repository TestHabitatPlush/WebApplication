import { useSelector } from "react-redux";
import { gateUserListService } from "../services/gateUserListService";


const GateUserListnHandler = () => {
    const token = useSelector((state) => state.auth.token);
    const societyId = useSelector((state) => state.auth.user.Customer.customerId);

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
        getGateUserList,
    };
};

export default GateUserListnHandler;
