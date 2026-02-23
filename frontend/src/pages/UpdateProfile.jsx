import React, { useState, useEffect } from "react";
import { UserData } from "../context/UserContext";
import { Loader2, Save, BookOpen, User, MapPin, Wallet } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const {
    user,
    isAuth,
    profile,
    fetchStudentProfile,
    createOrUpdateStudentProfile,
  } = UserData();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Prefill existing profile
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else if (isAuth && user?.data?._id) {
      fetchStudentProfile(user.data._id);
    }
  }, [profile, user, isAuth]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 🔹 Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) return toast.error("Please login first.");

    setLoading(true);
    const success = await createOrUpdateStudentProfile(formData);
    setLoading(false);
    navigate("/student-profile");

    if (success) {
      await fetchStudentProfile(user.data._id);
      toast.success("Profile updated successfully!");
    }
  };

  if (!isAuth)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Please login to update your profile.
      </div>
    );

  if (!formData || Object.keys(formData).length === 0)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Loading your profile...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg my-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User className="w-7 h-7 text-blue-600" /> Update Student Profile
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
              value={formData.educationLevel || ""}
              onChange={handleChange}
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
              value={formData.instituteName || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="currentYear"
              placeholder="Current Year"
              value={formData.currentYear || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="number"
              name="marks"
              placeholder="Percentage Marks"
              value={formData.marks || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="boardOrUniversity"
              placeholder="Board / University"
              value={formData.boardOrUniversity || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="academicGap"
                checked={formData.academicGap || false}
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
              value={formData.category || ""}
              onChange={handleChange}
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
              value={formData.gender || ""}
              onChange={handleChange}
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
              value={formData.religion || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="disabilityStatus"
              placeholder="Disability Status"
              value={formData.disabilityStatus || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              value={formData.district || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="pinCode"
              placeholder="Pin Code"
              value={formData.pinCode || ""}
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
              placeholder="Annual Income"
              value={formData.annualIncome || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="incomeCertificateNumber"
              placeholder="Income Certificate No."
              value={formData.incomeCertificateNumber || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="guardianOccupation"
              placeholder="Guardian’s Occupation"
              value={formData.guardianOccupation || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <input
              type="text"
              name="guardianEducation"
              placeholder="Guardian’s Education"
              value={formData.guardianEducation || ""}
              onChange={handleChange}
              className="border rounded-md p-2"
            />

            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                name="bankAccountLinked"
                checked={formData.bankAccountLinked || false}
                onChange={handleChange}
              />
              Bank Account Linked?
            </label>
          </div>
        </section>

        {/* 🔹 Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
