// Sample enhanced transaction data with additional details
export const enhancedTransactionData = [
  {
    id: "968ab1a8-a8a9-44da-b700-daaf91308cc8",
    amount: 20000,
    status: "cancelled",
    createdAt: "2023-12-18T09:32:37.561Z",
    client: {
      id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
      firstname: "James",
      lastname: "Brown",
      profileImageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
      role: "user",
      address: "#5 some address",
      lga: "Khana",
      city: "Bori",
      state: "Rivers",
      phone: "+234 812 345 6789",
      email: "james.brown@example.com",
    },
    vendor: {
      id: "f311937e-767c-4f2b-bbad-4e9b9947f68b",
      firstname: "Dorcas",
      lastname: "Etim",
      profileImageUrl:
        "https://images.unsplash.com/photo-1579538506280-84e461ad0077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
      role: "dealer",
      address: "16 Waxwing Circle",
      lga: "Abua/Odual",
      city: "Abonnema",
      state: "Rivers",
      phone: "+234 803 987 6543",
      email: "dorcas.etim@example.com",
      businessName: "AutoParts Plus",
    },
    payment: {
      clientAmount: 20000,
      platformFee: 2000,
      vendorAmount: 18000,
      paymentMethod: "Card Payment",
      transactionReference: "TRX-20231218-12345",
    },
    products: [
      {
        id: "prod-001",
        name: "Front Bumper - Toyota Camry 2020",
        description: "OEM replacement front bumper for Toyota Camry 2020 model",
        quantity: 1,
        unitPrice: 15000,
        totalPrice: 15000,
      },
      {
        id: "prod-002",
        name: "Headlight Assembly",
        description: "Right side headlight assembly with LED lights",
        quantity: 1,
        unitPrice: 5000,
        totalPrice: 5000,
      },
    ],
    cancellationReason: "Client requested cancellation",
    timeline: [
      {
        status: "created",
        timestamp: "2023-12-18T09:30:00.000Z",
        description: "Order created",
      },
      {
        status: "processing",
        timestamp: "2023-12-18T09:31:00.000Z",
        description: "Payment processing",
      },
      {
        status: "cancelled",
        timestamp: "2023-12-18T09:32:37.561Z",
        description: "Order cancelled by client",
      },
    ],
  },
  {
    id: "acca608a-e642-4e6e-a43f-fd6213b833b1",
    amount: 29000,
    status: "cancelled",
    createdAt: "2023-12-18T00:00:23.036Z",
    client: {
      id: "fd8ae0c1-93e5-43b1-98c3-f6667614257d",
      firstname: "James",
      lastname: "Brown",
      profileImageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
      role: "user",
      address: "#5 some address",
      lga: "Khana",
      city: "Bori",
      state: "Rivers",
      phone: "+234 812 345 6789",
      email: "james.brown@example.com",
    },
    vendor: {
      id: "fd4f91b6-6c7b-4771-beb0-1c74347f8c07",
      firstname: "Rita",
      lastname: "Dennis",
      profileImageUrl:
        "https://images.unsplash.com/photo-1521252659862-eec69941b071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDUyMDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTU2MzEyMjB8&ixlib=rb-4.0.3&q=80&w=400",
      role: "mechanic",
      address: "22403 Kings Junction",
      lga: "Andoni",
      city: "Abonnema",
      state: "Rivers",
      phone: "+234 705 123 4567",
      email: "rita.dennis@example.com",
      businessName: "Rita's Auto Repair",
    },
    payment: {
      clientAmount: 29000,
      platformFee: 2900,
      vendorAmount: 26100,
      paymentMethod: "Bank Transfer",
      transactionReference: "TRX-20231218-67890",
    },
    services: [
      {
        id: "serv-001",
        name: "Full Engine Service",
        description:
          "Complete engine service including oil change and filter replacement",
        price: 15000,
      },
      {
        id: "serv-002",
        name: "Brake System Inspection",
        description: "Full inspection and adjustment of brake system",
        price: 8000,
      },
      {
        id: "serv-003",
        name: "Wheel Alignment",
        description: "Four-wheel alignment service",
        price: 6000,
      },
    ],
    appointment: {
      date: "2023-12-20",
      time: "10:00 AM",
      location: "Rita's Auto Repair Shop",
      notes: "Vehicle should be dropped off 30 minutes before appointment",
    },
    cancellationReason: "Mechanic unavailable on scheduled date",
    timeline: [
      {
        status: "created",
        timestamp: "2023-12-17T23:55:00.000Z",
        description: "Appointment booked",
      },
      {
        status: "processing",
        timestamp: "2023-12-17T23:57:00.000Z",
        description: "Payment processing",
      },
      {
        status: "payment_confirmed",
        timestamp: "2023-12-17T23:59:00.000Z",
        description: "Payment confirmed",
      },
      {
        status: "cancelled",
        timestamp: "2023-12-18T00:00:23.036Z",
        description: "Appointment cancelled by vendor",
      },
    ],
  },
];

// Helper function to get transaction by ID
export const getTransactionById = (id) => {
  return enhancedTransactionData.find((transaction) => transaction.id === id);
};

// Utility for formatting currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Utility for formatting dates
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
