import React from 'react'
import { Link,Outlet} from 'react-router-dom'
import home from './picture/home.png'
import upload from './picture/upload.png'
import products from './picture/products.png'
import Login_page from './Login_page.jsx'
import Upload from './upload.jsx'

// import logout from './picture/logout.png'
export default function Navigation() {
  return (
    <div>
      {/* Top div */}
      <div className='flex justify-between p-4 bg-white border-b border-gray-200  '>
        <div className='cursor-pointer'>
          <Link className="nav-link " to="/" ><h2>Top bar</h2></Link>
        </div>
        <div className='p-2.5 cursor-pointer  hover:bg-gray-100 hover:text-blue-500'>
          <Link className='nav-link' to="/Login"><h6>Login</h6></Link>
          </div>

      </div>
      
      <div className='grid grid-cols-8 gap-2 '>
      {/* Left div */}
      <div className='bg-white border-r border-gray-200 min-h-175 col-span-1 p-4  '>
        <ul className='list-none'>
          <li className='flex items-center  cursor-pointer hover:bg-gray-100 py-3 hover:text-blue-500'>
            <img src={home} alt="home" className="w-4 h-4 mr-2"/> 
            <Link className="nav-link " to="/" >Dashboard</Link>
            </li>
          <li className='flex items-center  cursor-pointer  hover:bg-gray-100 py-3 hover:text-blue-500'>
            <img src={upload} alt="upload" className="w-4 h-4 mr-2"/>
            <Link className="nav-link " to="/Upload" >Upload</Link>
            </li>
          <li className='flex items-center cursor-pointer hover:bg-gray-100 py-3 hover:text-blue-500'>
            <img src={products} alt="Product" className="w-4 h-4 mr-2"/> 
            <Link className="nav-link " to="/Product" >Product</Link>
            </li>
          {/* <li className='mb-3 flex items-center'><img src={home} alt="Logout" className="w-4 h-4 mr-2"/> <span>Logout</span></li> */}
        </ul>
      </div>
      {/* Main div */}
      <div className="col-span-7 p-4 "> 
       
      <Outlet />
      
      </div>
    </div>
    </div>
  )
}
