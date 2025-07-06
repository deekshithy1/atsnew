import React, { useState } from 'react'
import { Menu, Search, Bell } from 'lucide-react'
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const date= new Date();
  const user = useAuthStore(state => state.user);
  const [currentDate,setCurrentDate]=useState(date.toString().slice(4,15))
  const logout=useAuthStore((state)=>state.logout);
const clearStorage = useAuthStore((state) => state.clearStorage);
const navigate = useNavigate();

const handleLogout = () => {
  logout();            // Reset state
  clearStorage();      // Optional: remove the persisted storage completely
  navigate("/login");  // Redirect to login page
};

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 ml-4 lg:ml-0">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {currentDate}

          </div>
          <div>
            <button className='' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header