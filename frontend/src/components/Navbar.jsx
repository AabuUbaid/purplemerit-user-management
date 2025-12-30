import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!user) return null;

    return (
        <div style={styles.nav}>
            <div>
                <b>PurpleMerit</b>
            </div>

            <div style={styles.links}>
                <span>
                    {user.fullName} ({user.role})
                </span>

                {user.role === "admin" && (
                    <Link to="/admin" style={styles.link}>
                        Admin
                    </Link>
                )}

                <Link to="/profile" style={styles.link}>
                    Profile
                </Link>

                <button onClick={logout} style={styles.logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 20px",
        background: "#1f2937",
        color: "#fff",
    },
    links: {
        display: "flex",
        gap: "14px",
        alignItems: "center",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
    },
    logout: {
        background: "#dc2626",
        border: "none",
        color: "#fff",
        padding: "6px 10px",
        cursor: "pointer",
    },
};
