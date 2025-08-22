// import React, { useRef, useState } from 'react'
// import { FaSearch, FaTrashAlt } from "react-icons/fa";
// import { TiArrowUpThick, TiArrowDownOutline  } from "react-icons/ti";
// import UrlPath from "../../../../components/shared/UrlPath";
// import Button from '../../../../components/ui/Button';
// import PageHeading from "../../../../components/shared/PageHeading";
// import ReusableInputForm from "../../../../components/shared/ReusableInputForm"
// import { useSelector } from "react-redux";
// import UserHandler from '../../../../handlers/UserHandler';

// const BulkUserCreation = () => {
//     const paths = ["User Management", "Create Bulk User"];
//     const Heading = ["Bulk Users Creation"];
//     const format = `${process.env.REACT_APP_ADMIN_URL}/Bulk_user_format.xlsx`;
//     const fileInputRef = useRef(null);
//     const societyId = useSelector((state) => state.auth.user?.Customer?.customerId) || "";
//     const { createBulkSocietyUserHandler } = UserHandler(); 
//     // const [file, setFile] = useState(null);

//     const downloadFormatFile=(url)=>{
//         const fileName = "Bulk_user_format.xlsx";
//         const aTag = document.createElement("a");
//         aTag.href = url;
//         aTag.setAttribute('download', fileName);
//         document.body.appendChild(aTag);
//         aTag.click();
//         aTag.remove();
//     }

//     const handleUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) {
//             alert("Please select a file first");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", file);
//         const myStatus = await createBulkSocietyUserHandler(societyId, formData);
//         console.log(myStatus);
        
//   };


//     const formColumns = [
//         {
//             Header: 'Select',
//             accessor: 'select',
//             inputType: 'checkbox'
//         },
//         {
//             Header: 'salutation',
//             accessor: 'salut',
//             inputType: 'select',
//             required: true,
//             options: [
//                 { value: 'mr', label: 'Mr.' },
//                 { value: 'mss', label: 'Miss' },
//                 { value: 'mrs', label: 'Mrs' },
//                 { value: 'dr', label: 'Dr' }
//             ]
//         },
//         {
//             Header: 'First Name',
//             accessor: 'fname',
//             inputType: 'text',
//             required: true,
//             placeholder: 'Enter First name'
//         },
//         {
//             Header: 'Last Name',
//             accessor: 'lname',
//             inputType: 'text',
//             required: true,
//             placeholder: 'Enter Last name'
//         },
//         {
//             Header: 'Email',
//             accessor: 'email',
//             inputType: 'email',
//             required: true,
//             placeholder: 'Enter email address'
//         },
//         {
//             Header: 'Mobile No.',
//             accessor: 'mnumber',
//             inputType: 'text',
//             required: true,
//             placeholder: 'Contact Nuumber'
//         },
//         {
//             Header: 'Role',
//             accessor: 'department',
//             inputType: 'select',
//             required: true,
//             options: [
//                 { value: 'society_owner', label: 'Owner' },
//                 { value: 'society_owner_family', label: 'Owner Family' },
//                 { value: 'society_tenant', label: 'Tenant' },
//                 { value: 'society_tenant_family', label: 'Tenant Family' }
//             ]
//         },
//         {
//             Header: 'Unit Name',
//             accessor: 'unitname',
//             inputType: 'text',
//             placeholder: ' ',
//             required: true,
//         }
//     ];

//     return (
//         <>
//             <UrlPath paths={paths} />
//             <div className='flex'>
//                 <div className='w-full'>
//                     <PageHeading heading={Heading} />
//                     <div className='flex flex-col mt-[35px] space-y-3'>
//                         <div className='flex justify-end gap-8 mr-12'>
//                             <button className='flex gap-2 p-2 text-white bg-green-600 rounded-md'>Upload File <TiArrowUpThick className='mt-1'/>
//                             <input type="file" onChange={handleUpload}/>
//                             </button>
//                             <button onClick={() => downloadFormatFile(format)} className='flex gap-2 p-2 text-white bg-green-600 rounded-md'>Download Format<TiArrowDownOutline className='mt-1' /></button>
//                         </div>
//                         <div className='relative w-full overflow-x-auto shadow-md sm:rounded-lg'>
//                             <ReusableInputForm
//                                 columns={formColumns}
//                                 numberOfRows={5}
//                                 formTitle=""
//                                 onSubmit={(data) => {
//                                     console.log('Form submitted:', data);
//                                     // Handle form submission
//                                 }}
//                                 onRowAdd={(rowIndex) => {
//                                     console.log('Row added at index:', rowIndex);
//                                 }}
//                                 onRowRemove={(rowIndex) => {
//                                     console.log('Row removed at index:', rowIndex);
//                                 }}
//                                 showAddRemoveButtons={true}
//                                 showSubmitButton={true}
//                                 submitButtonText="Submit Data"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default BulkUserCreation;



