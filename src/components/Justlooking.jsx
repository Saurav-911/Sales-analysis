import React from 'react'
import home from './picture/home.png'

export default function Justlooking() {
  return (
    <div>
      {/* Top div */}
      <div className='flex justify-between p-4 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10'>
        <div><h2>Top bar</h2></div>
        <div><h4>Login</h4></div>
      </div>
      
      {/* Layout with fixed sidebar */}
      <div className='flex pt-16'> {/* pt-16 to account for fixed top bar */}
        {/* Left sidebar - Fixed */}
        <div className='bg-white border-r border-gray-200 w-64 fixed left-0 top-16 bottom-0 p-4 overflow-y-auto'>
          <ul className='list-none'>
            <li className='mb-2 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded'>
              <img src={home} alt="home" className="w-4 h-4 mr-2"/> <span>Dashboard</span>
            </li>
            <li className='mb-2 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded'>
              <img src={home} alt="upload" className="w-4 h-4 mr-2"/> <span>Upload</span>
            </li>
            <li className='mb-2 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded'>
              <img src={home} alt="Product" className="w-4 h-4 mr-2"/> <span>Product</span>
            </li>
            <li className='mb-2 flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded'>
              <img src={home} alt="Logout" className="w-4 h-4 mr-2"/> <span>Logout</span>
            </li>
          </ul>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 ml-64 p-4">
          <h3>Main bar</h3>
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  )
}