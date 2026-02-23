import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Home,
  Info,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { UserData } from "../context/UserContext"; // correct path
import UserMenu from "./UserMenu";

const NavigationBar = () => {
  const { isAuth, logoutUser } = UserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate); // Context ke logout function ka use
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3] p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-800 group-hover:text-[#2CA6A4] transition-colors duration-300">
            Aidora
            <span className="block text-sm font-semibold text-gray-500 tracking-wide">
              Smart Scholarship System
            </span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/scholarships"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Scholarships
          </Link>
          <Link
            to="/automation"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Automation
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            My Applications
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3 cursor-pointer">
          <UserMenu />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden border-t bg-gray-50 py-2 flex justify-around text-sm font-medium text-gray-700">
        <Link to="/" className="flex flex-col items-center">
          <Home className="w-5 h-5 text-blue-600" />
          Home
        </Link>
        <Link to="/scholarships" className="flex flex-col items-center">
          Scholarships
        </Link>
        <Link to="/automation" className="flex flex-col items-center">
          Automation
        </Link>
        <Link to="/about" className="flex flex-col items-center">
          <Info className="w-5 h-5 text-blue-600" />
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
