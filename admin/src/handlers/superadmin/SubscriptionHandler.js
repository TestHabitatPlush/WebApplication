import { getAllSubscriptionsService } from "../../services/subscriptionService";

const SubscriptionHandler = () => {
  const getAllSubscriptionsHandler = async () => {
    const response = await getAllSubscriptionsService();
    if (response) {
      return response.data;
    }
  };
  return { getAllSubscriptionsHandler };
};

export default SubscriptionHandler;
