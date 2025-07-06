import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { X, LayoutDashboard, Car, FileText, BarChart3, CheckCircle, Users, Settings, ChevronDown } from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Vehicles', href: '/vehicles', icon: Car },
    { name: 'Tests', href: '/tests', icon: FileText },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
  ]
  
  const adminControls = [
    { name: 'Approvals', href: '/approvals', icon: CheckCircle, badge: 12 },
    { name: 'Users', href: '/users', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">logo</span>
            </div>
            <span className="ml-3 text-xl font-semibold text-gray-900">ATS System</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6">
          <div className="px-4">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Main Menu
            </h3>
            <div className="mt-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          
          <div className="px-4 mt-8">
            <h3 className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Admin Controls
            </h3>
            <div className="mt-2 space-y-1">
              {adminControls.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto bg-blue-100 text-blue-600 text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar