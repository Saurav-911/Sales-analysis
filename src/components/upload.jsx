import React from 'react'
import Csv from './picture/csv.png'
export default function Upload() {
  return (
    <div className='grid justify-center m-10'>
      <div className='grid justify-center'>
      <h2 className='text-2xl font-bold mb-4'>This will display in dashboard</h2>
      <div className='grid justify-center'>
      <p>You can upload the csv file inside here</p>
      </div>
      </div>
      <div className='flex flex-col justify-center items-center bg-gray-50  min-h-auto w-210 border-3 border-gray-200 border-dotted  '>
        <div className='img w-10 h-10 m-3'><img src={Csv} alt="csv image"/></div>
        <div > 
          <button className='btn btn-primary m-3'>Choose CSV file</button>  
        </div>
        <div className='mb-3'>
          <p>or, drop the file here</p>
        </div>
        <div className='m-3 font-light'>
          <p>Maximum file size: 100MB</p>
        </div>
      </div>
      
    </div>
  ) 
}
