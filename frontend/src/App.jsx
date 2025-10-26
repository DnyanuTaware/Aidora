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

function App() {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {isAuth && <NavigationBar />}

          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />

            <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Home />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
