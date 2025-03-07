import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from API
  useEffect(() => {
    axios.get(API_URL).then((response) => setUsers(response.data));
  }, []);

  // Add user
  const addUser = () => {
    if (!newUser.name || !newUser.email) return;

    const userToAdd = {
      id: users.length + 1, // Mock ID
      name: newUser.name,
      email: newUser.email,
    };

    setUsers([...users, userToAdd]);
    setNewUser({ name: "", email: "" }); // Clear form
  };

  // Edit user
  const editUser = (user) => {
    setEditingUser(user);
  };

  // Update user
  const updateUser = () => {
    if (!editingUser.name || !editingUser.email) return;

    setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <motion.div
        className="card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="title">User Management</h1>

        {/* User Form */}
        <div className="form">
          <input
            type="text"
            className="input-field"
            placeholder="Enter Name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            type="email"
            className="input-field"
            placeholder="Enter Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <button
            className={`button ${editingUser ? "update-button" : "add-button"}`}
            onClick={editingUser ? updateUser : addUser}
          >
            {editingUser ? "Update" : "Add User"}
          </button>
        </div>

        {/* User List */}
        <ul className="user-list">
          {users.map((user) => (
            <motion.li
              key={user.id}
              className="list-item"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <p className="user-name">{user.name}</p>
                <p className="user-email">📧 {user.email}</p>
              </div>
              <div className="actions">
                <button className="edit-button" onClick={() => editUser(user)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default App;
