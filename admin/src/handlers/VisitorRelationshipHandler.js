import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  CreateVisitorRelationshipService,
  deleteVisitorRelationService,
  getVisitorRelationshipService,
  updateVisitorRelationService,
} from "../services/visitorRelationshipService";

const VisitorRelationshipHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const senderId = useSelector((state) => state.auth.user.userId);
 

  const RelationshipHandler = async (data) => {
    console.log("relationship", data);
    console.log(societyId, senderId); 
    return await CreateVisitorRelationshipService(
      { Visit_relation_Description: data, societyId, senderId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Visitor relationship created successfully.");
      }
    });
  };

  const getVisitorRelationTable = async (data) => {
    return await getVisitorRelationshipService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteVisitorById = async (data) => {
    console.log("deleted visitor handler", data);

    return await deleteVisitorRelationService(data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateVisitorById = async (data) => {
    console.log("update Visitor handler", data);

    return await updateVisitorRelationService(data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    RelationshipHandler,
    getVisitorRelationTable,
    deleteVisitorById,
    updateVisitorById,
  };
};

export default VisitorRelationshipHandler;
