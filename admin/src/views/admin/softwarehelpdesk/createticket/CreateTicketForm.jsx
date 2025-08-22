// // import React, { useEffect, useState } from "react";
// // import UrlPath from "../../../../components/shared/UrlPath";
// // import PageHeading from "../../../../components/shared/PageHeading";
// // import Input from "../../../../components/shared/Input";
// // import Button from "../../../../components/ui/Button";
// // import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
// // import TextArea from "../../../../components/ui/TextArea";

// // const CreateTicketForm = () => {
// //   const [fileError, setFileError] = useState(""); // State to track file size error

// //   const paths = ["Software Help Desk", "Create Ticket"];
// //   const Heading = ["Create Ticket"];
// //   const { ticketPurpousListView, createTicket, getTicketCatagorisation } =
// //     SoftwareHelpDeskHandler();
// //   const [ticketPurpousList, setTicketPurpousList] = useState([]);
// //   const [ticketCatagorisation, setTicketCatagorisation] = useState([]);
// //   const [formData, setFormData] = useState({
// //     ticket_catagorisation_Id: "",
// //     ticketPurpose: "",
// //     ticketTitle: "",
// //     ticket_details_description: "",
// //   });

// //   const DefinePurpousList = async () => {
// //     try {
// //       const result = await ticketPurpousListView();
// //       console.log("ticket purpose list view", result);
// //       setTicketPurpousList(result.data.data);
// //     } catch (err) {
// //       console.error(err.message);
// //     }
// //   };

