import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import App from "./App.jsx";
import React from "react";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,
);
