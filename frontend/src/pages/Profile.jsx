import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/users/profile")
            .then(res => {
                setUser(res.data.user);
                setFullName(res.data.user.fullName);
                setEmail(res.data.user.email);
            })
            .catch(() => {
                localStorage.clear();
                navigate("/");
            });
    }, [navigate]);

    const updateProfile = async (e) => {
        e.preventDefault();
        setMessage("");
        await api.put("/users/profile", { fullName, email });
        setMessage("Profile updated");
    };

    const changePassword = async (e) => {
        e.preventDefault();
        setMessage("");
        await api.put("/users/change-password", {
            oldPassword,
            newPassword
        });
        setOldPassword("");
        setNewPassword("");
        setMessage("Password changed");
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="container">
            <h2>Profile</h2>
            <p><b>Role:</b> {user.role}</p>

            <form onSubmit={updateProfile}>
                <h3>Update Profile</h3>
                <input value={fullName} onChange={e => setFullName(e.target.value)} />
                <br />
                <input value={email} onChange={e => setEmail(e.target.value)} />
                <br />
                <button>Save</button>
            </form>

            <form onSubmit={changePassword}>
                <h3>Change Password</h3>
                <input
                    type="password"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                />
                <br />
                <button>Change</button>
            </form>

            {message && <p>{message}</p>}

            <button className="secondary" onClick={logout}>Logout</button>
        </div>
    );
}
