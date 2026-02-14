import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import ViewAllButton from "@/components/shared/ViewAllButton";
import { MdOutlineAttachment } from "react-icons/md";

/* Card Component */
const Card = ({ data }) => {
  return (
    <div className="w-11/12 mx-auto p-4 rounded-3xl bg-gradient-to-br from-[#d3ffa1] to-[#b9f673] border-2 border-[#d3ffa1] hover:border-[#b9f673] transition-all duration-500">
      <h5 className="font-semibold text-md line-clamp-2">
        {data.heading}
      </h5>

      <p className="mt-2 text-sm text-gray-600 line-clamp-5">
        {data.text}
      </p>

      <div className="flex items-center justify-end gap-3 mt-2 text-xs">
        <MdOutlineAttachment className="text-xl" />
        <span className="text-gray-600">{data.time}</span>
      </div>
    </div>
  );
};

/* Post Preview Component */
const PostPreview = () => {
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eos cum corporis ipsum fugiat eaque temporibus repellat quae eum dolor pariatur natus ad a.";

  const data = [
    { heading: "First post heading", text, time: "2 hours ago" },
    { heading: "Second post heading", text, time: "2 hours ago" },
    { heading: "Third post heading", text, time: "2 hours ago" },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Section Heading */}
      <SectionHeading size="md">Posts</SectionHeading>

      {/* Centered Posts */}
      <div className="flex flex-col gap-5">
        {data.map((item, index) => (
          <Card key={index} data={item} />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center">
        <ViewAllButton />
      </div>
    </div>
  );
};

export default PostPreview;
