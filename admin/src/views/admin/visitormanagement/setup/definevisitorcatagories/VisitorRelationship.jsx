import React, { useEffect, useState } from "react";
import Input from "../../../../../components/shared/Input";
import Button from "../../../../../components/ui/Button";
import VisitorRelationshipHandler from "../../../../../handlers/VisitorRelationshipHandler";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import VisitorRelationshipEdit from "./VisitorRelationshipEdit";
import ReusableTable from "../../../../../components/shared/ReusableTable";
import toast from "react-hot-toast";
import VisitorRelationshipDelete from "./VisitorRelationshipDelete";
import { FaTrashAlt, FaEdit } from "react-icons/fa";


 const ActionData = ({ data, updateModal, deleteModal, updateForm }) => {
  const onUpdateRelation = () => {
    updateForm(data);
    updateModal();
  };
  const onDeleteRelation = () => {
    updateForm(data);
    deleteModal();
  };

  return (
    <div className="flex gap-1 relative">
      <button
        className="relative px-2 py-1 text-xs text-lime rounded-md hover:bg-opacity-90 group"
        onClick={onUpdateRelation}
      >
        <FaEdit className="text-lg" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs bg-lime text-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Update
        </span>
      </button>

      <button
        className="relative px-2 py-1 text-xs text-red-500 rounded-md hover:bg-opacity-90 group"
        onClick={onDeleteRelation}
      >
        <FaTrashAlt className="text-lg" />
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 text-xs bg-red-500 text-white px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Delete
        </span>
      </button>
    </div>
  );
};


const VisitorRelationship = () => {
  const [relationship, setRelationShip] = useState("");
  const {
    RelationshipHandler,
    getVisitorRelationTable,
    deleteVisitorById,
    updateVisitorById,
  } = VisitorRelationshipHandler();
  const [visitorRelation, setVisitorRelation] = useState([]);
  const [page, setPage] = useState(0); // Start from page 1
  const [pageSize, setPageSize] = useState(5); // Default to 5 items per page

  // update states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [transformedData, setTransformedData] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [total, setTotal] = useState(null);

  const fetchVisitorRelation = async () => {
    try {
      const result = await getVisitorRelationTable({
        page,
        pageSize,
      });
      console.log(result.data);
      setVisitorRelation(result.data.data); // Notices for the current page
      setTransformedData(
        result.data.data.map((el) => ({
          ...el,
          actions: (
            <ActionData
              data={el}
              updateModal={() => setShowUpdateModal(true)}
              deleteModal={() => setDeleteModal(true)}
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
    fetchVisitorRelation();
  }, [page, pageSize]);

  const handleInput = (e) => {
    setRelationShip(e.target.value);
  };

  const handleSubmit = () => {
    RelationshipHandler(relationship).then((res) => {
      fetchVisitorRelation();
      setRelationShip("");
    });
  };

  const deleteHandler = (id) => {
    console.log("deleted data", id);
    deleteVisitorById(id)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          toggleDeleteVisitorDetailModal();
          fetchVisitorRelation();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleUpdateVisitorDetailModal = () => {
    setShowUpdateModal((prev) => !prev);
  };

  const onSubmitEdit = (formData) => {
    updateVisitorById(formData).then((res) => {
      toast.success("Updated");
      fetchVisitorRelation();
      toggleUpdateVisitorDetailModal();
    });
  };

  const columns = [
    { Header: "Relation Description", accessor: "Visit_relation_Description" },
    { Header: "Actions", accessor: "actions" },
  ];

  // delete modal

  const [viewDeleteModal, setDeleteModal] = useState(false);
  const toggleDeleteVisitorDetailModal = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <div>Visitor Category</div>
        <div>
          <Input
            // label={<div>First Name</div>}
            type="text"
            value={relationship}
            onChange={handleInput}
            placeholder={"Visitor Category"}
            size={"lg"}
          />
        </div>
        <div>
          <Button
            className="max-w-sm"
            onClick={handleSubmit}
            type="submit"
            size="md"
          >
            Submit
          </Button>
        </div>
      </div>

      <div>
        <div className="font-sans font-bold mb-[15px] text-[15px] text-lime">
          Visitor Table
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
          <VisitorRelationshipEdit
            isOpen={showUpdateModal}
            onClose={toggleUpdateVisitorDetailModal}
            formData={updateFormData}
            onEditHandler={onSubmitEdit}
          />
        )}

        {/* delete modal */}

        {viewDeleteModal && (
          <VisitorRelationshipDelete
            isOpen={viewDeleteModal}
            onClose={toggleDeleteVisitorDetailModal}
            formData={updateFormData}
            onConfirm={deleteHandler}
          />
        )}
      </div>
    </div>
  );
};

export default VisitorRelationship;
