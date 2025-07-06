import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

const MetricCard = ({ title, value, trend, trendValue, icon: Icon, color = 'blue' }) => {
  const isPositive = trend === 'up'
  
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  }
  
  return (
    <div className="metric-card">
      <div className="flex flex-row ">
      <div className={`p-3 rounded-full w-14 h-14 ${colorClasses[color]} flex items-center justify-center `}>
          <img src={Icon} className="h-6 w-6" />
        </div>
        <div className="flex-1 pl-4">

          <h3 className="text-xl font-semibold text-black">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
         
        </div>
       
      </div>
    </div>
  )
}

export default MetricCard