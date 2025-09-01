import React, { useRef, useState,useEffect } from 'react'
import { TiArrowUpThick, TiArrowDownOutline  } from "react-icons/ti";
import UrlPath from "../../../../components/shared/UrlPath";
import Button from '../../../../components/ui/Button';
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableInputForm from "../../../../components/shared/ReusableInputForm"
import { useSelector } from "react-redux";
import UserHandler from '../../../../handlers/UserHandler';
import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";

const BulkUserCreation = () => {
    const paths = ["User Management", "Create Bulk User"];
    const Heading = ["Bulk Users Creation"];
    const format = `${process.env.REACT_APP_ADMIN_URL}/Bulk_user_format.xlsx`;
    const fileInputRef = useRef(null);
    const societyId = useSelector((state) => state.auth.user?.Customer?.customerId) || "";
    const { createBulkSocietyUserHandler ,createMultipleSocietyUserHandler} = UserHandler(); 
    // const [file, setFile] = useState(null);
    const { getUnitsHandler } = DefineUnitHandler();

   const [pageIndex, setPageIndex] = useState(1);
   const [pageSize] = useState(10);
   const [units, setUnits] = useState([]);
   
    const downloadFormatFile=(url)=>{
        const fileName = "Bulk_user_format.xlsx";
        const aTag = document.createElement("a");
        aTag.href = url;
        aTag.setAttribute('download', fileName);
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert("Please select a file first");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        const myStatus = await createBulkSocietyUserHandler(societyId, formData);
        console.log(myStatus);
        
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUnitsHandler({ page: pageIndex, pageSize });
      if (res) {
        setUnits(
          res.data?.map((u) => ({
            value: u.unitId,
            label: `${u.buildingName || "Building"}-${u.unitNumber || ""}`,
          })) || []
        );
      }
    };
    fetchData();
  }, [pageIndex, pageSize]);
  
