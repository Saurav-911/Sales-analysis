import React, { useState } from 'react'
import Csv from './picture/csv.png'
import { productsAPI } from '../api/products'

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    setMessage('');

    if (selectedFile) {
      // Check file type
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
        setError('Please upload only Excel files (.xlsx or .xls)');
        return;
      }

      // Check file size (100MB = 100 * 1024 * 1024 bytes)
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError('File size should not exceed 100MB');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setMessage('');

    try {
      const response = await productsAPI.uploadExcel(file);
      setMessage(`Success! ${response.count} products uploaded to database.`);
      setFile(null);
      // Reset file input
      document.getElementById('fileInput').value = '';
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div id="upload"  className='grid justify-center m-10'>
      <div className='grid justify-center mb-6'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Upload Sales Data</h2>
        <div className='grid justify-center'>
          <p className='text-gray-600'>Upload an Excel file to import sales data into the dashboard</p>
        </div>
      </div>

      {/* Success Message */}
      {message && (
        <div className='mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded'>
          {message}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          {error}
        </div>
      )}

      {/* Upload Area */}
      <div 
        id='upload_area'
        className={`flex flex-col justify-center items-center bg-gray-50 w-auto border-2 ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } border-dashed rounded-lg p-8`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag} 
        onDrop={handleDrop}
      >
        <div className='w-16 h-16 mb-4'>
          <img src={Csv} alt="Excel file" />
        </div>

        {file ? (
          <div className='mb-4 text-center'>
            <p className='text-green-600 font-semibold mb-2'>✓ File selected:</p>
            <p className='text-sm text-gray-700'>{file.name}</p>
            <p className='text-xs text-gray-500 mt-1'>
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <p className='mb-4 text-gray-600'>No file selected</p>
        )}

        <div className='mb-4'>
          <input
            id='fileInput'
            type='file'
            accept='.xlsx,.xls'
            onChange={handleFileChange}
            className='hidden'
          />
          <label
            htmlFor='fileInput'
            className='btn btn-primary'>
            Choose Excel File
          </label>
        </div>

        <div className='mb-4 text-gray-500'>
          <p>or, drop the file here</p>
        </div>

        {file && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className='px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed mb-4'
          >
            {uploading ? 'Uploading...' : 'Upload to Database'}
          </button>
        )}

        <div className='text-xs text-gray-400'>
          <p>Maximum file size: 100MB</p>
          <p className='mt-1'>Supported formats: .xlsx, .xls</p>
        </div>
      </div>

      {/* Expected Format Info */}
      <div id='upload_area2' className='mt-6 bg-sky-50 border border-blue-200 rounded-lg p-4 w-auto grid justify-center '>
        <h3 className='text-gray-800 font-bold '>Expected Excel Format:</h3>
        <p className='text-base text-gray-600 '>Your Excel file should have these columns:</p>
        <div className='grid justify-start mt-2'>
        <ul className='font-semibold text-blue-700 list-disc list-inside'>
          <li><strong>Sales Date</strong> - Date of sale (e.g., 2025-10-05)</li>
          <li><strong>Product Name</strong> - Name of the product</li>
          <li><strong>Category</strong> - Product category</li>
          <li><strong>Quantity Sold</strong> - Number of units sold</li>
          <li><strong>Revenue</strong> - Total revenue generated</li>
        </ul>
        </div>
      </div>
    </div>
  )
}