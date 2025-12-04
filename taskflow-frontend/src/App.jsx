import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import withAuth from "./components/withAuth";

const Login = lazy(() => import("../src/pages/LoginPage"));
const Register = lazy(() => import("../src/pages/RegisterPage"));
const Dashboard = lazy(() => import("../src/pages/Dashboard"));

// ✅ Wrap the component
const ProtectedDashboard = withAuth(Dashboard);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ✅ Use the wrapped component as a normal element */}
          <Route path="/dashboard" element={<ProtectedDashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
