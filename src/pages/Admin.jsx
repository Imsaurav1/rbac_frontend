import React, { useEffect, useState } from 'react'
import { fetchUsers, removeUser, updateUserRole, logout } from '../services/ApiEndpoint'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetchUsers()
        if (response.status === 200) {
          setUsers(response.data.users)
        }
      } catch (error) {
        toast.error('Failed to fetch users')
      }
    }
    getUsers()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await removeUser(id)
      if (response.status === 200) {
        toast.success(response.data.message)
        setUsers((prev) => prev.filter((user) => user._id !== id))
      }
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const handleLogout = async () => {
    try {
      const response = await logout()
      if (response.status === 200) {
        toast.success('Logged out successfully')
        navigate('/login')
      }
    } catch (error) {
      toast.error('Error logging out')
    }
  }

  const handleRoleUpdate = async (id, newRole) => {
    try {
      const response = await updateUserRole(id, newRole)
      if (response.status === 200) {
        toast.success(response.data.message)
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        )
      }
    } catch (error) {
      toast.error('Failed to update role')
    }
  }

  return (
    <div className='admin-container'>
      <h2>Manage Users</h2>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                >
                  <option value='user'>User</option>
                  <option value='admin'>Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
