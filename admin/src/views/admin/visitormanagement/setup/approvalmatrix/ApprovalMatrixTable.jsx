import React, { useEffect, useState } from "react";
import UrlPath from "../../../../../components/shared/UrlPath";
import PageHeading from "../../../../../components/shared/PageHeading";
import ReusableTable from "../../../../../components/shared/ReusableTable";
import VisitorApprovedMatrixHandler from "../../../../../handlers/VisitorApprovedMatrixHandler";

const ActionData = ({ data, updateForm }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const onOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    console.log(`Selected: ${value}, Data: ${data.Visit_relation_Description}`);
    // You can also call appropriate handlers based on the selection
    // For example:
    if (value === "yes") {
      console.log("Yes selected");
      // Perform Yes action
    } else if (value === "no") {
      console.log("No selected");
      // Perform No action
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label className="flex items-center gap-1">
        <input
          type="radio"
          value="yes"
          checked={selectedOption === "yes"}
          onChange={onOptionChange}
          className="form-radio text-lime-600 focus:ring-lime-500"
        />
        <span className="text-sm text-gray-700">Yes</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          value="no"
          checked={selectedOption === "no"}
          onChange={onOptionChange}
          className="form-radio text-red-500 focus:ring-red-500"
        />
        <span className="text-sm text-gray-700">No</span>
      </label>
    </div>
  );
};

const ApprovalMatrixTable = () => {
  const paths = ["Visitor Management", "Setup", "Approval Matrix"];
  const Heading = ["Approval Matrix"];
  const [page, setPage] = useState(0); // Start from page 1
  const [pageSize, setPageSize] = useState(5); // Default to 5 items per page
  const { getVisitorAprrovalMatrix } = VisitorApprovedMatrixHandler();
  const [matrixData, setMatrixData] = useState([]);
  const [updateFormData, setUpdateFormData] = useState(null);

  useEffect(() => {
    const fetchApprovedMatrix = async () => {
      try {
        const result = await getVisitorAprrovalMatrix({
          page,
          pageSize,
        });
        console.log(result);
        setMatrixData(
          result.data.data.map((el) => ({
            ...el,
            actions: (
              <ActionData
                data={el}
                updateForm={setUpdateFormData}
              />
            ),
          }))
        );
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchApprovedMatrix();
  }, [page, pageSize]);

  const columns = [
    { Header: "First Name", accessor: "firstName" },
    { Header: "Role", accessor: "managementDesignation" },
    { Header: "Actions", accessor: "actions" },
  ];

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="font-sans font-bold mb-[15px] text-[15px] text-lime">
          Visitor Table
        </div>

        <ReusableTable
          columns={columns}
          data={matrixData}
          pageIndex={page}
          pageSize={pageSize}
          setPageIndex={(index) => setPage(index)}
          setPageSize={(size) => setPageSize(size)}
        />
      </div>
    </div>
  );
};

export default ApprovalMatrixTable;
