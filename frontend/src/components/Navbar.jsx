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
        alignItems: "center",
        padding: "12px 16px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e5ea",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    },

    brand: {
        fontSize: "15px",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        color: "#1d1d1f",
    },

    links: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },

    link: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#1d1d1f",
        textDecoration: "none",
        padding: "6px 4px",
        transition: "color 0.15s ease",
    },

    linkHover: {
        color: "#007aff", // Apple blue
    },

    logout: {
        marginLeft: "8px",
        padding: "6px 12px",
        fontSize: "13px",
        fontWeight: 500,
        color: "#d70015",
        background: "#f2f2f7",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.15s ease",
    },

    logoutHover: {
        background: "#e5e5ea",
    },
};
