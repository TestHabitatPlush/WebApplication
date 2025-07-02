import { useEffect } from "react";
import Dialog from "../../../../../components/ui/Dialog";
import SocietyCreateForm from "../../components/SocietyCreateForm";
import CustomerHandler from "../../../../../handlers/superadmin/CustomerHandler";
import { setCustomerFormData, setSubscriptionPlans } from "../../../../../redux/slices/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import SubscriptionHandler from "../../../../../handlers/superadmin/SubscriptionHandler";

const ViewSocietyDetailsModal = ({ onClose, isOpen }) => {
    const { getCustomerDetailsByIdHandler, updateCustomerDetailsByIdHandler } = CustomerHandler();
    const { getAllSubscriptionsHandler } = SubscriptionHandler();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.customer.customerForm);
    const subscriptionPlans = useSelector((state) => state.customer.subscriptionPlans);
    const customerId = useSelector((state) => state.customer.customerId);

    const fetchSubscriptionPlans = async () => {
        console.log("fetchSubscriptionPlans called");
        try {
            getAllSubscriptionsHandler(customerId).then((response) => {
                const plans = response.map((plan) => ({
                    value: plan.subscriptionId,
                    label: plan.planName,
                }));
                console.log(plans)
                dispatch(setSubscriptionPlans(plans));
            });
        } catch (error) {
            console.error("Error fetching subscription plans:", error);
        }
    };

    useEffect(() => {
        console.log(customerId)
        if (subscriptionPlans.length <= 1) fetchSubscriptionPlans();

    }, [customerId]);

    useEffect(() => {
        if (customerId) {
            getCustomerDetailsByIdHandler(customerId).then(res => {
                const { Address, ...formData } = res.data.data;
                console.log(Address, formData);
                dispatch(setCustomerFormData({ address: Address, ...formData }));

            }).catch(err => {
                console.log(err);
            })
        }
    }, [])

    const societyList = useSelector((state) => state.society.data);

    const onEditHandler = (e) => {
        updateCustomerDetailsByIdHandler(customerId, formData).then(res => {
            console.log(res);
            const { customerId, societyId, customerName, customerType, email, phone, establishedYear, societyType, } = res.data.data;

            const newSocietyList = societyList.map(el => {
                if (el.customerId === customerId) {
                    return {
                        ...el, societyId, customerName, customerType, email, phone, establishedYear, societyType
                    }
                } else
                    return el;
            })

            dispatch({
                type: 'society/setSocietyLists',
                payload: newSocietyList
            });
            onClose();

        }).catch(err => console.log(err));
    }

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            className="h-full w-full overflow-auto p-10"
            contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`}
            overlayClassName="backdrop-blur"
        >
            <SocietyCreateForm onEditHandler={onEditHandler} />

        </Dialog>
    )
}

export default ViewSocietyDetailsModal;