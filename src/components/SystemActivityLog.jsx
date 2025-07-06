import React, { useState } from 'react';

const SystemActivityLog = () => {
  const vehiclesArray = [
    { _id: 'V001', type: 'Car', registration: 'KA-01-AB-1234', status: 'success' },
    { _id: 'V002', type: 'Truck', registration: 'KA-02-CD-5678', status: 'failed' },
    { _id: 'V003', type: 'Bus', registration: 'KA-03-EF-9012', status: 'pending' },
    { _id: 'V004', type: 'Car', registration: 'KA-04-GH-3456', status: 'success' },
    { _id: 'V005', type: 'Truck', registration: 'KA-05-IJ-7890', status: 'pending' },
    { _id: 'V006', type: 'Bus', registration: 'KA-06-KL-1234', status: 'success' },
    { _id: 'V007', type: 'Car', registration: 'KA-07-MN-5678', status: 'failed' },
    { _id: 'V008', type: 'Truck', registration: 'KA-08-OP-9012', status: 'pending' },
    { _id: 'V009', type: 'Bus', registration: 'KA-09-QR-3456', status: 'success' },
    { _id: 'V010', type: 'Car', registration: 'KA-10-ST-7890', status: 'pending' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const vehiclesPerPage = 5;

  const totalPages = Math.ceil(vehiclesArray.length / vehiclesPerPage);

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = viewAll
    ? vehiclesArray
    : vehiclesArray.slice(indexOfFirstVehicle, indexOfLastVehicle);

  const nextPage = () => {
    if (!viewAll) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    }
  };

  const prevPage = () => {
    if (!viewAll) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const toggleViewAll = () => {
    setViewAll((prev) => !prev);
    setCurrentPage(1);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return (
          <span className="px-2 py-1 rounded-full text-xs text-green-700 bg-green-100">
            Success
          </span>
        );
      case 'pending':
        return (
          <span className="px-2 py-1 rounded-full text-xs text-yellow-700 bg-yellow-100">
            Pending
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-1 rounded-full text-xs text-red-700 bg-red-100">
            Failed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs text-gray-700 bg-gray-100">
            Unknown
          </span>
        );
    }
  };

  const handleViewReport = (vehicleId) => {
    console.log(`View Report for vehicle ${vehicleId}`);
  };

  const handleContinue = (vehicleId) => {
    console.log(`Continue for vehicle ${vehicleId}`);
  };

  const renderActionButton = (status, id) => {
    switch (status) {
      case 'success':
      case 'failed':
        return (
          <button
            onClick={() => handleViewReport(id)}
            className="text-sm text-blue-600 hover:underline"
          >
            View Report
          </button>
        );
      case 'pending':
        return (
          <button
            onClick={() => handleContinue(id)}
            className="text-sm text-blue-600 hover:underline"
          >
            Continue
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Vehicles</h3>
        <button
          onClick={toggleViewAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {viewAll ? 'Collapse' : 'View All'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                VEHICLE ID
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                REGISTRATION
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentVehicles.map((vehicle) => (
              <tr key={vehicle._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                  {vehicle._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {vehicle.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {vehicle.registration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vehicle.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderActionButton(vehicle.status, vehicle._id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200">
        <span className="text-xs text-gray-500">
          {viewAll ? `Viewing All` : `Page ${currentPage} of ${totalPages}`}
        </span>
        <div className="flex gap-2">
          <button
            onClick={prevPage}
            disabled={currentPage === 1 || viewAll}
            className="px-2 py-1 text-xs border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages || viewAll}
            className="px-2 py-1 text-xs border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span className="text-xs text-gray-500">
          Showing{' '}
          {viewAll
            ? `1-${vehiclesArray.length}`
            : `${indexOfFirstVehicle + 1}-${Math.min(
                indexOfLastVehicle,
                vehiclesArray.length
              )}`}
          {' '}of {vehiclesArray.length} vehicles
        </span>
      </div>
    </div>
  );
};

export default SystemActivityLog;
