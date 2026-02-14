"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Link from "next/link";

import PaymentDueReminder from "./components/payment/PaymentDueReminder";
import InitSocietySetter from "@/components/shared/InitSocietySetter";

import MemberHandler from "@/handlers/MemberHandler";
import VehicleHandler from "@/handlers/VehicleHandler";
import JobProfileHandler from "@/handlers/JobProfileHandler";
import ManagementCommitteeHandler from "@/handlers/ManagementCommitteeHandler";
import VisitorHandler from "@/handlers/VisitorHandler";

import {
  FaCar,
  FaUsers,
  FaUserFriends,
  FaUserTie,
  FaUser,
  FaUserClock,
} from "react-icons/fa";

/* ===================== STAT CARD (FIXED) ===================== */
const StatCard = ({ icon, count, label, href }) => {
  return (
    <Link href={href} className="block">
      <div
        className="
          flex flex-col items-center justify-center
          h-[140px] rounded-lg bg-blue-100
          cursor-pointer transition
          hover:scale-105 hover:shadow-md
        "
      >
        {/* COUNT */}
        <div className="text-4xl font-bold text-teal-800">
          {count}
        </div>

        {/* LABEL + ICON */}
        <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-700">
          <span className="text-lg text-teal-600">{icon}</span>
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
};

/* ===================== DASHBOARD ===================== */
const Dashboard = ({ children }) => {
  const society = useSelector((state) => state.society.selectedSocietyId);

  const { fetchAllMembers } = MemberHandler();
  const { getVehicleByUserHandler } = VehicleHandler();
  const { getAllCommitteeHandler } = ManagementCommitteeHandler();
  const { getVisitorListBySenderId } = VisitorHandler();

  const [counts, setCounts] = useState({
    members: 0,
    vehicles: 0,
    tenants: 0,
    staffs: 0,
    management: 0,
    visitor: 0,
  });

  useEffect(() => {
    if (society?.id) {
      fetchAllCounts();
    }
  }, [society?.id]);

  const fetchAllCounts = async () => {
    try {
      const [
        members,
        vehicles,
        staffs,
        committee,
        visitor,
      ] = await Promise.all([
        fetchAllMembers(),
        getVehicleByUserHandler(),
        JobProfileHandler.getStaffBySociety({
          societyId: society.id,
          token: Cookies.get("auth"),
        }),
        getAllCommitteeHandler(),
        getVisitorListBySenderId(),
      ]);

      const tenants = Array.isArray(members)
        ? members.filter((m) => m.role === "tenant").length
        : 0;

      setCounts({
        members: members?.length || 0,
        vehicles: vehicles?.length || 0,
        tenants,
        staffs: staffs?.length || 0,
        management: committee?.members?.length || 0,
        visitor: visitor?.length || 0,
      });
    } catch (error) {
      console.error("Dashboard count error:", error);
    }
  };

  const allCards = [
    { count: counts.members, icon: <FaUsers />, label: "Members", href: "/member" },
    { count: counts.vehicles, icon: <FaCar />, label: "Vehicles", href: "/vehicle" },
    { count: counts.tenants, icon: <FaUserFriends />, label: "Tenants", href: "/tenant" },
    { count: counts.management, icon: <FaUserTie />, label: "Management", href: "/management" },
    { count: counts.staffs, icon: <FaUser />, label: "Staffs", href: "/staff" },
    { count: counts.visitor, icon: <FaUserClock />, label: "Visitors", href: "/visitors" },
  ];

  return (
    <div className="p-5 space-y-10">
      {/* TOP SECTION */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <InitSocietySetter />
      </div>

      {/* PAYMENT REMINDER */}
      <PaymentDueReminder
        amountDue={4000}
        dueDate={new Date().toLocaleDateString()}
      />

      {children}

      {/* STAT CARDS GRID */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {allCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* OPTIONAL SECTIONS */}
      <div className="grid grid-cols-1 gap-6 mt-10 lg:grid-cols-3">
        <div className="p-6 bg-white border shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Recent Members</h3>
          <p className="text-gray-500">
            List or summary of latest members can go here.
          </p>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Vehicles</h3>
          <p className="text-gray-500">
            Summary of vehicles or latest registrations.
          </p>
        </div>

        <div className="p-6 bg-white border shadow-sm rounded-xl hover:shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Visitors</h3>
          <p className="text-gray-500">
            Recent visitors or pending approvals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
