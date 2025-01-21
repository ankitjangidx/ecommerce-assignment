import { apiConnector } from "./apiconnector";
import { authEndpoints } from "./index";
import { setUser, setLoading, setToken } from "../slices/profileSlice";
import toast from "react-hot-toast";
const { SIGNUP_API, LOGIN_API, CHECK_USERNAME_API } = authEndpoints;

export function signUp(username, password, confirmPassword, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setLoading(true));
      console.log("signup api is called");
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        password,
        confirmPassword,
      });

      toast.success("Signup Successful");

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR..........", error);
      toast.error("signup Failed " + error.response.data.message);
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(username, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setLoading(true));

      const response = await apiConnector("POST", LOGIN_API, {
        username,
        password,
      });
      toast.success("Login Successful");

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed " + error.response.data.message);

    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export async function checkUsername(username) {
  try {
    console.log("username", username);
    const response = await apiConnector("POST", CHECK_USERNAME_API, {
      username,
    });

    console.log("CHECK USERNAME API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return {
      success: true,
      available: response.data.available,
      message: response.data.message,
    };
  } catch (error) {
    console.log("CHECK USERNAME API ERROR............", error);
    return {
      success: false,
      available: false,
      message: error.message || "Error checking username availability",
    };
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
  };
}
