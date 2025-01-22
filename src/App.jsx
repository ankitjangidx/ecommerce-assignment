import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import OpenRoute from "./components/Auth/OpenRoute";
import HeaderLayout from "./components/common/HeaderLayout";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route
            path="/"
            element={
              user != null ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/homepage" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route path="/homepage" element={<Home />} />
        </Route>
        <Route
          path="*"
          element={
            <div className="text-black min-h-screen flex items-center justify-center ">
              Error page
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
