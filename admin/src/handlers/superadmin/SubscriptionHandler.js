import { getAllSubscriptionsService,createPlanService,deleteSubscriptionService,getSubscriptionByIdService ,updateSubscriptionService,getAllModulesService} from "../../services/superadmin/subscriptionService";

const SubscriptionHandler = () => {
  const getAllSubscriptionsHandler = async () => {
    const response = await getAllSubscriptionsService();
    if (response) {
      return response.data;
    }
  };
  const createPlanHandler = async ({ token, data }) => {
      try {
        const response = await createPlanService(data, token);
        console.log("Plan created successfully:", response);
        return response;
      } catch (error) {
        console.error(
          "Error creating plan:",
          error.response?.data || error.message
        );
        return null;
      }
    };
  
    // const getAllSubscriptionsHandler = async (token) => {
    //   try {
    //     const data = await getAllSubscriptionsService(token);
    //     console.log("Subscriptions from API:", data);
    //     return Array.isArray(data) ? data : [];
    //   } catch (error) {
    //     console.error(
    //       "Error fetching subscriptions:",
    //       error.response?.data || error.message
    //     );
    //     return [];
    //   }
    // };
  
    const deleteSubscriptionByIdHandler = async (id, token) => {
      try {
        const result = await deleteSubscriptionService(id, token);
        console.log("Deleted subscription:", result);
        return true;
      } catch (error) {
        console.error(
          "Error deleting subscription:",
          error.response?.data || error.message
        );
        return false;
      }
    };
  
    const getSubscriptionByIdHandler = async (id, token) => {
      try {
        const result = await getSubscriptionByIdService(id, token);
        return result;
      } catch (error) {
        console.error("Error fetching subscription by ID:", error);
        return null;
      }
    };
  
    const updateSubscriptionHandler = async (id, token, data) => {
      try {
        const result = await updateSubscriptionService(id, token, data);
        console.log("Updated subscription:", result);
        return result;
      } catch (error) {
        console.error(
          "Error updating subscription:",
          error.response?.data || error.message
        );
        throw error;
      }
    };


  const getAllModulesHandler = async (token) => {
  try {
    const res = await getAllModulesService(token); // axios response
    console.log("Modules API response:", res.data);

    // Always return an array of modules
    return res.data.modules || res.data || [];
  } catch (err) {
    console.error("Error fetching modules:", err.response?.data || err.message);
    return [];
  }
};
  
    return {
      createPlanHandler,
      getAllSubscriptionsHandler,
      deleteSubscriptionByIdHandler,
      getSubscriptionByIdHandler,
      updateSubscriptionHandler, 
      getAllModulesHandler
    };

};

export default SubscriptionHandler;
