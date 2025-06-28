import React, { useEffect, useState } from "react";
import Input from "../../../../components/shared/Input";
import Button from "../../../../components/ui/Button";
import TextArea from "../../../../components/ui/TextArea";
import Dialog from "../../../../components/ui/Dialog";

const TicketListEdit = ({ isOpen, onClose, formData, onEditHandler }) => {
  const [editTicketList, setEditTicketList] = useState(formData);
  console.log("editTicketList", editTicketList);

  useEffect(() => {
    setEditTicketList(formData); // Set the form data when component mounts or formData changes
  }, [formData]);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="h-full w-full overflow-auto p-10"
      contentClassName={`w-full h-full bg-white lg:max-w-6xl rounded-lg overflow-auto scrollbar p-5`}
      overlayClassName="backdrop-blur"
    >
      <div className="p-10 my-5 border rounded-lg bg-gray-100">
        <div>Ticket Number is - {editTicketList.ticket_Id}</div>
        {/* <TextArea
          label="Description"
          placeholder="Enter a detailed description..."
          value={editTicketList?.ticketDetails.ticket_details_description || ""} //   onChange={handleInputChange} // Updates the state on every change
          name="ticket_details_description" // Make sure 'name' matches state key
          size="lg"
          rows={5}
        /> */}
        <TextArea
          label="Description"
          placeholder="Enter a detailed description..."
          // value={editTicketList?.ticketDetails.ticket_details_description || ""} //   onChange={handleInputChange} // Updates the state on every change
          name="ticket_details_description" // Make sure 'name' matches state key
          size="lg"
          rows={5}
        />
        <div className="grid grid-cols-2  gap-5 items-center">
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Asign To
            </label>
            <select
              name="ticketPurpose"
              //   onChange={handleInputChange}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            >
              <option value="">Select Management Committee</option>
              {/* {ticketPurpousList.length > 0 &&
                ticketPurpousList.map((el) => (
                  <option value={el.ticket_purpose_Id}>
                    {el.purpose_Details}
                  </option>
                ))} */}
            </select>
          </div>
          <div>
            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <select
              name="ticketPurpose"
              //   onChange={handleInputChange}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
            >
              <option value="">Select Ticket Status</option>
              {/* {ticketPurpousList.length > 0 &&
                ticketPurpousList.map((el) => (
                  <option value={el.ticket_purpose_Id}>
                    {el.purpose_Details}
                  </option>
                ))} */}
            </select>
          </div>
        </div>

        {/* <div> */}
        {/* <Input
            label={<div>Attachment (Max. Allowed 2MB)</div>}
            type="file"
            // value={relationship}
            // onChange={handleInput}
            onChange={handleFileChange}
            placeholder={"Attachment"}
            size={"lg"}
          /> */}
        {/* Show error message if file is larger than 5MB */}
        {/* {fileError && (
            <p className="text-red-600 text-sm mt-2">{fileError}</p>
          )}
        </div> */}
        <div className="grid grid-cols-3 mt-[15px] gap-5 ">
          <div></div>
          <Button
            className="max-w-sm"
            // onClick={handleSubmit}
            type="submit"
            size="lg"
          >
            Submit
          </Button>{" "}
          <div></div>
        </div>
      </div>
    </Dialog>
  );
};

export default TicketListEdit;
