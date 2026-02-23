import React, { useEffect } from "react";
import { Loader2, Calendar, FileText, Edit3, Trash2 } from "lucide-react";
import { useScholarships } from "../context/ScholarshipContext";
import toast from "react-hot-toast";
import axios from "axios";

const MyScholarships = () => {
  const { myScholarships, getMyScholarships, loading, deleteScholarship } =
    useScholarships();

  // Fetch the org's own scholarships on mount
  useEffect(() => {
    getMyScholarships();
  }, []);

  // ✅ Handle delete functionality
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?"))
      return;
    deleteScholarship(id);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-700 text-center">
        My Scholarships
      </h1>

      {myScholarships?.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven’t posted any scholarships yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myScholarships.map((scholarship) => (
            <div
              key={scholarship._id}
              className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Title & Provider */}
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {scholarship.title}
                </h2>
                <p className="text-gray-600 mb-2 font-medium">
                  {scholarship.provider}
                </p>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-3 line-clamp-3">
                  {scholarship.description}
                </p>

                {/* Deadline */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>
                    Deadline:{" "}
                    <span className="font-semibold">
                      {new Date(
                        scholarship.lastDateToApply
                      ).toLocaleDateString()}
                    </span>
                  </span>
                </div>

                {/* Documents Required */}
                {scholarship.documentsRequired?.length > 0 && (
                  <div className="text-sm text-gray-500 mb-4">
                    <FileText className="w-4 h-4 inline text-blue-600 mr-1" />
                    <span>
                      Documents:{" "}
                      {scholarship.documentsRequired.slice(0, 3).join(", ")}
                      {scholarship.documentsRequired.length > 3 && " ..."}
                    </span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => toast("Edit functionality coming soon!")}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                  <Edit3 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(scholarship._id)}
                  className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScholarships;
