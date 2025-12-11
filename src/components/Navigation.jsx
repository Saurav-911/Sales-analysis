import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import home from './picture/home.png'
import upload from './picture/upload.png'
import products from './picture/products.png'
import { authAPI } from '../api/auth'
import '../App.css'

export default function Navigation() {
  const navigate = useNavigate();
  const user = authAPI.getCurrentUser();

  const handleLogout = () => {
    authAPI.logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Top div */}
      <div className='flex justify-between items-center p-4 bg-white border-b border-gray-200'>
        <div className='cursor-pointer'>
          <Link className="nav-link" to="/">
            <h2 className="text-xl font-bold">Sales Dashboard</h2>
          </Link>
        </div>
        
        <div className='flex items-center gap-4'>
          {user ? (
            <>
              <span className="text-gray-600 text-sm">Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className='px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-500 rounded'
              >
                Logout
              </button>
            </>
          ) : (
            <Link className='nav-link' to="/login">
              <div className='px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-blue-500 rounded'>
                <h6>Login</h6>
              </div>
            </Link>
          )}
        </div>
      </div>
      
      <div id="Navigation" className='grid grid-cols-7 gap-2'>
        {/* Left div */}
        <div id="Navigation_one" className=' bg-white border-r border-gray-200 min-h-screen col-span-1'>
          <ul className='list-none'>
            <Link className="nav-link" to="/">
              <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3 hover:text-blue-500'>
                <img src={home} alt="home" className="w-4 h-4 mr-2"/> 
                <span>Dashboard</span>
              </li>
            </Link>

            <Link className="nav-link" to="/upload">
              <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3 hover:text-blue-500'>
                <img src={upload} alt="upload" className="w-4 h-4 mr-2"/>
                <span>Upload</span>
              </li> 
            </Link>

            <Link className="nav-link" to="/product">
              <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3 hover:text-blue-500'>
                <img src={products} alt="Product" className="w-4 h-4 mr-2"/> 
                <span>Products</span>
              </li>
            </Link>
          </ul>
        </div>
        
        {/* Main div */}
        <div id="Navigation_two" className="col-span-6 p-4"> 
          <Outlet />
        </div>
      </div>
    </div>
  )
}