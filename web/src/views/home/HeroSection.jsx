import Image from "next/image";
import Link from "next/link";
import DesktopImage from "./hii.jpg";
import MobileTabImage from "./hii.jpg";

const HeroSection = () => {
  return (
    <section className="w-full py-16 flex flex-col items-center text-center px-6 md:px-12 lg:px-24">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
        Welcome to <span className="text-blue-600">Habitat Plush</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mt-4">
        Nurturing Communities for a Sustainable Tomorrow
      </p>
      <p className="text-md md:text-lg text-gray-500 mt-2">
        Comprehensive Digital Platform for Managing Apartment/Villa Communities,
        Smart Cities, and Townships!
      </p>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <Link href="/features">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Explore More
          </button>
        </Link>
        <Link href="/contact">
          <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition">
            Request for Demo
          </button>
        </Link>
      </div>

      {/* Images */}
      <div className="flex flex-wrap justify-center mt-12 gap-6">
        <Image
          src={DesktopImage}
          alt="Desktop View"
          width={500}
          height={300}
          className="rounded-lg shadow-md"
        />
        <Image
          src={MobileTabImage}
          alt="Mobile & Tab View"
          width={300}
          height={500}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Habitat Plush ERP & APP */}
      <div className="mt-10 flex flex-col md:flex-row gap-8 text-center">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
          <h3 className="text-2xl font-semibold text-gray-700">
            Habitat Plush ERP
          </h3>
          <p className="text-gray-500 mt-2">
            Comprehensive management system for communities.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-80">
          <h3 className="text-2xl font-semibold text-gray-700">
            Habitat Plush APP
          </h3>
          <p className="text-gray-500 mt-2">
            Seamless mobile experience for residents.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
