import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Loading } from "./components/Loading";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Resgister";
import { UserData } from "./context/UserContext";
import NavigationBar from "./components/NavigationBar";
import ErrorPage from "./pages/ErrorPage";
import Automation from "./pages/Automation";
import AllScolarships from "./pages/AllScolarships";
import About from "./pages/About";
import SingleScholarship from "./components/SingleScholarship";
import OrganizationDashboard from "./pages/OrganizationDashboard ";
import OrgNavbar from "./components/OrgNavbar";
import MyScolarships from "./pages/MyScolarships";
import ViewApplications from "./pages/ViewApplications";
import AddScholarship from "./pages/AddScholarship";
import StudentProfile from "./pages/StudentProfile";
import CompleteProfile from "./components/CompleteProfile";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const { loading, isAuth, user } = UserData();

  console.log("user", user);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {isAuth && (
            <>
              {user?.data?.role === "student" && <NavigationBar />}
              {user?.data?.role === "organization" && <OrgNavbar />}
            </>
          )}

          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />

            <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Home />}
            />
            <Route
              path="/student-profile"
              element={isAuth ? <StudentProfile /> : <Login />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/automation"
              element={isAuth ? <Automation /> : <Login />}
            />
            <Route
              path="/scholarships"
              element={isAuth ? <AllScolarships /> : <Login />}
            />
            <Route
              path="/scholarship/:id"
              element={isAuth ? <SingleScholarship /> : <Login />}
            />
            <Route path="/about" element={isAuth ? <About /> : <Login />} />
            <Route
              path="/complete-profile"
              element={isAuth ? <CompleteProfile /> : <Login />}
            />
            <Route
              path="/update-profile/:id"
              element={isAuth ? <UpdateProfile /> : <Login />}
            />

            <Route path="/org/dashboard" element={<OrganizationDashboard />} />
            <Route path="/org/scholarships" element={<MyScolarships />} />
            <Route path="/org/add-scholarship" element={<AddScholarship />} />
            <Route path="/org/applications" element={<ViewApplications />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