import React, { useRef } from 'react'
import { TiArrowUpThick, TiArrowDownOutline } from "react-icons/ti";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import ReusableInputForm from "../../../../components/shared/ReusableInputForm";
import { useSelector } from "react-redux";
import UserHandler from '../../../../handlers/UserHandler';

const BulkUserCreation = () => {
  const paths = ["User Management", "Create Bulk User"];
  const Heading = ["Bulk Users Creation"];
  const format = `${process.env.REACT_APP_ADMIN_URL}/Bulk_user_format.xlsx`;
  const fileInputRef = useRef(null);

  const societyId = useSelector(
    (state) => state.auth.user?.Customer?.customerId
  ) || "";

  // ✅ get handlers
  const { createBulkSocietyUserHandler, createMultipleSocietyUserHandler } = UserHandler();

  // 🔹 Download format file
  const downloadFormatFile = (url) => {
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute('download', "Bulk_user_format.xlsx");
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  // 🔹 File upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await createBulkSocietyUserHandler(societyId, formData);
      console.log("Bulk upload result:", res);
      alert(res?.message || "File processed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload users.");
    }
  };

  // 🔹 Manual multiple user creation
  const handleManualSubmit = async (rows) => {
    try {
      const payload = { users: rows };
      const res = await createMultipleSocietyUserHandler(societyId, payload);
      console.log("Manual users result:", res);
      alert(res?.message || "Users created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create users manually.");
    }
  };

  const formColumns = [
    { Header: 'Select', accessor: 'select', inputType: 'checkbox' },
    {
      Header: 'Salutation', accessor: 'salutation', inputType: 'select', required: true,
      options: [
        { value: 'mr', label: 'Mr.' },
        { value: 'mss', label: 'Miss' },
        { value: 'mrs', label: 'Mrs' },
        { value: 'dr', label: 'Dr' }
      ]
    },
    { Header: 'First Name', accessor: 'firstName', inputType: 'text', required: true },
    { Header: 'Last Name', accessor: 'lastName', inputType: 'text', required: true },
    { Header: 'Email', accessor: 'email', inputType: 'email', required: true },
    { Header: 'Mobile No.', accessor: 'mobileNumber', inputType: 'text', required: true },
    {
      Header: 'Role', accessor: 'roleId', inputType: 'select', required: true,
      options: [
        { value: 'society_owner', label: 'Owner' },
        { value: 'society_owner_family', label: 'Owner Family' },
        { value: 'society_tenant', label: 'Tenant' },
        { value: 'society_tenant_family', label: 'Tenant Family' }
      ]
    },
    { Header: 'Unit Name', accessor: 'unitId', inputType: 'text', required: true }
  ];

  return (
    <>
      <UrlPath paths={paths} />
      <div className='flex'>
        <div className='w-full'>
          <PageHeading heading={Heading} />
          <div className='flex flex-col mt-[35px] space-y-3'>

            {/* 🔹 Upload + Download buttons */}
            <div className='flex justify-end gap-8 mr-12'>
              <label className='flex gap-2 p-2 text-white bg-green-600 rounded-md cursor-pointer'>
                Upload File <TiArrowUpThick className='mt-1' />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => downloadFormatFile(format)}
                className='flex gap-2 p-2 text-white bg-green-600 rounded-md'
              >
                Download Format <TiArrowDownOutline className='mt-1' />
              </button>
            </div>

            {/* 🔹 Manual form */}
            <div className='relative w-full overflow-x-auto shadow-md sm:rounded-lg'>
              <ReusableInputForm
                columns={formColumns}
                numberOfRows={5}
                formTitle=""
                onSubmit={handleManualSubmit}
                showAddRemoveButtons
                showSubmitButton
                submitButtonText="Submit Data"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default BulkUserCreation;
