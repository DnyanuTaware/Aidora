import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();

  const submitHandler = (event) => {
    event.preventDefault();
    loginUser(email, password, navigate);
    console.log(email, password);
  };

  return (
    <>
      {loading ? (
        <h1 className="text-center mt-20 text-gray-600">Loading....</h1>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4">
          <div className="flex flex-col md:flex-row shadow-xl rounded-2xl max-w-5xl w-full bg-white overflow-hidden">
            {/* Left: Login Form */}
            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
                Login to Aidora
              </h1>
              <form onSubmit={submitHandler} className="space-y-6">
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                  placeholder="User Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition"
                  placeholder="User Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white font-medium py-3 rounded-lg hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 transition-all shadow-md"
                >
                  Login
                </button>
              </form>
              <p className="mt-6 text-center text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-teal-500 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>

            {/* Right: Info / Gradient Panel */}
            <div className="hidden md:flex md:w-2/5 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white font-medium py-3 rounded-lg hover:from-teal-500 hover:via-teal-600 hover:to-teal-700 transition-all text-white flex-col justify-center items-center p-8">
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-center text-white/90">
                Access your personalized scholarships, stay updated with the
                latest opportunities, and manage your applications easily with
                Aidora.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
