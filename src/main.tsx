import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { App } from "./App";
import { ViewProvider } from "./Providers/ViewProvider";
import { DogProvider } from "./Providers/DogProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DogProvider>
      <ViewProvider>
        <Toaster />
        <App />
      </ViewProvider>
    </DogProvider>
  </React.StrictMode>
);
