import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerHandler from "../../../../handlers/superadmin/CustomerHandler";
import SubscriptionHandler from "../../../../handlers/superadmin/SubscriptionHandler";
import {
  resetCustomerForm,
  setSubscriptionPlans,
} from "../../../../redux/slices/customerSlice";
import SocietyCreateForm from "../components/SocietyCreateForm";

const CreateSociety = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.customer.customerForm);
  const { createCustomerHandler } = CustomerHandler();
  const { getAllSubscriptionsHandler } = SubscriptionHandler();
  const subscriptionPlans = useSelector(
    (state) => state.customer.subscriptionPlans
  );

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      console.log("fetchSubscriptionPlans called");
      try {
        getAllSubscriptionsHandler().then((response) => {
          const plans = response.map((plan) => ({
            value: plan.subscriptionId,
            label: plan.planName,
          }));
          console.log(plans);
          dispatch(setSubscriptionPlans(plans));
        });
      } catch (error) {
        console.error("Error fetching subscription plans:", error);
      }
    };
    if (subscriptionPlans.length == 1) fetchSubscriptionPlans();
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   createCustomerHandler(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomerHandler(formData); // Submit form data
      dispatch(resetCustomerForm()); // Reset form fields after submission
      console.log("Form submitted successfully.");
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  useEffect(() => {
    // Reset form to initial state when this component loads
    dispatch(resetCustomerForm());
  }, [dispatch]);

  return (
    <form className="p-5">
      <div className="text-xl mb-5"></div>
      <SocietyCreateForm onSubmit={handleSubmit} />
    </form>
  );
};

export default CreateSociety;
