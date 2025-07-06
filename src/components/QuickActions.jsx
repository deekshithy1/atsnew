import React from 'react'
import { UserPlus, Settings, Database, FileText } from 'lucide-react'

const QuickActions = () => {
  const actions = [
    { name: 'Add New User', icon: UserPlus, color: 'blue' },
    { name: 'System Settings', icon: Settings, color: 'gray' },
    { name: 'Backup Database', icon: Database, color: 'green' },
    { name: 'View System Logs', icon: FileText, color: 'purple' }
  ]

  const getIconColor = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600'
      case 'gray':
        return 'text-gray-600'
      case 'green':
        return 'text-green-600'
      case 'purple':
        return 'text-purple-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="quick-action"
            >
              <div className={`p-2 rounded-lg mr-3 ${getIconColor(action.color)}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions