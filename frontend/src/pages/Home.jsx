import React, { useEffect } from "react";
import { useScholarships } from "../context/ScholarshipContext";
import ScholarshipCard from "../components/ScholarshipCard";
import { Loader2 } from "lucide-react";
import NavigationBar from "../components/NavigationBar";

const Home = () => {
  const { scholarships, loading, fetchScholarships } = useScholarships();

  // ✅ Fetch scholarships on mount
  useEffect(() => {
    fetchScholarships();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {scholarships.length === 0 ? (
          <p className="text-center text-gray-500">
            No scholarships available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
