import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function HabitatPlushGateApp() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in");
    const slideElements = document.querySelectorAll(".slide-in");

    const handleScroll = () => {
      fadeElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("opacity-100");
        } else {
          el.classList.remove("opacity-100");
        }
      });

      slideElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("translate-x-0");
        } else {
          el.classList.remove("translate-x-0");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-gray-100 min-h-screen text-gray-900">
      {/* Header Section */}
      <section className="text-center py-12 fade-in opacity-0 transition-opacity duration-1000">
        <h1 className="text-4xl font-bold text-blue-600">
          Habitat Plush – GateApp
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Efficient and Secure Visitor Management System for your Community.
        </p>
      </section>

      {/* Split Layout */}
      <section className="flex justify-between items-start py-12 px-6 max-w-7xl mx-auto">
        {/* Left Side: Features List */}
        <div className="w-full md:w-1/2 pr-6 fade-in opacity-0 transition-opacity duration-1000">
          <h2 className="text-3xl font-semibold text-blue-600 mb-2">
            For Residents:
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Visitor Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Vehicle Parking Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Track House Helpers Entry Exit
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Get notified on School Bus/ Cabs
            </li>
          </ul>

          <h2 className="text-3xl font-semibold text-blue-600 mt-10 mb-2">
            For Management Committee:
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Staff Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Attendance
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Move In/Out
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Vehicle Parking Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Monitoring of Visitors Daily Status
            </li>
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 pl-6 fade-in opacity-0 transition-opacity duration-1000">
          <div className="relative w-full h-96 rounded-lg overflow-hidden border-4 border-green-500">
            <Image
              src="/visitor-management.jpg" // Replace with your image path
              alt="Visitor Management"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>

      {/* Discover More Link */}
      <section className="text-center py-8">
        <Link href="/feature-list">
          <p className="text-xl text-blue-600 font-semibold hover:underline transition-all duration-200">
            Unbind more…
          </p>
        </Link>
      </section>
    </div>
  );
}
