import React from "react";
import TopicofDiscussion from "./components/topicofdiscussion/TopicofDiscussion";
import CommunityDirectories from "./components/directories/CommunityDirectories";
import PostPreview from "./components/post/PostPreview";

const Buttons = () => {
  const data = [
    {
      name: "Neighbours",
    },
    {
      name: "Management Committee",
    },
    {
      name: "Emergency Contact",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4  mt-[62px]">
        {data.map((item, index) => {
          return (
            <div key={index}>
              <button
                type="button"
                key={index}
                className="h-[30px] w-full p-[23px] text-darkTeal text-sm lg:text-xl font-sans font-medium border-2 border-turquoise flex justify-center items-center rounded-t-lg bg-blue-100  hover:bg-turquoise_lite transition duration-700 ease-in-out hover:-translate-y-1 hover:scale-100"
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Tablecontent = () => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  mt-[5px]">
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-white uppercase bg-turquoise">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0"
              >
                Unit No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-white even:bg-blue-100">
              <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
                001
              </td>
              <td class="px-6 py-4">Andrew</td>
            </tr>
            <tr class="odd:bg-white even:bg-blue-100">
              <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
                002
              </td>
              <td class="px-6 py-4 ">Alfred</td>
            </tr>
            <tr class="odd:bg-white even:bg-blue-100">
              <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
                003
              </td>
              <td class="px-6 py-4 ">Robert </td>
            </tr>
            <tr class="odd:bg-white even:bg-blue-100">
              <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
                004
              </td>
              <td class="px-6 py-4 ">Houston</td>
            </tr>
            <tr class="odd:bg-white even:bg-blue-100">
              <td class="px-6 py-4 w-[180px] border-r border-r-white border-l-0 border-t-0 border-b-0">
                005
              </td>
              <td class="px-6 py-4 ">Tom </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Post = () => {
  return (
    <div>
      <div className="text-darkTeal text-lg font-medium font-sans mt-[30px]">
        Post
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4  gap-4 my-[15px]">
        <div className=" w-full p-[20px] border-2  rounded-md transition ease-in-out delay-150 bg-blue-200 hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 drop-shadow-xl duration-300">
          sdjn dkfkd k dfk kd k fkdsk fnsf kfknsjnfjnd fdnjfndff fdj nfjf
          dfjgdjgngjfdn g j nfd g
        </div>
        <div className=" w-full p-[20px] border-2  rounded-md transition ease-in-out delay-150 bg-blue-200 hover:-translate-y-1 hover:scale-110 hover:bg-blue-300indigo-500 drop-shadow-xl duration-300">
          sdjn dkfkd k dfk kd k fkdsk fnsf kfknsjnfjnd fdnjfndff fdj nfjf
          dfjgdjgngjfdn g j nfd g
        </div>
        <div className=" w-full p-[20px] border-2  rounded-md transition ease-in-out delay-150 bg-blue-200 hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 drop-shadow-xl duration-300">
          sdjn dkfkd k dfk kd k fkdsk fnsf kfknsjnfjnd fdnjfndff fdj nfjf
          dfjgdjgngjfdn g j nfd g
        </div>
        <div className="w-full p-[20px] border-2  rounded-md transition ease-in-out delay-150 bg-blue-200 hover:-translate-y-1 hover:scale-110 hover:bg-blue-300 drop-shadow-xl duration-300">
          sdjn dkfkd k dfk kd k fkdsk fnsf kfknsjnfjnd fdnjfndff fdj nfjf
          dfjgdjgngjfdn g j nfd g
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  return (
    <section>
      <PostPreview/>
      <CommunityDirectories />
    </section>
  );
};

export default Community;