// //   const DefineTypeOfRequest = async () => {
// //     try {
// //       const result = await getTicketCatagorisation();
// //       console.log("ticket catagorisation", result);
// //       setTicketCatagorisation(result.data.data);
// //     } catch (err) {
// //       console.error(err.message);
// //     }
// //   };
// //   useEffect(() => {
// //     DefinePurpousList();
// //     DefineTypeOfRequest();
// //   }, []);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.size > 2 * 1024 * 1024) {
// //         // If file is larger than 5MB, show error
// //         setFileError("File size exceeds 2MB. Please select a smaller file.");
// //       } else {
// //         setFileError(""); // Clear any previous error
// //         // setFormData({...formData,ticket_attachment_details:file})
// //       }
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     console.log(name, value);
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = () => {
// //     console.log("new form data", formData);

// //     createTicket(formData);
// //     // setFormData({
// //     //   ticket_catagorisation_Id: "",
// //     //   ticketPurpose: "",
// //     //   ticketTitle: "",
// //     //   ticket_details_description: "",
// //     // });
// //   };

// //   return (
// //     <div className="px-5">
// //       <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
// //         <UrlPath paths={paths} />
// //       </div>
// //       {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
// //       <PageHeading heading={Heading} />
// //       <div className="p-10 my-5 border rounded-lg bg-gray-100">
// //         <div className="grid grid-cols-2 gap-5 items-center">
// //           <div>
// //             <label
// //               for="countries"
// //               class="block mb-2 text-sm font-medium text-gray-900"
// //             >
// //               Ticket Number
// //             </label>
// //             <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5" />

// //           </div>

// //           <div>
// //                       <div>
// //             <label
// //               for="countries"
// //               class="block mb-2 text-sm font-medium text-gray-900"
// //             >
// //               Type Of Request
// //             </label>
// //             <select
// //               name="ticketCategorisationId"
// //               onChange={handleInputChange}
// //               id="countries"
// //               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
// //             >
// //               <option value="">Select Type Of Request</option>
// //               {ticketCatagorisation.length > 0 &&
// //                 ticketCatagorisation.map((el) => (
// //                   <option value={el.ticket_catagorisation_Id}>
// //                     {el.ticket_catagorisation_type}
// //                   </option>
// //                 ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label
// //               for="countries"
// //               class="block mb-2 text-sm font-medium text-gray-900"
// //             >
// //               Ticket Purpous
// //             </label>
// //             <select
// //               name="ticketPurpose"
// //               onChange={handleInputChange}
// //               id="countries"
// //               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
// //             >
// //               <option value="">Select Ticket Purpous</option>
// //               {ticketPurpousList.length > 0 &&
// //                 ticketPurpousList.map((el) => (
// //                   <option value={el.ticket_purpose_Id}>
// //                     {el.purpose_Details}
// //                   </option>
// //                 ))}
// //             </select>
// //           </div>
// //           </div>

// //         </div>
// //         <Input
// //           label={<div>Ticket Title</div>}
// //           type="text"
// //           name="ticketTitle"
// //           // value={formData.ticketTitle}
// //           onChange={handleInputChange}
// //           placeholder={"Ticket Title"}
// //           size={"lg"}
// //         />
// //         <TextArea
// //           label="Description"
// //           placeholder="Enter a detailed description..."
// //           // value={formData.ticket_details_description} // Controlled by formData.ticket_details_description
// //           onChange={handleInputChange} // Updates the state on every change
// //           name="ticket_details_description" // Make sure 'name' matches state key
// //           size="lg"
// //           rows={5}
// //         />
// //         <div>
// //           <Input
// //             label={<div>Attachment (Max. Allowed 2MB)</div>}
// //             type="file"
// //             // value={relationship}
// //             // onChange={handleInput}
// //             onChange={handleFileChange}
// //             placeholder={"Attachment"}
// //             size={"lg"}
// //           />
// //           {/* Show error message if file is larger than 5MB */}
// //           {fileError && (
// //             <p className="text-red-600 text-sm mt-2">{fileError}</p>
// //           )}
// //         </div>
// //         <div className="grid grid-cols-3 gap-5 ">
// //           <div></div>
// //           <Button
// //             className="max-w-sm"
// //             onClick={handleSubmit}
// //             type="submit"
// //             size="lg"
// //           >
// //             Submit
// //           </Button>{" "}
// //           <div></div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateTicketForm;

// import React, { useEffect, useState } from "react";
// import UrlPath from "../../../../components/shared/UrlPath";
// import PageHeading from "../../../../components/shared/PageHeading";
// import Input from "../../../../components/shared/Input";
// import Button from "../../../../components/ui/Button";
// import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
// import TextArea from "../../../../components/ui/TextArea";

// const CreateTicketForm = () => {
//   const [fileError, setFileError] = useState("");
//   const { getTicketDropdown, createTicket } = SoftwareHelpDeskHandler();

//   const [ticketPurpousList, setTicketPurpousList] = useState([]);
//   const [ticketCatagorisation, setTicketCatagorisation] = useState([]);
//   const [formData, setFormData] = useState({
//     ticket_catagorisation_Id: "",
//     ticketPurpose: "",
//     ticketTitle: "",
//     ticket_details_description: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const purposeRes = await getTicketDropdown();
//         setTicketPurpousList(purposeRes.data.data);
//       } catch (err) {
//         console.error("Error fetching ticket data", err.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 2 * 1024 * 1024) {
//       setFileError("File size exceeds 2MB. Please select a smaller file.");
//     } else {
//       setFileError("");
//       // setFormData({ ...formData, ticket_attachment_details: file });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     console.log("Submitting Form Data:", formData);
//     createTicket(formData);
//   };

//   const paths = ["Software Help Desk", "Create Ticket"];
//   const Heading = ["Create Ticket"];

//   return (
//     <div className="px-5">
//       <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-500">
//         <UrlPath paths={paths} />
//       </div>
//       <PageHeading heading={Heading} />

//       <div className="p-10 my-5 border rounded-lg bg-white shadow-sm space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Ticket Number
//             </label>
//             <input
//               type="text"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-3.5"
//               placeholder="Auto-generated or Manual"
//             />
//           </div>

//           <div>
//             <label htmlFor="ticket_catagorisation_Id" className="block text-sm font-medium text-gray-700 mb-2">
//               Type of Request
//             </label>
//             <select
//               name="ticket_catagorisation_Id"
//               onChange={handleInputChange}
//               value={formData.ticket_catagorisation_Id}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-3.5"
//             >
//               <option value="">Select Type Of Request</option>
//               {ticketCatagorisation.map((el) => (
//                 <option key={el.ticket_catagorisation_Id} value={el.ticket_catagorisation_Id}>
//                   {el.ticket_catagorisation_type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label htmlFor="ticketPurpose" className="block text-sm font-medium text-gray-700 mb-2">
//               Ticket Purpose
//             </label>
//             <select
//               name="ticketPurpose"
//               onChange={handleInputChange}
//               value={formData.ticketPurpose}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-3.5"
//             >
//               <option value="">Select Ticket Purpose</option>
//               {ticketPurpousList.map((el) => (
//                 <option key={el.ticket_purpose_Id} value={el.ticket_purpose_Id}>
//                   {el.purpose_Details}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <Input
//               label="Ticket Title"
//               type="text"
//               name="ticketTitle"
//               value={formData.ticketTitle}
//               onChange={handleInputChange}
//               placeholder="Enter Title"
//               size="lg"
//             />
//           </div>
//         </div>

//         <TextArea
//           label="Description"
//           placeholder="Enter a detailed description..."
//           value={formData.ticket_details_description}
//           onChange={handleInputChange}
//           name="ticket_details_description"
//           size="lg"
//           rows={5}
//         />

//         <div>
//           <Input
//             label="Attachment (Max. Allowed 2MB)"
//             type="file"
//             onChange={handleFileChange}
//             size="lg"
//           />
//           {fileError && <p className="text-red-600 text-sm mt-2">{fileError}</p>}
//         </div>

//         <div className="flex justify-center mt-6">
//           <Button onClick={handleSubmit} type="submit" size="lg">
//             Submit
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateTicketForm;

import React, { useEffect, useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
import TextArea from "../../../../components/ui/TextArea";

const CreateTicketForm = () => {
  const [fileError, setFileError] = useState("");
  const [ticketPurpousList, setTicketPurpousList] = useState([]);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [formData, setFormData] = useState({
    request_type: "",
    ticket_purpose_Id: "",
    ticket_title: "",
    ticket_description: "",
    ticket_attachment_details: null,
  });

  const { getTicketDropdown, createTicket } = SoftwareHelpDeskHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const purposeRes = await getTicketDropdown();
        setTicketPurpousList(purposeRes);
      } catch (err) {
        console.error("Error fetching ticket purpose", err.message);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setFileError("File size exceeds 2MB. Please select a smaller file.");
      setAttachmentFile(null);
    } else {
      setFileError("");
      setAttachmentFile(file);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.ticket_title ||
      !formData.ticket_description ||
      !formData.ticket_purpose_Id ||
      !formData.request_type
    ) {
      return setFileError("All fields are required.");
    }

    const submissionFormData = new FormData();
    submissionFormData.append("request_type", formData.request_type);
    submissionFormData.append("ticket_purpose_Id", formData.ticket_purpose_Id);
    submissionFormData.append("ticket_title", formData.ticket_title);
    submissionFormData.append(
      "ticket_description",
      formData.ticket_description
    );

    if (attachmentFile) {
      submissionFormData.append("ticket_attachment_details", attachmentFile);
    }

    await createTicket(submissionFormData);
  };

  const paths = ["Software Help Desk", "Create Ticket"];
  const Heading = ["Create Ticket"];

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-500">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <div className="p-10 my-5 border rounded-lg bg-white shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ticket Number
            </label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-black-400 text-sm rounded-lg w-full p-3.5"
              value="Auto-generated"
              // placeholder="Ticket Number"
            />
          </div>

          <div>
            <label
              htmlFor="request_type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Type of Request
            </label>
            <select
              name="request_type"
              onChange={handleInputChange}
              value={formData.request_type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3.5"
            >
              <option value="">Select Type Of Request</option>
              <option value="suggestion">Suggestion</option>
              <option value="complaint">Complaint</option>
              <option value="clarification">Clarification</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ticket_purpose_Id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ticket Purpose
            </label>
            <select
              name="ticket_purpose_Id"
              onChange={handleInputChange}
              value={formData.ticket_purpose_Id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3.5"
            >
              <option value="">Select Ticket Purpose</option>
              {ticketPurpousList.map((el) => (
                <option key={el.ticket_purpose_Id} value={el.ticket_purpose_Id}>
                  {el.purpose_Details}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Input
              label="Ticket Title"
              type="text"
              name="ticket_title"
              value={formData.ticket_title}
              onChange={handleInputChange}
              placeholder="Enter Title"
              size="lg"
            />
          </div>
        </div>

        <TextArea
          label="Description"
          placeholder="Enter a detailed description..."
          value={formData.ticket_description}
          onChange={handleInputChange}
          name="ticket_description"
          size="lg"
          rows={5}
        />

        <div>
          <Input
            label="Attachment (Max. Allowed 2MB)"
            type="file"
            onChange={handleFileChange}
            size="lg"
          />
          {fileError && (
            <p className="text-red-600 text-sm mt-2">{fileError}</p>
          )}
        </div>

        {/* <div className="flex justify-center mt-6">
          <Button onClick={handleSubmit} type="submit" size="lg">
            Submit
          </Button>
        </div> */}

        <div className="flex justify-center mt-5">
          <Button
            className="max-w-sm"
            onClick={handleSubmit}
            type="submit"
            size="xl"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketForm;
