import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function HabitatPlushERP() {
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
        <h1 className="text-4xl font-bold text-blue-600">Habitat Plush ERP</h1>
        <p className="mt-4 text-lg text-gray-600">
          Built with best practices to create Transparency, Convenience, and
          Efficiency for your Community.
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
              • Communication – Share your views
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Personalized chat
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Emergency connects with security
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Community Updates
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Personalized Document Repository
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Facility Booking
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Helpdesk
            </li>
          </ul>

          <h2 className="text-3xl font-semibold text-blue-600 mt-10 mb-2">
            For Management Committee:
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Accounting Billing and Invoicing
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • User Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Facility Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Notice and Announcement
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Community Communication
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Meetings and Events
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Vendor Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Staff Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Parking Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Helpdesk
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Asset and Inventory Management
            </li>
            <li className="transition-transform hover:translate-x-2 hover:text-blue-600">
              • Contract Maintenance
            </li>
          </ul>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2 pl-6 fade-in opacity-0 transition-opacity duration-1000">
          <div className="relative w-full h-96 rounded-lg overflow-hidden border-4 border-green-500">
            <Image
              src="/hii.jpg" // Replace with your image path
              alt="Society Admin Web App Screen"
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
            Discover more…
          </p>
        </Link>
      </section>
    </div>
  );
}
