// vendorData.js
export const vendorData = [
  {
    id: "1001",
    name: "Desmond, Elliot",
    email: "desmond.elliot@example.com",
    initials: "DE",
    avatar: null,
    type: "mechanic",
    company: null,
    location: "Lagos, Nigeria",
    city: "Lagos",
    state: "Lagos State",
    regDate: "2025-03-24",
    currentState: "ACTIVE",
    status: "Verified",
  },
  {
    id: "1002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    initials: "JS",
    avatar: null,
    type: "dealer",
    company: "Auto Parts Ltd",
    location: "Abuja, Nigeria",
    city: "Abuja",
    state: "FCT",
    regDate: "2025-02-15",
    currentState: "INACTIVE",
    status: "Unverified",
  },
  {
    id: "1003",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    initials: "MJ",
    avatar: null,
    type: "mechanic",
    company: "Fix It Workshop",
    location: "Port Harcourt, Nigeria",
    city: "Port Harcourt",
    state: "Rivers State",
    regDate: "2025-01-10",
    currentState: "BANNED",
    status: "Verified",
  },
  // Add more vendor data as needed
];

// Get unique cities and states for filtering
export const getUniqueCities = () => {
  return [...new Set(vendorData.map((vendor) => vendor.city))];
};

export const getUniqueStates = () => {
  return [...new Set(vendorData.map((vendor) => vendor.state))];
};
