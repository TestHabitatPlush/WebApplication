import React, { useEffect, useState } from "react";
import Dialog from "../../../../components/ui/Dialog";
import { Paperclip } from "lucide-react";

const ChatProcessDiscussionForum = ({ isOpen, onClose, formData, onChatHandler }) => {
  const [discussionViewForm, setDiscussionViewForm] = useState(formData);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setDiscussionViewForm(formData);
  }, [formData]);

  const getGroupName = (id) => {
    switch (id) {
      case 1: return "Only for Owners";
      case 2: return "Only for Tenants";
      case 3: return "All Members";
      case 4: return "All Primary Contacts";
      default: return "N/A";
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return;

    const existingReplies = discussionViewForm.discussionDescription
      ? discussionViewForm.discussionDescription.split("\n\n")
      : [];

    const updatedDescription = [...existingReplies, `You: ${replyText}`].join("\n\n");

    const updatedFormData = {
      ...discussionViewForm,
      discussionDescription: updatedDescription,
    };

    onChatHandler(updatedFormData);
    setReplyText("");
    setDiscussionViewForm({ ...discussionViewForm, discussionDescription: updatedDescription });
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-gray-100 lg:max-w-4xl rounded-lg"
      overlayClassName="backdrop-blur"
    >
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 bg-white border-b">
          <h2 className="text-xl font-semibold text-gray-800">Discussion Details</h2>
        </div>

        <div className="flex-1 px-4 py-5 space-y-4 overflow-auto">
          <div className="mb-2 text-sm text-center text-gray-500">
            {discussionViewForm?.discussionTitle} ({getGroupName(discussionViewForm?.userGroupId)})
          </div>

          {discussionViewForm?.discussionDescription
            ?.split("\n\n")
            .map((line, idx) => (
              <div
                key={idx}
                className={`max-w-xl p-3 rounded-xl shadow ${
                  line.startsWith("You:")
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-white text-left"
                }`}
              >
                {line}
              </div>
            ))}

          {discussionViewForm?.documentUrl && (
            <a
              href={discussionViewForm.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-3 text-sm text-blue-600 hover:underline"
            >
              <Paperclip className="w-4 h-4" />
              View Uploaded File
            </a>
          )}
        </div>

        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 px-4 py-2 text-sm bg-gray-100 border rounded-full"
            />
            <button
              onClick={handleReply}
              className="px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ChatProcessDiscussionForum;
