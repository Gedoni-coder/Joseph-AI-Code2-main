import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress recharts defaultProps warnings (library uses deprecated React pattern)
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (
    args[0]?.includes?.("defaultProps") &&
    (args[1] === "XAxis" || args[1] === "YAxis")
  ) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")!).render(<App />);
