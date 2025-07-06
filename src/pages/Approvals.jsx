import React from 'react'

const Approvals = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Approvals</h2>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">Pending approval requests</p>
          <span className="bg-blue-100 text-blue-600 text-sm rounded-full px-3 py-1">
            12 pending
          </span>
        </div>
        <p className="text-gray-600">Approval management interface will be implemented here.</p>
      </div>
    </div>
  )
}

export default Approvals