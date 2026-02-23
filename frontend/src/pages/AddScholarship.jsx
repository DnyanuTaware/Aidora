import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useScholarships } from "../context/ScholarshipContext";

const AddScholarship = () => {
  const { postScholarship, loading } = useScholarships();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    provider: "",
    description: "",
    minMarks: "",
    maxAnnualIncome: "",
    category: "",
    gender: "",
    state: "",
    educationLevel: "",
    religion: "",
    disabilityStatus: "",
    applicationLink: "",
    lastDateToApply: "",
    documentsRequired: "",
    tags: "",
    verified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scholarshipData = {
      title: form.title,
      provider: form.provider,
      description: form.description,
      eligibility: {
        minMarks: Number(form.minMarks),
        maxAnnualIncome: Number(form.maxAnnualIncome),
        category: form.category.split(",").map((item) => item.trim()),
        gender: form.gender.split(",").map((item) => item.trim()),
        state: form.state.split(",").map((item) => item.trim()),
        educationLevel: form.educationLevel
          .split(",")
          .map((item) => item.trim()),
        religion: form.religion.split(",").map((item) => item.trim()),
        disabilityStatus: form.disabilityStatus
          .split(",")
          .map((item) => item.trim()),
      },
      applicationLink: form.applicationLink,
      lastDateToApply: form.lastDateToApply,
      documentsRequired: form.documentsRequired
        .split(",")
        .map((item) => item.trim()),
      tags: form.tags.split(",").map((item) => item.trim()),
      verified: form.verified,
    };

    await postScholarship(scholarshipData);
    toast.success("Scholarship Posted Successfully!");
    navigate("/org/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        Add New Scholarship
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Scholarship Title"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="provider"
            placeholder="Provider Name"
            value={form.provider}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <textarea
          name="description"
          placeholder="Scholarship Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="border p-3 rounded-lg w-full"
          required
        />

        {/* Eligibility */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          Eligibility Criteria
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            name="minMarks"
            placeholder="Minimum Marks (%)"
            value={form.minMarks}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="number"
            name="maxAnnualIncome"
            placeholder="Maximum Annual Income (₹)"
            value={form.maxAnnualIncome}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g. SC, ST, OBC, EWS)"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender (e.g. Male, Female, All)"
            value={form.gender}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="state"
            placeholder="State (comma separated)"
            value={form.state}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="educationLevel"
            placeholder="Education Levels (e.g. 10th, 12th, UG)"
            value={form.educationLevel}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="religion"
            placeholder="Religion (comma separated)"
            value={form.religion}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
          <input
            type="text"
            name="disabilityStatus"
            placeholder="Disability Status (e.g. Yes, No, All)"
            value={form.disabilityStatus}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        {/* Application Info */}
        <h2 className="text-xl font-semibold text-gray-800 mt-6">
          Application Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="url"
            name="applicationLink"
            placeholder="Application Link"
            value={form.applicationLink}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
          <input
            type="date"
            name="lastDateToApply"
            placeholder="Last Date to Apply"
            value={form.lastDateToApply}
            onChange={handleChange}
            className="border p-3 rounded-lg w-full"
            required
          />
        </div>

        {/* Other Details */}
        <textarea
          name="documentsRequired"
          placeholder="Documents Required (comma separated)"
          value={form.documentsRequired}
          onChange={handleChange}
          rows={2}
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />

        <label className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            name="verified"
            checked={form.verified}
            onChange={handleChange}
          />
          <span className="text-gray-700">Mark as Verified</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-4 bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3] 
                     text-white font-semibold rounded-lg hover:opacity-90 transition-all"
        >
          {loading ? "Posting..." : "Post Scholarship"}
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
