import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus, User } from "lucide-react";
import { UserData } from "../context/UserContext";

const UserMenu = () => {
  const { isAuth, user, logoutUser } = UserData();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(navigate);
    setMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative cursor-pointer" ref={menuRef}>
      {/* Avatar / Icon Button */}
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-blue-600 
                   hover:shadow-md transition-all duration-200"
      >
        {isAuth && user?.data?.profilePic?.url ? (
          <img
            src={user.data.profilePic.url}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        ) : (
          <User className="text-blue-600 w-5 h-5 cursor-pointer" />
        )}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl border border-gray-200 py-2 z-50
          animate-fadeIn"
        >
          {isAuth ? (
            <>
              <button
                onClick={() => {
                  navigate("/student-profile");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                <User className="w-4 h-4 " /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 "
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-600"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-green-600"
              >
                <UserPlus className="w-4 h-4" /> Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
