import React from "react";
import { IoClose } from "react-icons/io5";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Users2,
  BarChart3,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiLaurelsTrophy } from "react-icons/gi";
import { UserData } from "../context/UserContext";

export default function OrgSidebar({ show, setShow }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = UserData();

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard />, path: "/org/dashboard" },
    { name: "My Scholarships", icon: <FileText />, path: "/org/scholarships" },
    {
      name: "Add Scholarship",
      icon: <PlusCircle />,
      path: "/org/add-scholarship",
    },
    { name: "Applications", icon: <Users2 />, path: "/org/applications" },
    { name: "Analytics", icon: <BarChart3 />, path: "/org/analytics" },
    { name: "Profile", icon: <UserCircle />, path: "/org/profile" },
  ];

  const bottomItems = [
    { name: "Settings", icon: <Settings />, path: "/org/settings" },
    { name: "Help & Support", icon: <HelpCircle />, path: "/org/help" },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-64 min-h-screen bg-white  shadow-xl p-4
        flex flex-col justify-between z-50
        transform transition-transform duration-500 ease-in-out
        ${show ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* -------- Logo + Close Button -------- */}
        <div>
          <div
            className="flex justify-end text-gray-500 cursor-pointer mb-2"
            onClick={() => setShow(false)}
          >
            <IoClose className="w-6 h-6 hover:text-teal-600 transition-all" />
          </div>

          <div
            onClick={() => navigate("/org/dashboard")}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3] p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 group-hover:text-[#2CA6A4] transition-colors duration-300">
              Aidora
            </h1>
          </div>

          {/* -------- Main Navigation -------- */}
          <nav className="space-y-2 mt-6">
            {navItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 transition-all
                  ${
                    pathname === item.path
                      ? "bg-gradient-to-r from-[#2CA6A4]/20 to-[#47C1BF]/20 text-[#2CA6A4] font-medium"
                      : "hover:bg-[#2CA6A4]/10 hover:text-[#2CA6A4]"
                  }`}
              >
                <span className="text-[#2CA6A4]">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* -------- Bottom Section -------- */}
        <div className="space-y-2 text-gray-700 border-t border-gray-200 pt-3">
          {bottomItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all
                ${
                  pathname === item.path
                    ? "bg-[#2CA6A4]/20 text-[#2CA6A4] font-medium"
                    : "hover:bg-[#2CA6A4]/10 hover:text-[#2CA6A4]"
                }`}
            >
              <span className="text-[#2CA6A4]">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={() => logoutUser(navigate)}
            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-red-100 text-red-600 transition-all"
          >
            <LogOut className="text-red-500" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
