import { useEffect, useState } from "react";
import api from "../services/api";

export default function Admin() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await api.get("/admin/users?page=1");
        setUsers(res.data.users);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const toggleStatus = async (id, status) => {
        const url = status === "active"
            ? `/admin/users/${id}/deactivate`
            : `/admin/users/${id}/activate`;

        await api.put(url);
        loadUsers();
    };

    return (
        <div className="container">
            <h2>Admin Dashboard</h2>

            <div className="table-wrapper">
                <table border="1">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(u => (
                            <tr key={u._id}>
                                <td>{u.email}</td>
                                <td>{u.role}</td>
                                <td>{u.status}</td>
                                <td>
                                    {u.role !== "admin" && (
                                        <button onClick={() => toggleStatus(u._id, u.status)}>
                                            {u.status === "active" ? "Deactivate" : "Activate"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
