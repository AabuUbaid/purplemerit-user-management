import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) return <Navigate to="/" />;

    if (adminOnly && user?.role !== "admin") {
        return <Navigate to="/profile" />;
    }

    return children;
}
