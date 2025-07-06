import React from 'react'
import { Users, Shield, AlertTriangle } from 'lucide-react'
import MetricCard from '../components/MetricCard'
import SystemActivityLog from '../components/SystemActivityLog'
import QuickActions from '../components/QuickActions'
import { useAuthStore, vehicleStore } from '../store/store'
import done from '../assets/Vector-4.svg'
import car from '../assets/car.svg'
import clock from '../assets/Group.svg'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const totalVehicles=vehicleStore((state)=>state.vehicles)
    const pendingVehicles=vehicleStore((state)=>state.getPendingVehicles)
    const completedvehicles=vehicleStore((state)=>state.getCompletedVehicles)
    const getcount=(object)=>{
      return  Object.keys(object).length;
    }
  return (
    <div className="space-y-6">
   

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        <MetricCard
          title="Total Vehicles"
          value={getcount(totalVehicles)}
         
      
          icon={car}
          color="blue"
        />
        <MetricCard
          title="Tests Completed"
          value={getcount(completedvehicles)}
          trend="up"
         
          icon={done}
          color="green"
        />
        <MetricCard
          title="Pending Tests"
          value={getcount(pendingVehicles)}
          trend="up"
          
          icon={clock}
          color="yellow"
        />
      </div>

      <div className="">
          <SystemActivityLog />
        </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Activity Log */}
       
        
        {/* Quick Actions */}
        {/* <div className="lg:col-span-1">
          <QuickActions />
        </div> */}
      </div>
    </div>
  )
}

export default Dashboard