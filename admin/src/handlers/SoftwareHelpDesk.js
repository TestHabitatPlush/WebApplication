import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  createTicketService,
  defineTicketPurpousService,
  getAccessManagementService,
  getDefineTicketPurpousService,
  getTicketListService,
  getTicketStatusService,
  getTicketTableService,
  getTypeCatagorisationService,
  sendAccessManagementService,
  updateTicketPurposeService,
} from "../services/softwarehelpdeskService";

const SoftwareHelpDeskHandler = () => {
  const token = useSelector((state) => state.auth.token);
  const societyId = useSelector((state) => state.auth.user.Customer.customerId);
  const userId = useSelector((state) => state.auth.user.userId);

  const ticketPurpous = async (data) => {
    console.log("Ticket Purpose data handler", data);

    return await defineTicketPurpousService(
      { data, societyId, userId },
      token
    ).then((res) => {
      if (res.status === 201) {
        toast.success("Ticket Purpous created successfully.");
      }
    });
  };

  const ticketPurpousTable = async (data) => {
    return await getDefineTicketPurpousService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ticketPurpousListView = async () => {
    console.log("ticketPurpousListView", societyId);

    return await getTicketListService({ societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ticketStatusListView = async () => {
    console.log("ticketStatusListView");
    return await getTicketStatusService(token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createTicket = async (data) => {
    console.log("create ticket list handler data", data);
    return await createTicketService({ ...data, societyId, userId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTicketPurpousById = async (data) => {
    console.log("update define purpous by Id ", data);
    return await updateTicketPurposeService(data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTicketListTable = async (data) => {
    console.log("get Ticket List Table", data);
    return await getTicketTableService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTicketCatagorisation = async () => {
    return await getTypeCatagorisationService(token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTicketListById = () => {
    console.log("update Ticket By Id");
  };

  const accessManagementTable = async (data) => {
    console.log("It is Access Management Handler", data);
    return await getAccessManagementService({ ...data, societyId }, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendAccessManagementData = async (data) => {
    console.log("data handler", ...data);
    return await sendAccessManagementService(...data, token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    ticketPurpous,
    ticketPurpousTable,
    ticketPurpousListView,
    ticketStatusListView,
    createTicket,
    updateTicketPurpousById,
    getTicketListTable,
    getTicketCatagorisation,
    updateTicketListById,
    accessManagementTable,
    sendAccessManagementData,
  };
};

export default SoftwareHelpDeskHandler;
