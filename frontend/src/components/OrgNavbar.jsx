import React, { useState, useEffect } from "react";
import { GraduationCap, User } from "lucide-react";
import { GiHamburgerMenu, GiLaurelsTrophy } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrgSidebar from "./OrgSidebar";

const OrgNavbar = () => {
  const [show, setShow] = useState(false);
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch organization data from backend
  const fetchOrg = async () => {
    try {
      const { data } = await axios.get("/api/user/me", {
        withCredentials: true,
      });

      if (data?.role === "organization") {
        setOrg(data);
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between bg-white p-4  shadow-sm">
        {/* Left - Logo + Menu */}
        <div className="flex items-center gap-2 text-gray-700">
          <div
            className="cursor-pointer mt-1 text-xl"
            onClick={() => setShow(!show)}
          >
            <GiHamburgerMenu />
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
              <span className="block text-sm font-semibold text-gray-500 tracking-wide">
                Smart Scholarship System
              </span>
            </h1>
          </div>
        </div>

        {/* Right - Profile */}
        <div className="relative">
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-500 shadow-md z-10"></span>

          <div
            className="flex items-center gap-6 shadow-md rounded-md hover:shadow-[#2CA6A4]/40 cursor-pointer"
            onClick={() => navigate("/org/profile")}
          >
            <div className="flex items-center gap-3 p-2">
              {org?.profilePic?.url ? (
                <img
                  src={org.profilePic.url}
                  alt="Org"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <User className="text-gray-600 w-6 h-6" />
              )}

              <div className="hidden sm:flex flex-col">
                <p className="text-sm font-medium text-gray-800">
                  {org?.organizationName || org?.name || "Organization"}
                </p>
                <p className="text-xs text-gray-500">{org?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : (
        <OrgSidebar show={show} setShow={setShow} />
      )}
    </>
  );
};

export default OrgNavbar;
