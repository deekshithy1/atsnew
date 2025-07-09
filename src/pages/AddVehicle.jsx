import React, { useState } from 'react'

const AddVehicle = () => {
    const [formData,setformData]=useState({bookingId,regnNo,engineNo,chassisNo});
  return (
    <div>
    <label htmlFor="">
        Booking ID:  
        <input type="text" name='bookingId' value={formData.bookingId} />
    </label>
    <label htmlFor="Regn Number">
        Registration
        <input type="text" name="regnNo" id=""  value={formData.regnNo}/>
    </label>
    <label htmlFor="">
        Engine Numeber
        <input type="text" name="engineNo" id=""  value={formData.engineNo}/>
    </label>
        <label htmlFor="">
           Chasis Number
           <input type="text" name="chassisNo" id="" value={formData.chassisNo} />
        </label>
    </div>
  )
}

export default AddVehicle


// import mongoose from "mongoose";


// const vehicleSchema = new mongoose.Schema(
//   {
//     bookingId: { type: String, required: true, unique: true },
//     regnNo: { type: String, required: true },
//     engineNo: { type: String, required: true },
//     chassisNo: { type: String, required: true },
//     atsCenter: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "ATSCenter",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "APPROVED"],
//       default: "PENDING",
//     },
//     laneEntryTime: { type: Date },
//     laneExitTime: { type: Date },
//     photos: {
//       imgFront: String,
//       imgLeft: String,
//       imgRight: String,
//       imgEngine: String,
//       imgChassis: String,
//     },
//   },
//   { timestamps: true }
// );

// const Vehicle = mongoose.model("Vehicle", vehicleSchema);
// export default Vehicle;

