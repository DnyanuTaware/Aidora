import React from "react";
import { Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Link to={`/scholarship/${scholarship._id}`}>
      <div
        className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 
                 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 
                 transition-all duration-300 flex flex-col justify-between"
      >
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            {scholarship.title}
          </h2>

          {/* Provider */}
          <p className="text-gray-600 mb-3 font-medium">
            {scholarship.provider}
          </p>

          {/* Description */}
          {scholarship.description && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-3">
              {scholarship.description}
            </p>
          )}

          {/* Deadline */}
          {scholarship.lastDateToApply || scholarship.deadline ? (
            <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              Deadline:&nbsp;
              <span className="font-semibold">
                {new Date(
                  scholarship.lastDateToApply || scholarship.deadline
                ).toLocaleDateString()}
              </span>
            </p>
          ) : null}
        </div>

        {/* Apply Button */}
        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(scholarship.applicationLink, "_blank");
            }}
            className="inline-block bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ScholarshipCard;
