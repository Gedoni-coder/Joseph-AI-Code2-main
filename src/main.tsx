import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress recharts defaultProps warnings (library uses deprecated React pattern)
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const firstArg = String(args[0] || "");
  const secondArg = String(args[1] || "");

  // Filter out recharts defaultProps warnings for XAxis and YAxis
  if (
    firstArg.includes("defaultProps") &&
    (secondArg === "XAxis" || secondArg === "YAxis")
  ) {
    return;
  }

  originalWarn.apply(console, args);
};

createRoot(document.getElementById("root")!).render(<App />);