const handleManualSubmit = async (rows) => {
  const selectedRows = rows.filter((r) => r.select);
  if (!selectedRows.length) {
    alert("Please select at least one row.");
    return;
  }
  const users = selectedRows.map((r) => ({
    salutation: r.salut,
    firstName: r.fname,
    lastName: r.lname,
    email: r.email,
    mobileNumber: r.mnumber,
    roleId: r.roleId,  // ✅ backend expects roleId
    unitId: r.unitId,
    "address.street": r.street,
    "address.city": r.city,
    "address.state": r.state,
    "address.zipCode": r.zipCode,
    "address.address1": r.address1,
    "address.address2": r.address2,
  }));
  await createMultipleSocietyUserHandler(societyId, users);
};

    const formColumns = [
        {
            Header: 'Select',
            accessor: 'select',
            inputType: 'checkbox'
        },
        {
            Header: 'salutation',
            accessor: 'salut',
            inputType: 'select',
            required: true,
            options: [
                { value: 'mr', label: 'Mr.' },
                { value: 'mss', label: 'Miss' },
                { value: 'mrs', label: 'Mrs' },
                { value: 'dr', label: 'Dr' }
            ]
        },
        {
            Header: 'First Name',
            accessor: 'fname',
            inputType: 'text',
            required: true,
            placeholder: 'Enter First name'
        },
        {
            Header: 'Last Name',
            accessor: 'lname',
            inputType: 'text',
            required: true,
            placeholder: 'Enter Last name'
        },
        {
            Header: 'Email',
            accessor: 'email',
            inputType: 'email',
            required: true,
            placeholder: 'Enter email address'
        },
        {
            Header: 'Mobile No.',
            accessor: 'mnumber',
            inputType: 'text',
            required: true,
            placeholder: 'Contact Nuumber'
        },
        { Header: "Role", accessor: "roleId", inputType: "select", required: true,
      options: [
        { value: 5, label: "Owner" },
        { value: 6, label: "Owner Family" },
        { value: 7, label: "Tenant" },
        { value: 8, label: "Tenant Family" },
      ] },
        { Header: "Unit", accessor: "unitId", inputType: "select", required: true, options: units },

           { Header: "Street", accessor: "street", inputType: "text" },
          { Header: "City", accessor: "city", inputType: "text" },
          { Header: "State", accessor: "state", inputType: "text" },
          { Header: "Zip Code", accessor: "zipCode", inputType: "text" },
          { Header: "Address Line 1", accessor: "address1", inputType: "text" },
          { Header: "Address Line 2", accessor: "address2", inputType: "text" },
        ];
    return (
        <>
            <UrlPath paths={paths} />
            <div className='flex'>
                <div className='w-full'>
                    <PageHeading heading={Heading} />
                    <div className='flex flex-col mt-[35px] space-y-3'>
                        <div className='flex justify-end gap-8 mr-12'>
                            <button className='flex gap-2 p-2 text-white bg-green-600 rounded-md'>Upload File <TiArrowUpThick className='mt-1'/>
                            <input type="file" onChange={handleUpload}/>
                            </button>
                            <button onClick={() => downloadFormatFile(format)} className='flex gap-2 p-2 text-white bg-green-600 rounded-md'>Download Format<TiArrowDownOutline className='mt-1' /></button>
                        </div>
                        <div className='relative w-full overflow-x-auto shadow-md sm:rounded-lg'>
                            <ReusableInputForm
                                columns={formColumns}
                               
                                formTitle=""
                                numberOfRows={2}
                                onSubmit={handleManualSubmit}
                                onRowAdd={(rowIndex) => {
                                    console.log('Row added at index:', rowIndex);
                                }}
                                onRowRemove={(rowIndex) => {
                                    console.log('Row removed at index:', rowIndex);
                                }}
                                showAddRemoveButtons={true}
                                showSubmitButton={true}
                                submitButtonText="Submit Data"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BulkUserCreation;



// import React, { useRef, useState, useEffect } from "react";
// import { TiArrowUpThick, TiArrowDownOutline } from "react-icons/ti";
// import UrlPath from "../../../../components/shared/UrlPath";
// import PageHeading from "../../../../components/shared/PageHeading";
// import ReusableInputForm from "../../../../components/shared/ReusableInputForm";
// import { useSelector } from "react-redux";
// import UserHandler from "../../../../handlers/UserHandler";
// import DefineUnitHandler from "../../../../handlers/DefineUnitHandler";

// const BulkUserCreation = () => {
//   const paths = ["User Management", "Create Bulk User"];
//   const Heading = ["Bulk Users Creation"];
//   const format = `${process.env.REACT_APP_ADMIN_URL}/Bulk_user_format.xlsx`;
//   const fileInputRef = useRef(null);

//   const societyId =
//     useSelector((state) => state.auth.user?.Customer?.customerId) || "";
//   const { createBulkSocietyUserHandler, createMultipleSocietyUserHandler } =
//     UserHandler();
//   const { getUnitsHandler } = DefineUnitHandler();

//   // State
//   const [pageIndex, setPageIndex] = useState(1);
//   const [pageSize] = useState(10);
//   const [units, setUnits] = useState([]);

//   const downloadFormatFile = (url) => {
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", "Bulk_user_format.xlsx");
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       alert("Please select a file first");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     await createBulkSocietyUserHandler(societyId, formData);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await getUnitsHandler({ page: pageIndex, pageSize });
//       if (res) {
//         setUnits(
//           res.data?.map((u) => ({
//             value: u.unitId,
//             label: `${u.buildingName || "Building"}-${u.unitNumber || ""}`,
//           })) || []
//         );
//       }
//     };
//     fetchData();
//   }, [pageIndex, pageSize]);

//   const handleManualSubmit = async (rows) => {
//     const selectedRows = rows.filter((r) => r.select);
//     if (!selectedRows.length) {
//       alert("Please select at least one row.");
//       return;
//     }
//     const users = selectedRows.map((r) => ({
//       salutation: r.salut,
//       firstName: r.fname,
//       lastName: r.lname,
//       email: r.email,
//       mobileNumber: r.mnumber,
//       roleId: r.roleId,
//       unitId: r.unitId,
//       "address.street": r.street,
//       "address.city": r.city,
//       "address.state": r.state,
//       "address.zipCode": r.zipCode,
//       "address.address1": r.address1,
//       "address.address2": r.address2,
//     }));
//     await createMultipleSocietyUserHandler(societyId, users);
//   };

//   const formColumns = [
//     { Header: "Select", accessor: "select", inputType: "checkbox" },
//     { Header: "Salutation", accessor: "salut", inputType: "select", required: true,
//       options: [
//         { value: "mr", label: "Mr." },
//         { value: "mss", label: "Miss" },
//         { value: "mrs", label: "Mrs" },
//         { value: "dr", label: "Dr" },
//       ] },
//     { Header: "First Name", accessor: "fname", inputType: "text", required: true },
//     { Header: "Last Name", accessor: "lname", inputType: "text", required: true },
//     { Header: "Email", accessor: "email", inputType: "email", required: true },
//     { Header: "Mobile No.", accessor: "mnumber", inputType: "text", required: true },
//     { Header: "Role", accessor: "roleId", inputType: "select", required: true,
//       options: [
//         { value: 5, label: "Owner" },
//         { value: 6, label: "Owner Family" },
//         { value: 7, label: "Tenant" },
//         { value: 8, label: "Tenant Family" },
//       ] },
//     { Header: "Unit", accessor: "unitId", inputType: "select", required: true, options: units },
//     { Header: "Street", accessor: "street", inputType: "text" },
//     { Header: "City", accessor: "city", inputType: "text" },
//     { Header: "State", accessor: "state", inputType: "text" },
//     { Header: "Zip Code", accessor: "zipCode", inputType: "text" },
//     { Header: "Address Line 1", accessor: "address1", inputType: "text" },
//     { Header: "Address Line 2", accessor: "address2", inputType: "text" },
//   ];

//   return (
//     <>
//       <UrlPath paths={paths} />
//       <div className="flex">
//         <div className="w-full">
//           <PageHeading heading={Heading} />
//           <div className="flex flex-col mt-[35px] space-y-3">
//             <div className="flex justify-end gap-8 mr-12">
//               <label className="flex gap-2 p-2 text-white bg-green-600 rounded-md cursor-pointer">
//                 Upload File <TiArrowUpThick className="mt-1" />
//                 <input type="file" className="hidden" onChange={handleUpload} ref={fileInputRef} />
//               </label>
//               <button
//                 onClick={() => downloadFormatFile(format)}
//                 className="flex gap-2 p-2 text-white bg-green-600 rounded-md"
//               >
//                 Download Format <TiArrowDownOutline className="mt-1" />
//               </button>
//             </div>
//             <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
//               <ReusableInputForm
//                 columns={formColumns}
//                 numberOfRows={2}
//                 onSubmit={handleManualSubmit}
//                 showAddRemoveButtons={true}
//                 showSubmitButton={true}
//                 submitButtonText="Submit Data"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BulkUserCreation;
