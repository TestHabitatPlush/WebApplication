// import React from "react";
// import Image from "next/image";
// import bg from "../../../assets/images/login-background.jpg";
// import { FaRegCircleCheck } from "react-icons/fa6";

// const AuthPageContainer = ({ children }) => {
//   return (
//     <main className="h-screen bg-gradient-to-bl from-gray-300 via-white to-gray-200">
//       <div className="h-full flex justify-between">
//         <div className="w-1/2 h-full flex items-center">
//           <div className="w-full flex flex-col items-center justify-center">
//             <div className="w-full flex justify-center items-center gap-3">
//               <h3 className="text-2xl font-normal text-gray-700">
//                 Logo
//               </h3>
//               <h3 className="text-2xl font-normal text-gray-700">
//                 Habitatplus
//               </h3>
//             </div>
//             {children}
//           </div>
//         </div>
//         <div className="w-1/2 h-full py-5 px-10">
//           <div className="h-full w-full relative overflow-hidden rounded-[50px] rounded-tl-[100px] rounded-br-[100px]">
//             <Image
//               src={bg}
//               layout="fill"
//               objectFit="cover"
//               alt="Background Image"
//             />
//             <div className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-transparent via-transparent to-black bg-opacity-50">
//               <div className="w-full h-full flex flex-col justify-end px-10 p-10">
//                 <div className="text-center space-y-3">
//                   <h3 className="text-4xl px-5">
//                     Discovering the features of society management
//                   </h3>
//                   <p>
//                     the features of sociery management management management the
//                     features of sociery management management management
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-center gap-3 mt-5">
//                   <span className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white">
//                     <FaRegCircleCheck className="text-xl" />
//                     <span>secure</span>
//                   </span>
//                   <span className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white">
//                     <FaRegCircleCheck className="text-xl" />
//                     <span>reliable</span>
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* //mobile screen */}

//       <div className="lg:hidden w-full h-full z-20">
//         <section class="h-full flex justify-center text-gray-900 shadow-xl bg-[#ededf0]">
//           <div class="w-full flex flex-col items-center justify-center max-w-sm">
//             <a
//               href="#"
//               class="flex items-center text-2xl font-semibold text-gray-900"
//             >
//               Emenu
//             </a>
//             {children}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default AuthPageContainer;



import React from "react";
import Image from "next/image";
import bg from "../../../assets/images/login-background.jpg";
import { FaRegCircleCheck } from "react-icons/fa6";

const AuthPageContainer = ({ children }) => {
  return (
    <main className="h-screen bg-gradient-to-bl">
      <div className="hidden lg:flex h-full justify-between">
        <div className="w-1/2 h-full flex items-center">
          <div className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center gap-3">
              <h3 className="text-2xl font-normal text-gray-700">Logo</h3>
              <h3 className="text-2xl font-normal text-gray-700">
                Habitatplus
              </h3>
            </div>
            {children}
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center bg-gradient-to-b from bg-turquoise via-turquoise to-white">
          <div className="mx-auto h-full max-w-md w-full max-h-[40vh] relative overflow-hidden rounded-[50px] rounded-tl-[100px] rounded-br-[100px]">
            <Image
              src={bg}
              layout="fill"
              objectFit="cover"
              alt="Background Image"
            />
          </div>
          <div className="w-full flex flex-col justify-end px-10 p-10 text-white">
            <div className="text-center space-y-3">
              <h3 className="text-4xl px-5">
                Discovering the features of society management
              </h3>
              <p>
                the features of sociery management management management the
                features of sociery management management management
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-5">
              <span className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white">
                <FaRegCircleCheck className="text-xl" />
                <span>secure</span>
              </span>
              <span className="flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white">
                <FaRegCircleCheck className="text-xl" />
                <span>reliable</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* //mobile screen */}

      <div className="lg:hidden w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-lime-400 via-lime-200 to-white">
        <div className="w-full flex justify-center items-center gap-3 py-5">
          <h3 className="text-2xl font-normal text-gray-700">Logo</h3>
          <h3 className="text-2xl font-normal text-gray-700">Habitatplus</h3>
        </div>
        <div className="w-full flex flex-col items-center justify-center max-w-sm">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthPageContainer;
