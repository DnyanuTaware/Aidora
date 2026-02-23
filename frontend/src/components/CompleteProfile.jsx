import React, { useState, useEffect } from "react";
import { UserData } from "../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Save, BookOpen, User, MapPin, Wallet } from "lucide-react";

const CompleteProfile = () => {
  const { user, isAuth, createOrUpdateStudentProfile } = UserData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    educationLevel: "",
    instituteName: "",
    courseName: "",
    currentYear: "",
    marks: "",
    boardOrUniversity: "",
    academicGap: false,

    category: "",
    disabilityStatus: "No",
    religion: "",
    gender: "",
    state: "",
    district: "",
    pinCode: "",

    annualIncome: "",
    incomeCertificateNumber: "",
    guardianOccupation: "",
    guardianEducation: "",
    bankAccountLinked: false,
  });

  useEffect(() => {
    if (user?.data) {
      // You can prefill basic data if available
      setFormData((prev) => ({
        ...prev,
        gender: user.data.gender || "",
        state: user.data.state || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrUpdateStudentProfile(formData); // 👈 call from context
    //after completing profile details fetch profile page
    navigate("/student-profile");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg my-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User className="w-7 h-7 text-blue-600" /> Student Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 🔹 Educational Details */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" /> Educational Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            >
              <option value="">Select Education Level</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Diploma">Diploma</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="PhD">PhD</option>
            </select>
            <input
              type="text"
              name="instituteName"
              placeholder="Institute Name"
              value={formData.instituteName}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="currentYear"
              placeholder="Current Year (e.g. 2nd Year)"
              value={formData.currentYear}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="number"
              name="marks"
              placeholder="Percentage Marks"
              value={formData.marks}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="boardOrUniversity"
              placeholder="Board / University"
              value={formData.boardOrUniversity}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="academicGap"
                checked={formData.academicGap}
                onChange={handleChange}
              />
              Academic Gap?
            </label>
          </div>
        </section>

        {/* 🔹 Demographic Details */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Demographic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EWS">EWS</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="religion"
              placeholder="Religion"
              value={formData.religion}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="disabilityStatus"
              placeholder="Disability Status (Yes/No)"
              value={formData.disabilityStatus}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
          </div>
        </section>

        {/* 🔹 Economic Details */}
        <section>
          <h2 className="text-xl font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" /> Economic Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              name="annualIncome"
              placeholder="Annual Family Income"
              value={formData.annualIncome}
              onChange={handleChange}
              required
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="incomeCertificateNumber"
              placeholder="Income Certificate No."
              value={formData.incomeCertificateNumber}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="guardianOccupation"
              placeholder="Guardian's Occupation"
              value={formData.guardianOccupation}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <input
              type="text"
              name="guardianEducation"
              placeholder="Guardian's Education"
              value={formData.guardianEducation}
              onChange={handleChange}
              className="border rounded-md p-2"
            />
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="bankAccountLinked"
                checked={formData.bankAccountLinked}
                onChange={handleChange}
              />
              Bank Account Linked?
            </label>
          </div>
        </section>

        {/* 🔹 Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;
