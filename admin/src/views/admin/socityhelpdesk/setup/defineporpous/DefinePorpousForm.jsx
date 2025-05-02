import React, { useEffect, useState } from "react";
import UrlPath from "../../../../../components/shared/UrlPath";
import PageHeading from "../../../../../components/shared/PageHeading";
import Input from "../../../../../components/shared/Input";
import Button from "../../../../../components/ui/Button";
import SoftwareHelpDeskHandler from "../../../../../handlers/SoftwareHelpDesk";
import ReusableTable from "../../../../../components/shared/ReusableTable";
import DefinePurposeEdit from "./DefinePurposeEdit";
import toast from "react-hot-toast";
import DefinePorpousView from "./DefinePorpousView";

const ActionData = ({ data, updateModal, viewModal, updateForm }) => {
  const onUpdateRelation = () => {
    // dispatch(setCustomerId(data.customerId));
    // dispatch(setFormOperationType('view'));
    updateForm(data);
    // console.log(data.Visit_relation_Description);
    updateModal();
  };
  const onViewRelation = () => {
    // dispatch(setCustomerId(data.customerId));
    // dispatch(setFormOperationType('edit'));
    updateForm(data);

    // console.log(data.Visit_relation_Description);
    viewModal();
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 text-xs bg-lime text-white rounded-md hover:bg-opacity-90"
        onClick={onUpdateRelation}
      >
        Edit
      </button>
      <button
        className="px-2 py-1 text-xs bg-gray-900 text-white rounded-md hover:bg-opacity-90"
        onClick={onViewRelation}
      >
        View
      </button>
    </div>
  );
};

const DefinePorpousForm = () => {
  const paths = ["Socity HelpDesk Management", "Setup", "Define Purpous"];
  const Heading = ["Define Purpous"];
  const [ticketpurpous, setTicketPurpous] = useState("");
  const { ticketPurpous, ticketPurpousTable, updateTicketPurpousById } =
    SoftwareHelpDeskHandler();

  // get ticket purpous
  const [page, setPage] = useState(0); // Start from page 1
  const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [total, setTotal] = useState(null);

  // update data
  const [updateFormData, setUpdateFormData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const fetchDefinePurposeTable = async () => {
    try {
      const result = await ticketPurpousTable({
        page,
        pageSize,
      });
      console.log(result);
      setTransformedData(
        result.data.data.map((el) => ({
          ...el,
          actions: (
            <ActionData
              data={el}
              updateModal={() => setShowUpdateModal(true)}
              viewModal={() => setShowViewModal(true)}
              updateForm={setUpdateFormData}
            />
          ),
        }))
      );

      setTotal(result.data.total);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDefinePurposeTable();
  }, [page, pageSize]);

  // update
  const toggleUpdateDefinePurpousModal = () => {
    setShowUpdateModal((prev) => !prev);
  };
  // view

  const toggleViewDefinePurpousModal = () => {
    setShowViewModal((prev) => !prev);
  };

  const onSubmitEdit = (formData) => {
    updateTicketPurpousById(formData).then((res) => {
      toast.success("Updated");
      fetchDefinePurposeTable();
      toggleUpdateDefinePurpousModal();
    });
    // updateVisitorById(formData).then((res) => {
    //   toast.success("Updated");
    //   fetchVisitorRelation();
    //   toggleUpdateVisitorDetailModal();
    // });
    // console.log("edit data", formData);
  };

  // submitHandler
  const submitHandler = () => {
    // console.log("ticket purpous", ticketpurpous);
    ticketPurpous(ticketpurpous).then((res) => {
      setTicketPurpous(" ");
      fetchDefinePurposeTable();
    });
  };
  const columns = [
    { Header: "Purpous", accessor: "purpose_Details" },
    { Header: "Status", accessor: "status" },
    { Header: "Action", accessor: "actions" },
  ];

  return (
    <div className="px-5 ">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-2 gap-7 items-center">
          <Input
            label={<div>Ticket Purpous </div>}
            type="text"
            placeholder={"Enter Ticket Purpous"}
            size={"lg"}
            value={ticketpurpous}
            onChange={(e) => setTicketPurpous(e.target.value)}
          />
          <div>
            <Button
              className="max-w-sm"
              type="submit"
              onClick={submitHandler}
              size="lg"
            >
              Submit
            </Button>
          </div>
        </div>

        {/* <DefineTicketList /> */}
        <div>
          <div className="text-[15px] font-sans font-bold mb-[15px]">
            Ticket Purpous List
          </div>
          <ReusableTable
            columns={columns}
            data={transformedData}
            pageIndex={page}
            pageSize={pageSize}
            totalCount={total}
            totalPages={totalPages}
            setPageIndex={(index) => setPage(index)}
            setPageSize={(size) => setPageSize(size)}
          />

          {showUpdateModal && (
            <DefinePurposeEdit
              isOpen={showUpdateModal}
              onClose={toggleUpdateDefinePurpousModal}
              formData={updateFormData}
              onEditHandler={onSubmitEdit}
            />
          )}

          {showViewModal && (
            <DefinePorpousView
              isOpen={showViewModal}
              onClose={toggleViewDefinePurpousModal}
              formData={updateFormData}
              // onEditHandler={onSubmitEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DefinePorpousForm;

// const DefineTicketList = () => {
//   return (

//   );
// };
