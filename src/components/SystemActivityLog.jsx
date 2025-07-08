import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleStore } from '../store/store';
import { pendingApprovals } from '../assets/DummyData';

const SystemActivityLog = () => {
  const navigate = useNavigate();

  // Zustand store
  const vehicles = vehicleStore((state) => state.vehicles);
  const setVehicles = vehicleStore((state) => state.setVehicles);
  const setCurrentVehicle = vehicleStore((state) => state.setCurrentVehicle);

  // On mount, load pendingApprovals
  useEffect(() => {
    setVehicles(pendingApprovals);
  }, [setVehicles]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);
  const vehiclesPerPage = 5;

  const totalPages = Math.ceil((vehicles?.length || 0) / vehiclesPerPage);

  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = viewAll
    ? vehicles
    : vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

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
    switch (status?.toLowerCase()) {
      case 'success':
        return (
          <span className="px-2 py-1 rounded-full text-xs text-green-700 bg-green-100">
            Success
          </span>
        );
      case 'pending':
      case 'pending approval':
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

  const handleContinue = (vehicleIdLast4) => {
    const vehicle = vehicles.find(
      (v) => v.VechicleId?.slice(-4) === vehicleIdLast4
    );

    setCurrentVehicle(vehicle);
    navigate('/tests');
    console.log('Current Vehicle:', vehicle);
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
                VEHICLE ID (Last 4)
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
              <tr key={vehicle.BookingId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
                  {vehicle.VechicleId?.slice(-4)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {vehicle.VechicleType || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {vehicle.RegistrationNumber || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(vehicle.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() =>
                      handleContinue(vehicle.VechicleId?.slice(-4))
                    }
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Continue
                  </button>
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
            ? `1-${vehicles.length}`
            : `${indexOfFirstVehicle + 1}-${Math.min(
                indexOfLastVehicle,
                vehicles.length
              )}`}{' '}
          of {vehicles.length} vehicles
        </span>
      </div>
    </div>
  );
};

export default SystemActivityLog;
