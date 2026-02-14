"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const BackButton = ({ label = "Back", to }) => {
  const router = useRouter();

  const handleBack = () => {
    if (to) {
      router.push(to); // go to specific page
    } else {
      router.back(); // go to previous page
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 px-4 py-2 mb-4 bg-gray-200 rounded hover:bg-gray-300"
    >
      <IoArrowBack />
      {label}
    </button>
  );
};

export default BackButton;
