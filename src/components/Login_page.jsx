import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cross from './picture/cross.png'
import { authAPI } from '../api/auth'

export default function Login_page() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.login(formData);
      navigate('/'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <div className='p-4 bg-white border-b border-gray-200'>
        <div className='cursor-pointer'>
          <h2 className="text-xl font-bold">Sales Dashboard</h2>
        </div>
      </div>
      
      <div className="min-h-screen flex flex-col items-center justify-start py-6">
        <div className="max-w-[480px] w-full">
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className='flex justify-center items-center relative'>
              <h1 className="text-slate-900 text-3xl font-semibold">Sign in</h1>
              <Link className="nav-link absolute right-0" to="/">
                <img src={Cross} alt="close" className='h-4 w-4 cursor-pointer'/>
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" 
                    placeholder="Enter email" 
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
    
              </div>

              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input 
                    name="password" 
                    type="password" 
                    required 
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600" 
                    placeholder="Enter password" 
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    name="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" 
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:underline font-semibold">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div className="mt-12">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              <p className="text-slate-900 text-sm mt-6 text-center">
                Don't have an account? 
                <a href="#" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">
                  Register here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}