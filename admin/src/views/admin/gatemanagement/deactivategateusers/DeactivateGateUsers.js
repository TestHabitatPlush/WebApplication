import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import { IoPersonOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import PageHeading from "../../../../components/shared/PageHeading";
import DeactivatedGateUserHandler from "../../../../handlers/DeactivatedGateUserHandler";
import ReusableTable from "../../../../components/shared/ReusableTable";

const DeactivatedGateUser = () => {
  const paths = ["Gate Management", "Deactivate Gate Users"];
  const Heading = ["Deactivated Gate Users"];


  const [data, setData] = useState([]);
  const { getDeactivatedUserHandler } = DeactivatedGateUserHandler()

  const transformGateDeactivatedUserData = (data) => {
    return data.map((element) => {
      return {}
    })
  }

  // Pagination states
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getDeactivatedUserHandler({ page: pageIndex, limit: pageSize })
      .then((res) => {
        console.log(res.data.data);
        setData(transformGateDeactivatedUserData(res.data.data));
        setTotalCount(res.data.total);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.log(err));
  }, [pageIndex, pageSize]);

  const columns = [
    { Header: "FIRST NAME", accessor: "firstName" },
    { Header: "LAST NAME", accessor: "lastNumber" },
    { Header: "GATE NO.", accessor: "gateNo" },
    { Header: "MOBILE NO.", accessor: "mobileNo" },
    { Header: "EMAIL", accessor: "email" },
    { Header: "VIEW", accessor: "view" }
  ];


  return (
    <div className="">
      <UrlPath paths={paths} />
      <div className="flex">
        <div className="w-full">
          <PageHeading heading={Heading} />
          {/* <div className="flex flex-row font-sans text-2xl font-bold">
            Approved Users
          </div> */}
          <div className="uppercase flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL 3 DEACTIVATED USERS
          </div>
          <div className="flex flex-row mt-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by Gate/Users..."
                className="px-4 py-4 border w-full border-gray-300 rounded-md focus:outline-none"
              />
              <FaSearch className="absolute right-7 top-5 text-lg text-gray-500" />
            </div>
          </div>
          <div className="flex flex-col mt-[35px] space-y-3">
            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
              <ReusableTable
                columns={columns}
                data={data}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalCount={totalCount}
                totalPages={totalPages}
                setPageIndex={(index) => setPageIndex(index)}
                setPageSize={(size) => setPageSize(size)}
              />  
            </div>
          </div>
        </div>
        {/* <div className="w-1/2 ">
          <div className="px-[45px] text-xl font-semibold">
            UNIT : <span>A-013</span>
          </div>
          <div className="border my-[30px] mx-[45px] border-gray-800"></div>
          <div className="flex flex-col space-y-2 px-[45px] ">
            <div className="font-sans text-[15px] text-gray-600">
              {" "}
              Bill to name : Praveen
            </div>
            <div className="font-sans text-[15px] text-gray-600">
              Unit no :A-013{" "}
            </div>
            <div className="font-sans text-[15px] text-gray-600">
              Physical Unit Address:{" "}
            </div>

            <div className="font-sans text-[15px] text-gray-600">
              Billing Address{" "}
            </div>
          </div>
          <div className="text-lime px-[45px] pt-[40px] font-sans">
            View/Edit Unit and Address details
          </div>
          <div className="flex flex-row items-center py-[30px] px-[45px]">
            <IoPersonOutline className="text-xl mr-[30px]" />{" "}
            <div className="text-lg font-sans font-base">Unit Members(2)</div>
          </div>
          <div className="border  mx-[45px] border-gray-800"></div>
          <div className="flex flex-row items-center py-[30px] px-[45px]">
            <FaCar className="text-xl mr-[30px]" />{" "}
            <div className="text-lg font-sans font-base">Vehicle(1)</div>
          </div>
          <div className="border  mx-[45px] border-gray-800"></div>
        </div>{" "} */}
      </div>
    </div>
  );
};

export default DeactivatedGateUser;
