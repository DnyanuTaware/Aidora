import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ScholarshipContext = createContext();

export const ScholarshipContextProvider = ({ children }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myScholarships, setMyScholarships] = useState([]);

  // ✅ Fetch all scholarships
  async function fetchScholarships() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/scholarships/getAllScolarships");
      setScholarships(data.scholarships || []);
    } catch (error) {
      console.error("Error fetching scholarships:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch scholarships"
      );
    } finally {
      setLoading(false);
    }
  }

  // ✅ Post a new scholarship (for organizations)
  async function postScholarship(scholarshipData) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/scholarships/postScholarship",
        scholarshipData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(data.message || "Scholarship posted successfully");
      fetchScholarships(); // refresh list
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to post scholarship"
      );
    } finally {
      setLoading(false);
    }
  }
  // ✅ Get all scholarships posted by the logged-in organization
  async function getMyScholarships() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // or however you store it

      const { data } = await axios.get("/api/scholarships/myScholarships", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ add this
        },
      });

      setMyScholarships(data.scholarships); // Store in context for rendering
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch your scholarships"
      );
    } finally {
      setLoading(false);
    }
  }

  // ✅ Delete a scholarship (optional)
  async function deleteScholarship(id) {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.delete(`/api/scholarships/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ add this
        },
      });
      toast.success(data.message || "Scholarship deleted");
      setScholarships((prev) => prev.filter((s) => s._id !== id));
      getMyScholarships();
    } catch (error) {
      toast.error("Failed to delete scholarship");
    }
  }

  // Auto-fetch on load
  useEffect(() => {
    fetchScholarships();
  }, []);

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        loading,
        fetchScholarships,
        postScholarship,
        deleteScholarship,
        getMyScholarships,
        myScholarships,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

// ✅ Custom Hook for easy access
export const useScholarships = () => useContext(ScholarshipContext);
