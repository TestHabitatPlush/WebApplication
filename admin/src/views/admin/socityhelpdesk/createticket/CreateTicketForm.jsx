import React, { useEffect, useState } from "react";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import SocietyHelpDeskHandler from "../../../../handlers/SocietyHelpDesk";
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

  const { getTicketDropdown, createTicket } = SocietyHelpDeskHandler();

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
    submissionFormData.append("ticket_description", formData.ticket_description);

    if (attachmentFile) {
      submissionFormData.append("ticket_attachment_details", attachmentFile);
    }

    await createTicket(submissionFormData);
  };

  const paths = ["Society Help Desk", "Create Ticket"];
  const Heading = ["Create Ticket"];

  return (
    <div className="px-5">
      <div className="flex items-center gap-2 my-2 text-sm font-semibold text-gray-500">
        <UrlPath paths={paths} />
      </div>
      <PageHeading heading={Heading} />

      <div className="p-10 my-5 space-y-6 bg-white border rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ticket Number
            </label>
            <input
              type="text"
              className="bg-gray-100 border border-gray-300 text-black-400 text-sm rounded-lg w-full p-3.5"
              placeholder="Ticket Number"
              disabled
            />
          </div>

          {/* REQUEST TYPE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Type of Request
            </label>
            <select
              name="request_type"
              onChange={handleInputChange}
              value={formData.request_type}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3.5"
            >
              <option value="">Select Type Of Request</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Complain">Complaint</option>
              <option value="Clarification">Clarification</option>
            </select>
          </div>

          {/* PURPOSE */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
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

          {/* TITLE */}
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

        {/* DESCRIPTION */}
        <TextArea
          label="Description"
          placeholder="Enter a detailed description..."
          value={formData.ticket_description}
          onChange={handleInputChange}
          name="ticket_description"
          rows={5}
        />

        {/* FILE UPLOAD */}
        <div>
          <Input
            label="Attachment (Max. Allowed 2MB)"
            type="file"
            onChange={handleFileChange}
            size="lg"
          />
          {fileError && (
            <p className="mt-2 text-sm text-red-600">{fileError}</p>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-center mt-5">
          <Button className="max-w-sm" onClick={handleSubmit} size="xl">
            Submit
          </Button>
        </div> 

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

