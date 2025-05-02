import React from "react";

const AnnouncementCard = () => {
  return (
    <div className="w-[280px] h-[170px] p-4 rounded-3xl bg-gradient-to-r from-indigo-400 to-blue-300">
      <div className="flex flex-col gap-1 overflow-hidden text-gray-100">
        <div className="w-full">
          <h5 className="text-md font-semibold ">Topic Heading</h5>
        </div>
        <div className="w-full">
          <p className="text-sm font-normal  max-w-full line-clamp-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque explicabo natus sequi iusto doloribus. Totam maiores molestiae dolorum eligendi aspernatur nulla quas unde, dolores, laborum cupiditate nostrum ipsa odit accusamus!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
