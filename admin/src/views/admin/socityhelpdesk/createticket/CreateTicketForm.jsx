import React, { useEffect, useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import SoftwareHelpDeskHandler from "../../../../handlers/SoftwareHelpDesk";
import TextArea from "../../../../components/ui/TextArea";

const CreateTicketForm = () => {
  const [fileError, setFileError] = useState(""); // State to track file size error

  const paths = ["Software Help Desk", "Create Ticket"];
  const Heading = ["Create Ticket"];
  const { ticketPurpousListView, createTicket, getTicketCatagorisation } =
    SoftwareHelpDeskHandler();
  const [ticketPurpousList, setTicketPurpousList] = useState([]);
  const [ticketCatagorisation, setTicketCatagorisation] = useState([]);
  const [formData, setFormData] = useState({
    ticket_catagorisation_Id: "",
    ticketPurpose: "",
    ticketTitle: "",
    ticket_details_description: "",
  });

  const DefinePurpousList = async () => {
    try {
      const result = await ticketPurpousListView();
      console.log("ticket purpose list view", result);
      setTicketPurpousList(result.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const DefineTypeOfRequest = async () => {
    try {
      const result = await getTicketCatagorisation();
      console.log("ticket catagorisation", result);
      setTicketCatagorisation(result.data.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    DefinePurpousList();
    DefineTypeOfRequest();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // If file is larger than 5MB, show error
        setFileError("File size exceeds 2MB. Please select a smaller file.");
      } else {
        setFileError(""); // Clear any previous error
        // setFormData({...formData,ticket_attachment_details:file})
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("new form data", formData);

    createTicket(formData);
    // setFormData({
    //   ticket_catagorisation_Id: "",
    //   ticketPurpose: "",
    //   ticketTitle: "",
    //   ticket_details_description: "",
    // });
  };

  return (
    <div className="px-5">
      <div className="text-sm font-semibold my-2 flex items-center gap-2 text-gray-200">
        <UrlPath paths={paths} />
      </div>
      {/* <div className="text-2xl font-semibold text-lime mt-4">Add Unit</div> */}
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div className="grid grid-cols-2 gap-5 items-center">
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Type Of Request
            </label>
            <select
              name="ticketCategorisationId"
              onChange={handleInputChange}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            >
              <option value="">Select Type Of Request</option>
              {ticketCatagorisation.length > 0 &&
                ticketCatagorisation.map((el) => (
                  <option value={el.ticket_catagorisation_Id}>
                    {el.ticket_catagorisation_type}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Ticket Purpous
            </label>
            <select
              name="ticketPurpose"
              onChange={handleInputChange}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            >
              <option value="">Select Ticket Purpous</option>
              {ticketPurpousList.length > 0 &&
                ticketPurpousList.map((el) => (
                  <option value={el.ticket_purpose_Id}>
                    {el.purpose_Details}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <Input
          label={<div>Ticket Title</div>}
          type="text"
          name="ticketTitle"
          // value={formData.ticketTitle}
          onChange={handleInputChange}
          placeholder={"Ticket Title"}
          size={"lg"}
        />
        <TextArea
          label="Description"
          placeholder="Enter a detailed description..."
          // value={formData.ticket_details_description} // Controlled by formData.ticket_details_description
          onChange={handleInputChange} // Updates the state on every change
          name="ticket_details_description" // Make sure 'name' matches state key
          size="lg"
          rows={5}
        />
        <div>
          <Input
            label={<div>Attachment (Max. Allowed 2MB)</div>}
            type="file"
            // value={relationship}
            // onChange={handleInput}
            onChange={handleFileChange}
            placeholder={"Attachment"}
            size={"lg"}
          />
          {/* Show error message if file is larger than 5MB */}
          {fileError && (
            <p className="text-red-600 text-sm mt-2">{fileError}</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-5 ">
          <div></div>
          <Button
            className="max-w-sm"
            onClick={handleSubmit}
            type="submit"
            size="lg"
          >
            Submit
          </Button>{" "}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketForm;
