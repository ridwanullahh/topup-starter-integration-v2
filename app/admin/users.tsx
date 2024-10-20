
import { useState, useEffect } from "react";
import { useToast } from "../../components/ui/use-toast";

import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";


export default function UserManagement() {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    password: "",
    role: "normal"
  });


  useEffect(() => {
    // Fetch users
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    // Add user logic here
    // For demonstration, let's assume the add is always successful
    addToast({
      id: "success-toast",
      message: `User ${newUser.name} has been added.`,
    });
    setUsers([...users, newUser]);
    setNewUser({
      name: "",
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
      role: "normal"
    });
  };

  const handleDeleteUser = async (userId) => {
    // Delete user logic here
    // For demonstration, let's assume the delete is always successful
    addToast({
      id: "success-toast",
      message: `User ${userId} has been deleted.`,
    });
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="username">Username</label>
          <Input
            id="username"
            type="text"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phoneNumber">Phone Number</label>
          <Input
            id="phoneNumber"
            type="text"
            value={newUser.phoneNumber}
            onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>
        <Button type="submit">Add User</Button>
      </form>
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-bold">Current Users</h3>
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-lg">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Role: {user.role}</p>
            <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
