import React, { useEffect, useState } from "react";
import { vehicleData } from "../assets/DummyData";
import {
  Eye,
  Edit,
  FileText,
  Play,
  RotateCcw,
} from "lucide-react";

const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Approved: "bg-emerald-100 text-emerald-700",
};

const ITEMS_PER_PAGE = 7;

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setVehicles(vehicleData);
    setFiltered(vehicleData);
  }, []);

  useEffect(() => {
    const filteredList = vehicles.filter((v) =>
      v.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(filteredList);
    setCurrentPage(1);
  }, [searchTerm, vehicles]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const pageStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleData = filtered.slice(
    pageStartIndex,
    pageStartIndex + ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle Management</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search vehicles..."
            className="border border-gray-300 px-4 py-2 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            + Add Vehicle
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-3">Vehicle ID</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Registration</th>
              <th className="px-5 py-3">Owner</th>
              <th className="px-5 py-3">Last Test</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {visibleData.map((vehicle) => (
              <tr
                key={vehicle.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-5 py-4 font-medium text-gray-900">{vehicle.id}</td>
                <td className="px-5 py-4">{vehicle.type}</td>
                <td className="px-5 py-4">{vehicle.registration}</td>
                <td className="px-5 py-4">{vehicle.owner}</td>
                <td className="px-5 py-4">{vehicle.lastTest || "-"}</td>
                <td className="px-5 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[vehicle.status]}`}
                  >
                    {vehicle.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <FileText className="h-4 w-4 cursor-pointer hover:text-gray-700" />
                    <Eye className="h-4 w-4 cursor-pointer hover:text-gray-700" />
                    <Edit className="h-4 w-4 cursor-pointer hover:text-gray-700" />
                    {vehicle.status === "In Progress" && (
                      <Play className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-700" />
                    )}
                    {vehicle.status === "Failed" && (
                      <RotateCcw className="h-4 w-4 cursor-pointer text-red-500 hover:text-red-700" />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-600 gap-4">
        <div>
          Showing {pageStartIndex + 1} to{" "}
          {Math.min(pageStartIndex + ITEMS_PER_PAGE, filtered.length)} of{" "}
          {filtered.length} results
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Previous
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md border ${
                page === currentPage
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
