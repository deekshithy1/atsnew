import React, { useState } from 'react';
import pattern from '../assets/Pattern 01.png';
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const MOCK_USER = {
    username: "admin",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  };

  const MOCK_USER2 = {
    username: "technician",
    password: "admin123",
    name: "Admin User",
    role: "technician",
  };

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

    const handleSubmit = (e) => {
      e.preventDefault();
    
      if (
        formData.username === MOCK_USER.username &&
        formData.password === MOCK_USER.password
      ) {
        login({
          username: MOCK_USER.username,
          name: MOCK_USER.name,
          role: MOCK_USER.role,
        });
    
        console.log("✅ Mock login success:", MOCK_USER);
        navigate("/");
      } 
      else if (
        formData.username === MOCK_USER2.username &&
        formData.password === MOCK_USER2.password
      ) {
        login({
          username: MOCK_USER2.username,
          name: MOCK_USER2.name,
          role: MOCK_USER2.role,
        });
    
        console.log("✅ Mock login success:", MOCK_USER2);
        navigate("/");
      } 
      else {
        alert("❌ Invalid username or password!");
      }
    };
    


  return (
    <div className="w-full flex h-screen">
      {/* Left Side Image */}
      <div className="w-1/3 hidden md:block">
        <img
          src={pattern}
          alt="Pattern background"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center flex-1 px-8 md:px-24 items-center">
        <div className="mb-8 flex flex-col mr-11 space-y-5">
          <p className="font-bold text-[#082777] text-[18px] text-start">Welcome to ATS Management System</p>
          <h1 className="text-3xl font-bold text-[#2E4C98] text-[36px] font-light">
            Start Tracking. Stay Ahead.
          </h1>
        </div>
        <div className='flex w-full justify-center'>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            <div className="relative">
              <label htmlFor="username" className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="absolute font-semibold text-[12px] text-[#082777] bg-white px-1 left-3 -top-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border border-gray-300 w-full px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-[16px] text-[#082777]"
              />
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-72 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
