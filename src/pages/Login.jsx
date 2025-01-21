import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/common/Input";
import { login } from "../services/authAPI";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(username, password, navigate));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            placeholder="Enter your username"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" isLoading={loading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
