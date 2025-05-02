import { React, useState } from "react";
import Image from "next/image";
import Logo from "../../../assets/logo/cocacola2.jpg";
import { FaRegCommentDots } from "react-icons/fa";

const Posts = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const truncatedText = `There are many miracles (leelas) done by Lord Venkateshwara at Tirumala. In the year 1979, there was scarcity of water and no rain...`;

  const fullText = `There are many miracles (leelas) done by Lord Venkateshwara at Tirumala. In the year 1979, there was scarcity of water and no rain. The water in Gogarbham dam (dam at Tirumala) was almost empty. At that time, EO of TTD, PVRK Prasad talked with the engineers about the situation. They said that water in Gogarbham dam will be sufficient only for a week. Without water, the pilgrims at Tirumala will face many issues. PVRK Prasad then talked with Sri Uppuluri Ganapati Shastri. Sri Ganapathi Shastri smiled and said the golden words, "The problem comes because the solution is there!!". Shastri suggested to do Varuna Japam. But the challenge is to find people who are willing to do Varuna Japam in this age of Kali Yuga. There is a solution for every problem in our life in our scriptures. Prasad believed in it and searched for people who are willing to do Varuna Japam. Many people went back because of some reasons. Some people came forward to perform the Varuna Japam. After finalizing the auspicious days of doing Varuna Japam, some people are selected.`;

  return (
    <div>
      <div className="font-semibold font-sans text-lg mb-3">POST</div>
      <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
        <div className="w-full flex flex-col space-y-9 p-[19px] bg-white-900 shadow-sm shadow-gray-200 border border-gray-300 rounded-lg">
          <div className="flex flex-row space-x-4 ">
            <div className="relative w-[45px] h-[45px] bg-gray-100 rounded-full">
              <Image
                src={Logo}
                alt="Logo"
                layout="fill"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col ">
              <div className="font-sans text-base font-medium">Smith Paul</div>
              <div className="text-sm font-sans font-normal text-gray-700">
                5hr
              </div>
            </div>
          </div>
          <div>
            {expanded ? fullText : truncatedText}
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:underline ml-2"
            >
              {expanded ? "Show Less" : "More"}
            </button>
          </div>
          <div className="relative w-full h-[340px]">
            <Image
              src={Logo}
              alt="Logo"
              layout="fill"
              className="object-fill object-center"
            />
          </div>
          <div className="flex flex-row">
            <div className="flex items-center hover:bg-gray-200 p-3 rounded-lg">
              <FaRegCommentDots className="text-[20px] mr-[7px]" />
              <div>Comment</div>
            </div>
          </div>
        </div>

        <div>Adds dksa sdakm sdmkas</div>
      </div>
    </div>
  );
};

export default Posts;
