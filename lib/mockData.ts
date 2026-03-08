export const mockLostItems = [
  { id: 1, title: "Black Leather Wallet", category: "Wallet", location: "Central Park", date: "2024-01-15", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop", description: "Black leather wallet with cards inside", status: "lost" },
  { id: 2, title: "iPhone 13 Pro", category: "Phone", location: "Coffee Shop", date: "2024-01-14", image: "https://images.unsplash.com/photo-1592286927505-4fd30c87f9ce?w=300&h=200&fit=crop", description: "Blue iPhone 13 Pro", status: "lost" },
  { id: 3, title: "Silver Watch", category: "Watch", location: "Gym", date: "2024-01-13", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop", description: "Silver Casio watch", status: "lost" },
  { id: 4, title: "Car Keys", category: "Keys", location: "Mall", date: "2024-01-12", image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=300&h=200&fit=crop", description: "Toyota car keys with red keychain", status: "lost" },
];

export const mockFoundItems = [
  { id: 5, title: "Brown Backpack", category: "Bag", location: "Library", date: "2024-01-15", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop", description: "Brown backpack with laptop inside", status: "found" },
  { id: 6, title: "Gold Ring", category: "Jewelry", location: "Beach", date: "2024-01-14", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop", description: "Gold ring with diamond", status: "found" },
  { id: 7, title: "Blue Umbrella", category: "Other", location: "Bus Stop", date: "2024-01-13", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop", description: "Blue folding umbrella", status: "found" },
  { id: 8, title: "Passport", category: "Document", location: "Airport", date: "2024-01-12", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=200&fit=crop", description: "US Passport", status: "found" },
];

export const mockMatchRequests = [
  { id: 1, itemTitle: "Black Leather Wallet", requester: "John Doe", date: "2024-01-16", status: "pending" },
  { id: 2, itemTitle: "iPhone 13 Pro", requester: "Jane Smith", date: "2024-01-15", status: "approved" },
  { id: 3, itemTitle: "Silver Watch", requester: "Bob Johnson", date: "2024-01-14", status: "rejected" },
];
