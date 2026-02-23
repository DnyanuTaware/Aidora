import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [stateDistrict, setStateDistrict] = useState("");
  const [language, setLanguage] = useState("");
  const [role, setRole] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();
  const navigate = useNavigate();

  const changeFileHandler = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(selectedFile);
    };
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("stateDistrict", stateDistrict);
    formData.append("language", language);
    formData.append("role", role);
    formData.append("file", file);

    registerUser(formData, navigate);
  };

  return (
    <>
      {loading ? (
        <h1 className="text-center text-xl mt-20">Loading...</h1>
      ) : (
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center md:flex-row shadow-md rounded-xl max-w-7xl w-[90%] md:w-[50%] md:mt-[50px]">
            {/* Left Form Section */}
            <div className="w-full md:w-3/4">
              <div className="text-xl flex flex-col justify-center items-center mt-5 py-4">
                <h1 className="font-semibold text-2xl md:text-3xl text-gray-600 m-2">
                  Register to Aidora
                </h1>
              </div>

              <form onSubmit={submitHandler} method="POST">
                <div className="flex flex-col justify-center items-center m-2 space-y-6 md:space-y-7">
                  {/* Profile Picture Preview */}
                  {filePrev && (
                    <img
                      src={filePrev}
                      className="w-[150px] h-[150px] rounded-full border-2 border-teal-400 object-cover"
                      alt="Profile"
                    />
                  )}

                  {/* Profile Picture Upload */}
                  <input
                    type="file"
                    className="custom-input"
                    onChange={changeFileHandler}
                    accept="image/*"
                    required
                  />

                  {/* Username */}
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />

                  {/* Email */}
                  <input
                    type="email"
                    className="custom-input"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  {/* Password */}
                  <input
                    type="password"
                    className="custom-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {/* Phone Number */}
                  <input
                    type="tel"
                    className="custom-input"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    required
                  />

                  {/* State / District */}
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="State / District"
                    value={stateDistrict}
                    onChange={(e) => setStateDistrict(e.target.value)}
                    required
                  />

                  {/* Preferred Language Dropdown */}
                  <select
                    className="custom-input"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    required
                  >
                    <option value="">Preferred Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="marathi">Marathi</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                    <option value="gujarati">Gujarati</option>
                  </select>

                  {/* Login Role Dropdown */}
                  <select
                    className="custom-input"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="text-center mt-8">
                  <button
                    type="submit"
                    className="px-24 md:px-[118px] lg:px-[140px] py-2 my-4 rounded-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 font-medium py-3 rounded-lg hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 transition-all shadow-md hover:cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>

            {/* Right Login Section */}
            <div className="h-[100%] w-full md:w-1/3 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 transition-all items-center justify-center flex ">
              <div className="text-white text-base font-semibold text-center my-10 space-y-2 m-2">
                <h1 className="text-4xl">Have an Account?</h1>
                <h1>Login to Continue</h1>
                <Link
                  to="/login"
                  className="bg-white rounded-2xl px-4 text-emerald-400 py-1"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
