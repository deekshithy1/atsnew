import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { pendingApprovals } from '../assets/DummyData'
import car from '../assets/car.svg'
import dayjs from 'dayjs'

const Approvals = () => {

  const [searchBar, setSearchBar] = useState("")
  const [types] = useState(["Bike", "Cars", "Lorry"])
  const [technicians] = useState(["All", "Suresh"])
  const [selectedType, setSelectedType] = useState("")
  const [selectedTechnician, setSelectedTechnician] = useState("All")
  const [vehicles, setVehicles] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [certificateType, setCertificateType] = useState("")
  const [validFrom, setValidFrom] = useState("")
  const [validTo, setValidTo] = useState("")
  const [adminComments, setAdminComments] = useState("")
  
  useEffect(() => {
    setVehicles(pendingApprovals)
  }, [])

  useEffect(() => {
    if (selectedVehicle) {
      const testStatuses = Object.values(selectedVehicle.Tests).map(t => t.status)
      const hasFailed = testStatuses.includes("Failed")
      const hasConditional = testStatuses.includes("Conditional")
      const allPassed = testStatuses.every(status => status === "Passed")

      if (hasFailed) {
        setCertificateType("Not Eligible")
        setValidFrom("")
        setValidTo("")
      } else if (hasConditional) {
        setCertificateType("Conditional Fitness Certificate")
        const today = dayjs().format("YYYY-MM-DD")
        setValidFrom(today)
        setValidTo(dayjs().add(30, 'day').format("YYYY-MM-DD"))
      } else if (allPassed) {
        setCertificateType("Full Fitness Certificate")
        const today = dayjs().format("YYYY-MM-DD")
        setValidFrom(today)
        setValidTo(dayjs().add(2, 'year').format("YYYY-MM-DD"))
      }
    }
  }, [selectedVehicle])
  const handleSubmit = async () => {
    const payload = {
      bookingId: selectedVehicle.BookingId,
      certificateType,
      validFrom,
      validTo,
      adminComments,
      issuedAt: new Date().toISOString(),
    };
  
    console.log('Sending payload:', payload);
  
    try {
      const response = await fetch('/api/issue-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Certificate issued successfully!');
      } else {
        console.error('Failed to issue certificate');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Pending Approvals</h2>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
            <div className="flex items-center border gap-x-2 rounded-2xl px-3 py-1 flex-1">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Vehicle..."
                value={searchBar}
                onChange={(e) => setSearchBar(e.target.value)}
                className="flex-1 outline-none"
              />
            </div>
            <select
              className="border rounded-2xl px-3 py-1 flex-1 text-center"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              className="border rounded-2xl px-3 py-1 flex-1 text-center"
              value={selectedTechnician}
              onChange={(e) => setSelectedTechnician(e.target.value)}
            >
              {technicians.map((tech) => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-100 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Vehicle ID</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Registration</th>
                <th className="px-5 py-3">Technician</th>
                <th className="px-5 py-3">Last Test</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((v) => (
                <tr key={v.BookingId} className="hover:bg-gray-50">
                  <td className="px-5 py-4 font-medium">{v.BookingId}</td>
                  <td className="px-5 py-4">{v.VechicleType}</td>
                  <td className="px-5 py-4">{v.RegistrationNumber}</td>
                  <td className="px-5 py-4">{v.TechnicianName}</td>
                  <td className="px-5 py-4">{v.TestDate}</td>
                  <td className="px-5 py-4">{v.status}</td>
                  <td className="px-5 py-4 text-center">
                    <button
                      onClick={() => setSelectedVehicle(v)}
                      className="text-blue-500 hover:underline"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVehicle && (
        <div className="w-full space-y-6">
          <div className="flex flex-col md:flex-row justify-evenly p-6 rounded-lg gap-7">
            <div className="w-full md:w-1/3 space-y-4 bg-gray-100 rounded-xl p-6 h-fit">
              <div className="flex items-center gap-4">
                <img src={car} alt="Vehicle" className="w-10 h-10" />
                <div>
                  <p className="text-sm">{selectedVehicle.BookingId}</p>
                  <p className="text-lg font-semibold">{selectedVehicle.VechicleType}</p>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className='text-base'>Registration:</span><span className='font-semibold'>{selectedVehicle.RegistrationNumber}</span></div>
                <div className="flex justify-between"><span className='text-base'>Owner:</span><span className='font-semibold'>{selectedVehicle.Owner}</span></div>
                <div className="flex justify-between"><span className='text-base'> Technician:</span><span className='font-semibold'>{selectedVehicle.TechnicianName}</span></div>
                <div className="flex justify-between"><span className='text-base'>Test Date:</span><span className='font-semibold'>{selectedVehicle.TestDate}</span></div>
                <div className="flex justify-between"><span className='text-base'>Status:</span><span className='font-semibold'>{selectedVehicle.status}</span></div>
              </div>
            </div>
            <div className="w-full md:w-2/3 bg-gray-100 p-6 rounded-xl">
              <h4 className="text-lg font-semibold mb-4">Test Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { selectedVehicle?.Tests&&Object.entries(selectedVehicle.Tests).map(([code, test]) => (
                  <div key={code} className="flex justify-between  px-4">
                    <span>{test.item}</span>
                    <span className={test.status === "Passed" ? "text-green-600 font-semibold" : test.status === "Conditional" ? "text-yellow-600 font-semibold" : "text-red-600 font-semibold"}>
                      {test.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {certificateType !== "Not Eligible" ? (
            <div className="bg-white p-6 rounded-lg space-y-4 border">
              <h4 className="text-lg font-semibold">Issue Certificate</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm">Certificate Type</label>
                  <input
                    type="text"
                    value={certificateType}
                    readOnly
                    className="border rounded px-3 py-2"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm">Validity Period</label>
                  <div className="flex gap-2">
                    <input type="date" value={validFrom} readOnly className="border rounded px-3 py-2 flex-1" />
                    <span className="self-center">to</span>
                    <input type="date" value={validTo} readOnly className="border rounded px-3 py-2 flex-1" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm">Admin Comments</label>
                <textarea
                  rows={2}
                  value={adminComments}
                  onChange={(e) => setAdminComments(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
            </div>
          ) : (
            <div className="p-4 bg-red-100 text-red-600 rounded">
              This vehicle has failed tests and is not eligible for certificate issuance.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Approvals
