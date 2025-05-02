import Image from "next/image";
import Link from "next/link";
import DesktopImage from "./hii.jpg";

const WhyHabitatPlush = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 lg:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-darkTeal">Why Habitat Plush!</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Experience the ultimate community living with Habitat Plush, your
          all-in-one community management app. Designed to simplify your daily
          life, Habitat Plush connects you with your community, streamlines
          tasks, and enhances your living experience.
        </p>
      </div>

      {/* Features Grid with Image in the Center */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Features */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {features.slice(0, 4).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Center Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src={DesktopImage}
            alt="Community Living"
            width={400}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Right Features */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          {features.slice(4).map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* CTA Link */}
      <div className="text-center mt-10">
        <Link href="/features">
          <button className="text-white bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg text-lg font-medium shadow-md">
            Unleash more…
          </button>
        </Link>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, imgSrc }) => {
  return (
    <div className="p-6 text-center">
      <Image
        src={imgSrc}
        alt={title}
        width={80}
        height={80}
        className="mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-darkTeal">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

// Feature Data
const features = [
  {
    title: "Home & Unit Management",
    description:
      "User identification, User Role Access management, Move In/Out, Look out for rentals.",
    imgSrc: DesktopImage,
  },
  {
    title: "Visitor Management",
    description:
      "Approved Guests, Notify New Guest, Delivery Agents, House Helper.",
    imgSrc: DesktopImage,
  },
  {
    title: "Notice & Announcement",
    description: "Society status and guidelines, Important Notice.",
    imgSrc: DesktopImage,
  },
  {
    title: "Payments",
    description:
      "Digital Invoice and Reports, Know your dues, Get notified and pay before due date.",
    imgSrc: DesktopImage,
  },
  {
    title: "Facility Management",
    description:
      "Book common facilities, Stay updated on Events & Activities, Plan your personal Events.",
    imgSrc: DesktopImage,
  },
  {
    title: "Connect Community",
    description:
      "Neighbour, Management Committee, Emergency connect, Real-Time Private Chat, Connect with Security in an emergency.",
    imgSrc: DesktopImage,
  },
  {
    title: "Document Repository",
    description: "Maintain your Private Documents, View common documents.",
    imgSrc: DesktopImage,
  },
  {
    title: "HelpDesk Society & Software",
    description:
      "Raise complaints or service requests, Track status and actions taken.",
    imgSrc: DesktopImage,
  },
];

export default WhyHabitatPlush;