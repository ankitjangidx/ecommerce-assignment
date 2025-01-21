import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUsername, signUp } from "../services/authapi";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/common/Button";
import Input from "../components/common/Input";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    return regex.test(password);
  };

  useEffect(() => {
    if (username.length < 3) {
      setUsernameStatus(null);
      return;
    }

    setIsChecking(true);

    const debounceTimer = setTimeout(async () => {
      try {
        const result = await checkUsername(username);
        setUsernameStatus(result);
      } catch (err) {
        console.error("Error checking username:", err);
        setUsernameStatus(null);
      } finally {
        setIsChecking(false);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
      setIsChecking(false);
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must contain at least 8 characters, one capital letter, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!(usernameStatus && usernameStatus.available)) {
      setError("Try Different Username");
      return;
    }
    console.log("handlesubmit is called");
    dispatch(signUp(username, password, confirmPassword, navigate));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            placeholder="Enter your username"
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          >
            {username.length >= 3 && (
              <div className="mt-1">
                {isChecking ? (
                  <p className="text-gray-500 text-sm">
                    Checking availability...
                  </p>
                ) : usernameStatus ? (
                  <p
                    className={`text-sm ${
                      usernameStatus.available
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {usernameStatus.message}
                  </p>
                ) : null}
              </div>
            )}
          </Input>
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            placeholder="Confirm your password"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            isLoading={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
