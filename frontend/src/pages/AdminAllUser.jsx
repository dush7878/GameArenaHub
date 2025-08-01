import { useEffect, useState } from 'react';
import CONFIG from '../config';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState({ status: '', addWallet: '', addWinning: '' });

    const fetchUsers = async () => {
        const q = search ? `?gameName=${search}` : '';
        const res = await fetch(`${CONFIG.API_BASE_URL}/api/v1/admin/users${q}`);
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => { fetchUsers(); }, [search]);

    const selectUser = (user) => {
        if (selectedId === user._id) {
            setSelectedId(null);
        } else {
            setSelectedId(user._id);
            setForm({
                status: user.status,
                addWallet: '',
                addWinning: ''
            });
        }
    };

    const handleUpdate = async (userId) => {
        const body = {};
        if (form.status) body.status = form.status;
        if (form.addWallet) body.addWallet = parseFloat(form.addWallet);
        if (form.addWinning) body.addWinning = parseFloat(form.addWinning);

        try {
            const res = await fetch(`${CONFIG.API_BASE_URL}/api/v1/admin/users/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Update failed');

            const updated = await res.json();
            alert('User updated successfully');

            if (updated._id === selectedId) {
                setForm({ status: updated.status, addWallet: '', addWinning: '' });
            }
            fetchUsers();
        } catch (err) {
            alert('Failed to update user');
            console.error(err);
        }
    };


    const handleDelete = async (userId) => {
        if (!confirm('Are you sure delete this user?')) return;
        await fetch(`${CONFIG.API_BASE_URL}/api/v1/admin/users/${userId}`, {
            method: 'DELETE',
        });
        setSelectedId(null);
        fetchUsers();
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center md:text-left">User Management</h1>

            <input
                type="text"
                placeholder="Search by Game Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm mb-4"
            />

            <ul className="border rounded divide-y shadow-sm">
                {users.map(user => (
                    <li key={user._id} className="p-3">
                        <div
                            className="flex items-center justify-between cursor-pointer"
                            onClick={() => selectUser(user)}
                        >
                            <div className="flex items-center gap-3">
                                <img src={user.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <div className="font-semibold text-sm">{user.displayGameName}</div>
                                    <div className="text-xs text-gray-500">{user.gameName}</div>
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">Wallet: ₹{user.wallet}</div>
                        </div>

                        {selectedId === user._id && (
                            <div className="mt-4 border-t pt-4 space-y-3 text-sm">
                                <p><strong>UID:</strong> {user.gameUID}</p>
                                <p><strong>Status:</strong> {user.status}</p>
                                <p><strong>Phone:</strong> {user.phone}</p>
                                <p><strong>Wallet:</strong> ₹{user.wallet}</p>
                                <p><strong>Winning Money:</strong> ₹{user.winningMoney}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                    <div>
                                        <label className="block mb-1">Change Status</label>
                                        <select
                                            value={form.status}
                                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                                            className="w-full border px-2 py-1 rounded"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block mb-1">Add Amount to Wallet</label>
                                        <input
                                            type="number"
                                            value={form.addWallet}
                                            onChange={(e) => setForm({ ...form, addWallet: e.target.value })}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-1">Add Amount to Wallet</label>
                                        <input
                                            type="number"
                                            value={form.addWinning}
                                            onChange={(e) => setForm({ ...form, addWinning: e.target.value })}
                                            className="w-full border px-2 py-1 rounded"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-3 flex-wrap">
                                    <button
                                        onClick={() => handleUpdate(user._id)}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
                                    >
                                        Update User
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
                                    >
                                        Delete User
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
