import { getNeighbourService } from "../services/neighboursService";
import { useSelector } from "react-redux";

const NeighbourHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.user?.userId);

  const getNeighbourHandler = async (userId, token, { page, pageSize }) => {
    try {
      const response = await getNeighbourService(userId, token, { page, pageSize });
      return response.data;
    } catch (error) {
      console.error("Error fetching neighbour data:", error);
      return [];
    }
  };

  return {
    getNeighbourHandler,
  };
};

export default NeighbourHandler;
