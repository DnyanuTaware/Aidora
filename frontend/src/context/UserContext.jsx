import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function registerUser(formData, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", formData);

      toast.success(data.message);
      setUser(data);
      setIsAuth(true);
      setLoading(false);
      if (data.user.role === "organization") {
        navigate("/org/dashboard");
      } else {
        navigate("/complete-profile");
      }
      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  async function loginUser(email, password, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      });

      setUser(data);
      setIsAuth(true);
      setLoading(false);
      if (data.user.role === "organization") {
        navigate("/org/dashboard");
      } else {
        navigate("/");
      }

      toast.success(data.message);

      fetchUser();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  async function fetchUser() {
    setLoading(true);
    try {
      const data = await axios.get("/api/user/me");

      setUser(data); //data.user
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  async function updateProfilePic(id, formdata, setFile) {
    try {
      const { data } = await axios.put("/api/user/" + id, formdata);

      toast.success(data.message);
      fetchUser();
      setFile(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function updateProfileName(id, name, setShowInput) {
    try {
      const { data } = await axios.put("/api/user/" + id, { name });

      toast.success(data.message);
      fetchUser();
      setShowInput(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);

  async function logoutUser(navigate) {
    try {
      const { data } = await axios.get("/api/auth/logout");

      if (data.message) {
        toast.success(data.message);
        setUser([]);
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function updatePassword(
    id,
    oldPassword,
    newPassword,
    setShowUpdatePass,
  ) {
    try {
      const { data } = await axios.post("/api/user/" + id, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  // Inside UserContextProvider (with other functions)
  async function createOrUpdateStudentProfile(profileData) {
    if (!isAuth) {
      toast.error("Please login first.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/user/studentProfile/createOrUpdate",
        {
          userId: user?.data?._id,
          ...profileData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      toast.success(data.message || "Profile saved successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save student profile",
      );
    } finally {
      setLoading(false);
    }
  }
  // ✅ Fetch logged-in student's profile from backend
  // inside UserContextProvider
  const [profile, setProfile] = useState(null);

  // ✅ Define function once
  const fetchStudentProfile = async (userId) => {
    if (!userId) return;
    try {
      const { data } = await axios.get(`/api/user/studentProfile/${userId}`);
      setProfile(data.profile);
      console.log("Profile fetched successfully!");
    } catch (error) {
      toast.error("Failed to fetch student profile");
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        isAuth,
        setIsAuth,
        user,
        setUser,
        loading,
        logoutUser,
        registerUser,

        updateProfilePic,
        updateProfileName,
        updatePassword,
        createOrUpdateStudentProfile,
        fetchStudentProfile,
        profile,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
