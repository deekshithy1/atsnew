const peddingApprovals = [
  {
    BookingId: 5003,
    status: "Pending Approval",
    VechicleId: "VH-2025-0741",
    VechicleType: "Passenger Bus",
    RegistrationNumber: "KA-01-AB-1234",
    TechnicianName: "John Doe",
    TestDate: "2025-01-15",
  },
  {
    BookingId: 5004,
    status: "Pending Approval",
    VechicleId: "VH-2025-0742",
    VechicleType: "Cargo Truck",
    RegistrationNumber: "KA-01-CD-5678",
    TechnicianName: "Jane Smith",
    TestDate: "2025-01-16",
  },
  {
    BookingId: 5005,
    status: "Pending Approval",
    VechicleId: "VH-2025-0743",
    VechicleType: "Passenger Car",
    RegistrationNumber: "KA-01-EF-9101",
    TechnicianName: "Alice Johnson",
    TestDate: "2025-01-17",
  },
  {
    BookingId: 5006,
    status: "Pending Approval",
    VechicleId: "VH-2025-0744",
    VechicleType: "Motorcycle",
    RegistrationNumber: "KA-01-GH-1121",
    TechnicianName: "Bob Brown",
    TestDate: "2025-01-18",
  },
  {
    BookingId: 5007,
    status: "Pending Approval",
    VechicleId: "VH-2025-0745",
    VechicleType: "Electric Scooter",
    RegistrationNumber: "KA-01-IJ-3141",
    TechnicianName: "Charlie Davis",
    TestDate: "2025-01-19",
  },
];

const temp = [
  {
    RegistrationNumber: "KA-01-AB-1234",
    Owner: "John Doe",
    TestDate: "2025-01-15",
    VechicleType: "Passenger Bus",
    Status: "Pending Approval",
    BookingId: 5003,
    testData: [
      {
        TestId: 1,
        TestName: "Brake Test",
        Result: "Passed",
      },
      {
        TestId: 2,
        TestName: "Emission Test",
        Result: "Passed",
      },
      {
        TestId: 3,
        TestName: "Safety Inspection",
        Result: "Passed",
      },
      {
        TestId: 4,
        TestName: "Tire Condition",
        Result: "Passed",
      },
      {
        TestId: 5,
        TestName: "Light Functionality",
        Result: "Passed",
      },
      {
        TestId: 6,
        TestName: "Fluid Levels",
        Result: "Passed",
      },
      {
        TestId: 7,
        TestName: "Steering Response",
        Result: "Passed",
      },
      {
        TestId: 8,
        TestName: "Suspension Check",
        Result: "Passed",
      },
    ],
  },
  {
    RegistrationNumber: "KA-01-CD-5678",
    Owner: "Jane Smith",
    TestDate: "2025-01-16",
    VechicleType: "Cargo Truck",
    Status: "Pending Approval",
    BookingId: 5004,
    testData: [
      {
        TestId: 1,
        TestName: "Brake Test",
        Result: "Passed",
      },
      {
        TestId: 2,
        TestName: "Emission Test",
        Result: "Passed",
      },
      {
        TestId: 3,
        TestName: "Safety Inspection",
        Result: "Passed",
      },
      {
        TestId: 4,
        TestName: "Tire Condition",
        Result: "Passed",
      },
      {
        TestId: 5,
        TestName: "Light Functionality",
        Result: "Passed",
      },
      {
        TestId: 6,
        TestName: "Fluid Levels",
        Result: "Passed",
      },
      {
        TestId: 7,
        TestName: "Steering Response",
        Result: "Passed",
      },
      {
        TestId: 8,
        TestName: "Suspension Check",
        Result: "Passed",
      },
    ],
  },
  {
    RegistrationNumber: "KA-01-EF-9101",
    Owner: "Alice Johnson",
    TestDate: "2025-01-17",
    VechicleType: "Passenger Car",
    Status: "Pending Approval",
    BookingId: 5005,
    testData: [
      {
        TestId: 1,
        TestName: "Brake Test",
        Result: "Passed",
      },
      {
        TestId: 2,
        TestName: "Emission Test",
        Result: "Passed",
      },
      {
        TestId: 3,
        TestName: "Safety Inspection",
        Result: "Passed",
      },
      {
        TestId: 4,
        TestName: "Tire Condition",
        Result: "Passed",
      },
      {
        TestId: 5,
        TestName: "Light Functionality",
        Result: "Passed",
      },
      {
        TestId: 6,
        TestName: "Fluid Levels",
        Result: "Passed",
      },
      {
        TestId: 7,
        TestName: "Steering Response",
        Result: "Passed",
      },
      {
        TestId: 8,
        TestName: "Suspension Check",
        Result: "Passed",
      },
    ],
  },
  {
    RegistrationNumber: "KA-01-GH-1121",
    Owner: "Bob Brown",
    TestDate: "2025-01-18",
    VechicleType: "Motorcycle",
    Status: "Pending Approval",
    BookingId: 5006,
    testData: [
      {
        TestId: 1,
        TestName: "Brake Test",
        Result: "Passed",
      },
      {
        TestId: 2,
        TestName: "Emission Test",
        Result: "Passed",
      },
      {
        TestId: 3,
        TestName: "Safety Inspection",
        Result: "Passed",
      },
      {
        TestId: 4,
        TestName: "Tire Condition",
        Result: "Passed",
      },
      {
        TestId: 5,
        TestName: "Light Functionality",
        Result: "Passed",
      },
      {
        TestId: 6,
        TestName: "Fluid Levels",
        Result: "Passed",
      },
      {
        TestId: 7,
        TestName: "Steering Response",
        Result: "Passed",
      },
      {
        TestId: 8,
        TestName: "Suspension Check",
        Result: "Passed",
      },
    ],
  },
  {
    RegistrationNumber: "KA-01-IJ-3141",
    Owner: "Charlie Davis",
    TestDate: "2025-01-19",
    VechicleType: "Electric Scooter",
    Status: "Pending Approval",
    BookingId: 5007,
    testData: [
      {
        TestId: 1,
        TestName: "Brake Test",
        Result: "Passed",
      },
      {
        TestId: 2,
        TestName: "Emission Test",
        Result: "Passed",
      },
      {
        TestId: 3,
        TestName: "Safety Inspection",
        Result: "Passed",
      },
      {
        TestId: 4,
        TestName: "Tire Condition",
        Result: "Passed",
      },
      {
        TestId: 5,
        TestName: "Light Functionality",
        Result: "Passed",
      },
      {
        TestId: 6,
        TestName: "Fluid Levels",
        Result: "Passed",
      },
    ],
  },
];

