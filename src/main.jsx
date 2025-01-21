import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import rootReducer from "./reducer/index.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <Toaster />
  </Provider>
);
