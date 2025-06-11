import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../../components/shared/Input";
import UrlPath from "../../../../components/shared/UrlPath";
import PageHeading from "../../../../components/shared/PageHeading";
import Button from "../../../../components/ui/Button";
import DisucssionForumHandler from "../../../../handlers/DisucssionForumHandler";
import UserGroupHandler from "../../../../handlers/UseGroupHandler"; // Fixed spelling if needed

const AddnewDiscussion = () => {
  const paths = ["Discussion Forum", "Add New Discussion"];
  const Heading = ["Add New Discussion"];

  const { getUserGroupHandler } = UserGroupHandler();
  const { createDisucssionForumHandler } = DisucssionForumHandler();

  const [userGroup, setUserGroup] = useState([]);
  const [selectedUserGroupId, setSelectedUserGroupId] = useState(null);

  const [discussionForm, setDiscussionForm] = useState({
    discussionTitle: "",
    discussionDescription: "",
    document: null,
    userGroupId: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setDiscussionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value) => {
    setSelectedUserGroupId(value);
    setDiscussionForm((prev) => ({ ...prev, userGroupId: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDiscussionForm((prev) => ({ ...prev, document: file }));
  };

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const roleCategoryMapping = {
    resident: "Resident",
    tenant: "Tenant",
    primaryContact: "Primary Contact",
    all: "All",
  };

  const fetchUserGroup = async () => {
    try {
      const result = await getUserGroupHandler();
      console.log("Fetched user groups:", result?.data?.data);

      if (result?.data?.data && Array.isArray(result.data.data)) {
        const mappedGroups = result.data.data.map((el) => ({
          label: roleCategoryMapping[el.userGroupName],
          value: el.userGroupId,
        }));

        setUserGroup(mappedGroups);
      } else {
        toast.error("Invalid user group data.");
      }
    } catch (error) {
      console.error("Error loading user groups:", error);
      toast.error("Failed to load user groups.");
    }
  };

  useEffect(() => {
    fetchUserGroup();
  }, []);

  const submitHandler = () => {
    if (
      !discussionForm.discussionTitle ||
      !discussionForm.discussionDescription ||
      !discussionForm.userGroupId
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("discussionTitle", discussionForm.discussionTitle);
    formData.append("discussionDescription", discussionForm.discussionDescription);
    if (discussionForm.document) {
      formData.append("document", discussionForm.document);
    }
    formData.append("userGroupId", discussionForm.userGroupId);

    createDisucssionForumHandler(formData)
      .then(() => {
        toast.success("Discussion created successfully");
        setDiscussionForm({
          discussionTitle: "",
          discussionDescription: "",
          document: null,
          userGroupId: "",
        });
        setSelectedUserGroupId(null);
      })
      .catch((err) => {
        console.error("Form submission error:", err);
        toast.error("Failed to create discussion");
      });
  };

  return (
    <div className="px-5">
      <UrlPath paths={paths} />
      <PageHeading heading={Heading} />
      <div className="p-10 my-5 bg-gray-100 border rounded-lg">
        <div className="flex flex-col w-full gap-5 py-6">
          <Input
            label="Discussion Heading"
            type="text"
            placeholder="Enter Discussion Heading"
            name="discussionTitle"
            value={discussionForm.discussionTitle}
            onChange={handleInput}
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Discussion Description
            </label>
            <textarea
              name="discussionDescription"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
              placeholder="Write your thoughts here..."
              value={discussionForm.discussionDescription}
              onChange={handleInput}
            />
          </div>

          <div>
            <Input
              label={<div>Upload File</div>}
              type="file"
              name="document"
              placeholder="Upload File Here"
              size="lg"
              onChange={handleFileChange}
            />
          </div>

          <div className="grid grid-cols-4 gap-5 my-5">
            {userGroup.length > 0 ? (
              userGroup.map((group) => (
                <div key={group.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="userGroup"
                    value={group.value}
                    checked={selectedUserGroupId === group.value}
                    onChange={() => handleRadioChange(group.value)}
                  />
                  <label className="text-sm font-medium text-gray-800">{group.label}</label>
                </div>
              ))
            ) : (
              <div>No user groups available</div>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <Button type="button" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddnewDiscussion;
