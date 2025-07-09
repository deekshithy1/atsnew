import React, { useState } from 'react';

import { addVehicle } from '../api';
import { useAuthStore } from '../store/store';
import { useNavigate } from 'react-router-dom';
const AddVehicle = () => {
    const navigate=useNavigate();
  const [vehicleData, setVehicleData] = useState({
    bookingId: '',
    regnNo: '',
    engineNo: '',
    chassisNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const res = await addVehicle(vehicleData);
       console.log('Vehicle created:', res.data);
       if(res){alert("Vehicle Added Succcessfully");
        setVehicleData({
            bookingId: '',
            regnNo: '',
            engineNo: '',
            chassisNo: '',
          });
           navigate("/vehicles")
       }
      // Reset form
      
    } catch (error) {
      console.error(
        'Error adding vehicle:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="py-10 flex justify-center">
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Vehicle</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Booking ID
            </label>
            <input
              type="text"
              name="bookingId"
              value={vehicleData.bookingId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Registration Number
            </label>
            <input
              type="text"
              name="regnNo"
              value={vehicleData.regnNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Engine Number
            </label>
            <input
              type="text"
              name="engineNo"
              value={vehicleData.engineNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Chassis Number
            </label>
            <input
              type="text"
              name="chassisNo"
              value={vehicleData.chassisNo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
