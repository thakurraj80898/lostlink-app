export const mockLostItems = [
  { id: 1, title: "Black Leather Wallet", category: "Wallet", location: "Central Park", date: "2024-01-15", image: "https://via.placeholder.com/300x200?text=Wallet", description: "Black leather wallet with cards inside", status: "lost" },
  { id: 2, title: "iPhone 13 Pro", category: "Phone", location: "Coffee Shop", date: "2024-01-14", image: "https://via.placeholder.com/300x200?text=Phone", description: "Blue iPhone 13 Pro", status: "lost" },
  { id: 3, title: "Silver Watch", category: "Watch", location: "Gym", date: "2024-01-13", image: "https://via.placeholder.com/300x200?text=Watch", description: "Silver Casio watch", status: "lost" },
  { id: 4, title: "Car Keys", category: "Keys", location: "Mall", date: "2024-01-12", image: "https://via.placeholder.com/300x200?text=Keys", description: "Toyota car keys with red keychain", status: "lost" },
];

export const mockFoundItems = [
  { id: 5, title: "Brown Backpack", category: "Bag", location: "Library", date: "2024-01-15", image: "https://via.placeholder.com/300x200?text=Backpack", description: "Brown backpack with laptop inside", status: "found" },
  { id: 6, title: "Gold Ring", category: "Jewelry", location: "Beach", date: "2024-01-14", image: "https://via.placeholder.com/300x200?text=Ring", description: "Gold ring with diamond", status: "found" },
  { id: 7, title: "Blue Umbrella", category: "Other", location: "Bus Stop", date: "2024-01-13", image: "https://via.placeholder.com/300x200?text=Umbrella", description: "Blue folding umbrella", status: "found" },
  { id: 8, title: "Passport", category: "Document", location: "Airport", date: "2024-01-12", image: "https://via.placeholder.com/300x200?text=Passport", description: "US Passport", status: "found" },
];

export const mockMatchRequests = [
  { id: 1, itemTitle: "Black Leather Wallet", requester: "John Doe", date: "2024-01-16", status: "pending" },
  { id: 2, itemTitle: "iPhone 13 Pro", requester: "Jane Smith", date: "2024-01-15", status: "approved" },
  { id: 3, itemTitle: "Silver Watch", requester: "Bob Johnson", date: "2024-01-14", status: "rejected" },
];
