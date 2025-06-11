import React, { useEffect, useState } from "react";
import { FaSearch, FaEye} from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import { IoPersonOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableTable from "../../../../components/shared/ReusableTable";
import ViewGateUserDetails from "./ViewGateUserDetails";

import ProfileHandler from "../../../../handlers/ProfileHandler";
import GateHandler from "../../../../handlers/GateHandler";

const ApprovedGateUser = () => {
  const paths = ["Gate Management", "Unapproved Gate Users"];
  const Heading = ["Unapproved Gate Users"];

  const { getGateUserList } = ProfileHandler();
  const { getGateAllocationList } = GateHandler();
  const { getGateListHandler } = GateHandler();

  const [guardProfile, setGuardProfile] = useState([]);
  const [gateAllocations, setGateAllocations] = useState([]);
  const [gateList, setGateList] = useState([]);

  // on View Handler
  const [viewmodal, setViewModal] = useState(false);
  const [showViewFormData, setShowViewFormData] = useState(null);
  const toggleViewNoticeDetailModal = () => {
    setViewModal((prev) => !prev); // Toggle modal visibility
  };



  const transformSecurityUserData = (response) => {
    if (!response || !Array.isArray(response)) return [];

    return response.map(element => ({
      profileId: element.profileId, // Keep profileId if needed
      firstName: element.firstName || '', // Default to empty string if undefined
      lastName: element.lastName || '',
      email: element.email || '',
      mobileNo: element.mobileNumber || '', // Include mobile number if needed
      profilePhoto: element.profilePhoto || null, // Handle profile photo
      idProof: element.idProof || null, // Handle ID proof
      roleId: element.roleId || null, // Include roleId
      roleCategory: element.roleCategory || null,
      status: element.status || 'inactive', // Default status if needed
      createdAt: element.createdAt || null, // Include createdAt
      updatedAt: element.updatedAt || null // Include updatedAt
    }));
  };

  // console.log(guardProfile);

  // Pagination states
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalGate, setTotalGate] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    getGateUserList().then((res) => {
      if(Array.isArray(res.data)){
        setGuardProfile(transformSecurityUserData(res.data));
        setTotalCount(res.data.length);
      }else{
        setGuardProfile([]);
        setTotalCount(0);
      }

    }).catch((error)=>{
      console.log(error);
      setGuardProfile([]);
    })

    getGateAllocationList().then((res) => {
      setGateAllocations(res);

    }).catch((error)=>{
      console.error("Error fetching gate list:", error);
    })

    getGateListHandler().then((res)=>{
      console.log(res.data.data);
      setGateList(res.data.data);
      setTotalGate(res.data.data.length)
    })
    .catch((error)=>{
      console.error("Error fetching gate list:", error);
    })

  }, [])

  // console.log(totalCount);
  // console.log("Guard Profile: ", guardProfile);
  // console.log("Gate Allocation Details: ",gateAllocations);
  // console.log("Gate List: ", gateList);


  // Combining Data
  const combineData = ({ guardProfile, gateAllocations, gateList }) => {
    if (!Array.isArray(guardProfile) || !Array.isArray(gateAllocations) || !Array.isArray(gateList)) {
      console.error("Invalid input: All inputs must be arrays.");
      return [];
    }

    return gateAllocations
      .filter(allocation => guardProfile.some(user => user.profileId === allocation.profileId && user.status === 'inactive'))
      .map(allocation => {
        const guard = guardProfile.find(user => user.profileId === allocation.profileId && user.status === 'inactive');
        const gate = gateList.find(gate => gate.gateId === allocation.gateId);

        return {
          profileId: allocation.profileId,
          firstName: guard.firstName,
          lastName: guard.lastName,
          email: guard.email,
          mobileNo: guard.mobileNo,
          gateId: allocation.gateId,
          gateName: gate?.gateName || "N/A",
          gateNumber: gate?.gateNumber || "N/A",
        };
      });
  };

  const Combined = combineData({ guardProfile, gateAllocations, gateList });



  const onViewHandler = (idValue) => {
    console.log("View clicked: ", idValue);
    const findGuardById = (guardProfile, targetId) => {
      return guardProfile.find(guard => guard.profileId === targetId);
    };

    const foundGuard = findGuardById(guardProfile, idValue);
    // console.log("Found Guard",foundGuard);
    // console.log(typeof (foundGuard));
    setShowViewFormData(foundGuard);
    setViewModal(true);
  }



  const columns = [
    { Header: "FIRST NAME", accessor: "firstName" },
    { Header: "LAST NAME", accessor: "lastName" },
    { Header: "GATE NO.", accessor: "gateNumber" },
    { Header: "GATE Name", accessor: "gateName" },
    { Header: "MOBILE NO.", accessor: "mobileNo" },
    { Header: "EMAIL", accessor: "email" },
    {
      Header: "VIEW",
      accessor: "profileId",
      Cell: ({ value }) => (
        <div className="flex space-x-4">
        <FaEye 
        onClick={() => onViewHandler(value)}
        className="text-lg text-yellow-600 hover:text-yellow-700 cursor-pointer"/>
        </div>
      )
    }
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
          <div className="flex flex-row font-sans text-lg font-medium text-gray-700">
            TOTAL {totalGate} GATES AND {totalCount} USERS
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
                data={Combined}
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
      </div>


      {setViewModal && (<ViewGateUserDetails
        isOpen={viewmodal} // Modal open state
        onClose={toggleViewNoticeDetailModal} // Close modal handler
        formData={showViewFormData} // The data to display in the modal
      />)}

    </div>
  );
};

export default ApprovedGateUser;
