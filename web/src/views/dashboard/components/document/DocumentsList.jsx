import React from 'react'
import { FaFilePdf, FaPlus } from 'react-icons/fa6';
import SectionContainer from '@/components/shared/SectionContainer';
import SectionHeading from '@/components/shared/SectionHeading';


const DocumentsList = () => {
  const arr = [1,2,3,4]
  return (
    <SectionContainer className={"space-y-5"}>
      <SectionHeading
        className={"text-gray-600 lg:my-0 flex justify-between items-center"}
      >
        <span className="text-md lg:text-lg">Uploaded Documents</span>
        <span>
          <button className="flex gap-1 items-center bg-turquoise px-5 py-2 rounded-md text-sm text-white">
            <FaPlus className="text-sm" />
            Upload
          </button>
        </span>
      </SectionHeading>
      <div className="space-y-5">
        <div className="space-y-1">
          {arr.map((el, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 p-3 hover:bg-gray-100 transition-all rounded-lg cursor-pointer border"
            >
              <div className="flex  gap-5">
                <div className="hidden lg:block">
                  <FaFilePdf className="text-2xl text-orange-500" />
                </div>
                <div className="">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Libero id eveniet numquam?
                </div>
              </div>

              <div className="flex items-center justify-between  gap-5">
                <span className="text-xs font-semibold">9 hours ago</span>
                <button className="bg-lime bg-opacity-90 hover:bg-opacity-100 text-white text-sm px-2 py-1 rounded-lg">
                  view
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* pagination */}
        <div className="flex justify-center">
          <div aria-label="Page navigation example">
            <ul class="flex items-center -space-x-px h-8 text-sm">
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-turquiose border border-white border-turquoise rounded-md"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-turquoise border rounded-md"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-white bg-turquoise border rounded-md"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bgwhite border-turquoise rounded-md"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-2.5 h-2.5 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

export default DocumentsList