const vehicleData = [
  {
    id: "VH-2025-0742",
    type: "Commercial Truck",
    registration: "MH-04-AB-1234",
    owner: "Reliance Transport Ltd.",
    lastTest: "-",
    status: "Pending",
  },
  {
    id: "VH-2025-0741",
    type: "Passenger Bus",
    registration: "KA-01-CD-5678",
    owner: "Karnataka State Transport",
    lastTest: "July 1, 2025",
    status: "Completed",
  },
  {
    id: "VH-2025-0740",
    type: "Heavy Truck",
    registration: "DL-01-EF-9012",
    owner: "Northern Logistics Co.",
    lastTest: "June 28, 2025",
    status: "Failed",
  },
  {
    id: "VH-2025-0739",
    type: "School Bus",
    registration: "TN-05-GH-3456",
    owner: "St. Mary's School",
    lastTest: "In Progress",
    status: "In Progress",
  },
  {
    id: "VH-2025-0738",
    type: "Delivery Van",
    registration: "GJ-06-IJ-7890",
    owner: "QuickShip Couriers",
    lastTest: "June 25, 2025",
    status: "Approved",
  },
  {
    id: "VH-2025-0737",
    type: "Tanker Truck",
    registration: "MP-07-KL-1234",
    owner: "Central Petroleum Ltd.",
    lastTest: "June 22, 2025",
    status: "Approved",
  },
  // Add more dummy records for testing pagination
  ...Array.from({ length: 36 }, (_, i) => ({
    id: `VH-2025-07${i + 43}`,
    type: "Type " + (i + 1),
    registration: `XX-00-XX-${1000 + i}`,
    owner: `Owner ${i + 1}`,
    lastTest: "July 1, 2025",
    status: ["Pending", "Completed", "Failed", "Approved", "In Progress"][
      i % 5
    ],
  })),
];

export { peddingApprovals, vehicleData };
