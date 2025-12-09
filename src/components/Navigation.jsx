import React from 'react'
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
      <div className='flex justify-between p-4 bg-white border-b border-gray-200 rounded-lg '>
        <div><h2>Top bar</h2></div>
        <div className='p-2.5 cursor-pointer  hover:bg-gray-100'><h6>Login</h6></div>
      </div>
      {/* Left div */}
      <div className='grid grid-cols-7 gap-2 '>
      <div className='bg-white border border-gray-200 min-h-175 col-span-1 p-4  '>
        <ui className='list-none'>
          <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3'><img src={home} alt="home" className="w-4 h-4 mr-2"/> <span>Dashboard</span></li>
          <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3'><img src={upload} alt="upload" className="w-4 h-4 mr-2"/> <span>Upload</span></li>
          <li className='flex items-center cursor-pointer hover:bg-gray-100 px-4 py-3'><img src={products} alt="Product" className="w-4 h-4 mr-2"/> <span>Product</span></li>
          {/* <li className='mb-3 flex items-center'><img src={home} alt="Logout" className="w-4 h-4 mr-2"/> <span>Logout</span></li> */}
        </ui>
      </div>
      {/* Main div */}
      <div className="col-span-6 p-4 "> 
        {/* <h3>Main bar</h3> */}
      {/* <div className='grid grid-cols-4 gap-x-3 gap-y-4'>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">1</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">2</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">3</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">4</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">5</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">6</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">7</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">8</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">9</div>
      <div className="bg-black rounded-lg shadow-xl min-h-[50px] text-white">10</div>
      </div> */}
      {/* <Login_page/> */}
      <Upload/>
      </div>
    </div>
    </div>
  )
}
