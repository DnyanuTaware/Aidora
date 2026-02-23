import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MapPin,
  Landmark,
  FileText,
  Banknote,
  Loader2,
  Edit,
} from "lucide-react";
import { UserData } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentProfile = () => {
  const { user, isAuth, fetchStudentProfile, profile } = UserData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuth || !user?.data?._id) return;
      setLoading(true);
      await fetchStudentProfile(user.data._id);
      setLoading(false);
    };

    loadProfile(); // ✅ fetch once when page opens
  }, []); // <--- empty dependency array to avoid infinite loop

  if (loading || !profile)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500 mr-2" />
        Loading your profile...
      </div>
    );

  if (!isAuth) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Please login to view your profile.
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        No profile found. Please complete your student profile.
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          <div className="relative">
            {/* Profile Image */}
            <div className="relative">
              {user?.data?.profilePic?.url ? (
                <img
                  src={user.data.profilePic.url}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md border-2 border-blue-500"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-blue-100 rounded-full border-2 border-blue-400 shadow-md">
                  <User className="w-14 h-14 text-blue-500" />
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl font-semibold text-gray-800">
              {user?.data?.name || "Student Name"}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-5 h-5 text-green-600" />
              <span>{user?.data?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-5 h-5 text-green-600" />
              <span>{user?.data?.phone || "Not provided"}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/update-profile/:${user?.data?._id}`)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
          >
            <Edit className="w-4 h-4" /> Edit
          </button>
        </div>

        {/* Section Divider */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* A. Educational Details */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5" /> Educational Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Education Level:</strong> {profile.educationLevel}
            </p>
            <p>
              <strong>Institute:</strong> {profile.instituteName}
            </p>
            <p>
              <strong>Course:</strong> {profile.courseName}
            </p>
            <p>
              <strong>Current Year:</strong> {profile.currentYear}
            </p>
            <p>
              <strong>Marks:</strong> {profile.marks}%
            </p>
            <p>
              <strong>Board/University:</strong> {profile.boardOrUniversity}
            </p>
            <p>
              <strong>Academic Gap:</strong>{" "}
              {profile.academicGap ? "Yes" : "No"}
            </p>
          </div>
        </section>

        <div className="border-t border-gray-300 my-6"></div>

        {/* B. Demographic Details */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5" /> Demographic Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Category:</strong> {profile.category}
            </p>
            <p>
              <strong>Gender:</strong> {profile.gender}
            </p>
            <p>
              <strong>Religion:</strong> {profile.religion}
            </p>
            <p>
              <strong>Disability:</strong> {profile.disabilityStatus}
            </p>
            <p>
              <strong>State:</strong> {profile.state}
            </p>
            <p>
              <strong>District:</strong> {profile.district}
            </p>
            <p>
              <strong>PIN Code:</strong> {profile.pinCode}
            </p>
          </div>
        </section>

        <div className="border-t border-gray-300 my-6"></div>

        {/* C. Economic Details */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-3">
            <Banknote className="w-5 h-5" /> Economic Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Annual Income:</strong> ₹{profile.annualIncome}
            </p>
            <p>
              <strong>Income Certificate No:</strong>{" "}
              {profile.incomeCertificateNumber}
            </p>
            <p>
              <strong>Guardian Occupation:</strong> {profile.guardianOccupation}
            </p>
            <p>
              <strong>Guardian Education:</strong> {profile.guardianEducation}
            </p>
            <p>
              <strong>Bank Linked:</strong>{" "}
              {profile.bankAccountLinked ? "Yes" : "No"}
            </p>
          </div>
        </section>

        <div className="border-t border-gray-300 my-6"></div>

        {/* D. Verification Details */}
        <section>
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5" /> Verification Status
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Aadhaar Verified:</strong>{" "}
              {profile.aadhaarVerified ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Income Certificate Verified:</strong>{" "}
              {profile.incomeCertificateVerified ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Caste Certificate Verified:</strong>{" "}
              {profile.casteCertificateVerified ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>Marksheet Verified:</strong>{" "}
              {profile.marksheetVerified ? "✅ Yes" : "❌ No"}
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default StudentProfile;
