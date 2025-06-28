import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UrlPath from "../../../../components/shared/UrlPath";
import { IoPersonOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import PageHeading from "../../../../components/shared/PageHeading";
import GateUserListnHandler from "../../../../handlers/GateUserListHandler";
import ReusableTable from "../../../../components/shared/ReusableTable";
import ViewGateUserDetails from "./ViewGateUserDetails";


// import GateListHandler from "../../../../handlers/GateListHandler";


const AllGateUsers = () => {
    const paths = ["Gate Management", "All Gate Users"];
    const Heading = ["All Gate Users"];

    const { getGateUserList } = GateUserListnHandler();



    const [guardProfile, setGuardProfile] = useState([]);

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
            mobileNo: element.mobileNo || '', // Include mobile number if needed
            profilePhoto: element.profilePhoto || null, // Handle profile photo
            idProof: element.idProof || null, // Handle ID proof
            roleId: element.roleId || null, // Include roleId
            status: element.status || 'inactive', // Default status if needed
            createdAt: element.createdAt || null, // Include createdAt
            updatedAt: element.updatedAt || null // Include updatedAt
        }));
    };


    // Pagination states
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getGateUserList().then((res) => {
            setGuardProfile(transformSecurityUserData(res));
            setTotalCount(res.length);
        })
    })


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
        { Header: "MOBILE NO.", accessor: "mobileNo" },
        { Header: "EMAIL", accessor: "email" },
        {
          Header: "VIEW",
          accessor: "profileId",
          Cell: ({ value }) => (
            <button
              onClick={() => onViewHandler(value)}
              className="px-1 py-1 text-blue-600 hover:text-blue-800 font-medium"
            >
              Details
            </button>
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
                TOTAL 12 GATES AND {totalCount} USERS
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
                    data={guardProfile}
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