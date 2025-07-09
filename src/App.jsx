import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Tests from './pages/Tests'
import Reports from './pages/Reports'
import Approvals from './pages/Approvals'
import Users from './pages/Users'
import Settings from './pages/Settings'
import LoginPage from './pages/LoginPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import AddVehicle from './pages/AddVehicle'

function App() {
  return (

      <Router>
      <Routes>
      <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="tests" element={<Tests />} />
            <Route path="reports" element={<Reports />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path='addvehicle' element={<AddVehicle/>}/>
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>

  )
}

export default App
