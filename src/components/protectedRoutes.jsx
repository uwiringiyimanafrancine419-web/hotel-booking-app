import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Firebase/firebase";

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export function RequireAdmin() {
  const { user, role, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}
