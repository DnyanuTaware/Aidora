import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Loader2,
  Calendar,
  FileText,
  Globe,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

const SingleScholarship = () => {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [relatedScholarships, setRelatedScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/api/scholarships/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setScholarship(data.scholarship);

        // Fetch a few related scholarships
        const relatedRes = await axios.get(
          "/api/scholarships/getAllScolarships",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRelatedScholarships(
          relatedRes.data.scholarships.filter((s) => s._id !== id).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );

  if (!scholarship)
    return (
      <p className="text-center mt-10 text-gray-600">Scholarship not found.</p>
    );

  const {
    title,
    provider,
    description,
    eligibility,
    applicationLink,
    lastDateToApply,
    documentsRequired,
    verified,
  } = scholarship;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-blue-50 to-white ">
      {/* Back Button */}
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-medium transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Scholarships
      </Link>

      {/* Main Card */}
      <div className="bg-white  rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">{provider}</p>

        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span>
              Deadline:{" "}
              <span className="font-semibold text-gray-800">
                {formatDate(lastDateToApply)}
              </span>
            </span>
          </div>
          {verified && (
            <span className="flex items-center gap-1 text-green-600 text-xs font-semibold ml-4">
              <CheckCircle className="w-4 h-4" /> Verified
            </span>
          )}
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Eligibility Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Eligibility Criteria
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {eligibility?.minMarks && (
              <li>Minimum Marks: {eligibility.minMarks}%</li>
            )}
            {eligibility?.maxAnnualIncome && (
              <li>
                Maximum Annual Income: ₹
                {eligibility.maxAnnualIncome.toLocaleString()}
              </li>
            )}
            {eligibility?.educationLevel?.length > 0 && (
              <li>
                Eligible Education Levels:{" "}
                {eligibility.educationLevel.join(", ")}
              </li>
            )}
            {eligibility?.category?.length > 0 && (
              <li>Eligible Categories: {eligibility.category.join(", ")}</li>
            )}
            {eligibility?.state?.length > 0 && (
              <li>Applicable States: {eligibility.state.join(", ")}</li>
            )}
          </ul>
        </div>

        <hr className="my-6 border-gray-200" />

        {/* Documents Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Required Documents
          </h2>
          <ul className="space-y-2">
            {documentsRequired?.length > 0 ? (
              documentsRequired.map((doc, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <FileText className="w-4 h-4 text-blue-500" /> {doc}
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-sm">
                No specific documents listed.
              </li>
            )}
          </ul>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <a
            href={applicationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2CA6A4] via-[#47C1BF] to-[#5FD6D3]
                       text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all shadow-md"
          >
            <Globe className="w-5 h-5" />
            Apply Online
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Related Scholarships */}
      {relatedScholarships.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Related Scholarships
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedScholarships.map((item) => (
              <Link
                key={item._id}
                to={`/scholarship/${item._id}`}
                className="bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-xl p-5 
                           shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{item.provider}</p>
                <p className="text-xs text-gray-500">
                  Deadline: {formatDate(item.lastDateToApply)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleScholarship;
