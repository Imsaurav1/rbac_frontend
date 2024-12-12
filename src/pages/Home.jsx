import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndpoint'
import { Logout } from '../redux/AuthSlice'

export default function Home() {
  const user = useSelector((state) => state.Auth.user)
  console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const gotoAdmin = () => {
    navigate('/admin')
  }

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout')
      const response = request.data
      if (request.status === 200) {
        dispatch(Logout())
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div
        className='home-container'
        style={{
          backgroundImage: "url('')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <div className='user-card'>
          <h2> Welcome, {user && user.name}</h2>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          {user && user.role === 'admin' ? (
            <button className='admin-btn' onClick={gotoAdmin}>Go To admin</button>
          ) : ''}
        </div>
      </div>
    </>
  )
}
