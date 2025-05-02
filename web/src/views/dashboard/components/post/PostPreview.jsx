import SectionHeading from "@/components/shared/SectionHeading";
import ViewAllButton from "@/components/shared/ViewAllButton";
import React from "react";
import { MdOutlineAttachment, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Card = ({ data }) => {
  return (
    <div className="min-w-[280px] h-auto p-4 rounded-3xl bg-gradient-to-br from-[#d3ffa1] to-[#b9f673] cursor-pointer border-2 border-[#d3ffa1] hover:border-[#b9f673] transition-all duration-500">
      <div className="flex flex-col gap-1 overflow-hidden text-gray-900">
        <div className="w-full">
          <h5 className="text-md font-semibold line-clamp-2">{data.heading}</h5>
        </div>
        <div className="w-full">
          <p className="text-sm font-normal  max-w-full line-clamp-5 text-gray-600">
            {data.text}
          </p>
        </div>
        <div className="flex justify-end items-center gap-3 text-xs mt-1">
          <MdOutlineAttachment className="text-xl" title="post attachment" />
          <p className=" text-gray-600">{data.time}</p>
        </div>
      </div>
    </div>
  );
};
const PostPreview = () => {
  const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui eos
  cum corporis ipsum fugiat eaque temporibus repellat quae eum dolor
  pariatur natus ad a, quasi quis dicta corrupti possimus reiciendis?`;

  const data = [
    {
      heading: "First post heading, Lorem ipsum dolor sit amet, conse adipisicing",
      text: text,
      time: "2 hours ago",
    },
    {
      heading: "Second post heading, Lorem ipsum dolor sit amet, conse adipisicing",
      text: text,
      time: "2 hours ago",
    },
    {
      heading: "Third post heading, Lorem ipsum dolor sit amet, conse adipisicing",
      text: text,
      time: "2 hours ago",
    },
    {
      heading: "Third post heading, Lorem ipsum dolor sit amet, conse adipisicing",
      text: text,
      time: "2 hours ago",
    },
    {
      heading: "Third post heading, Lorem ipsum dolor sit amet, conse adipisicing",
      text: text,
      time: "2 hours ago",
    },
  ];

  return (
    <div className="w-full space-y-5">
      <SectionHeading size="md" className={"flex gap-3 items-center"}>
        Posts
      </SectionHeading>
      <div className="">
        <div className="flex gap-5 items-center max-w-full overflow-auto no-scrollbar">
          {data.map((el, index) => (
            <Card key={index} data={el} />
          ))}
        </div>
      </div>
      <ViewAllButton/>
    </div>
  );
};

export default PostPreview;
