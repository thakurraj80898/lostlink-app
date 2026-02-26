import Link from "next/link";
import { mockLostItems } from "@/lib/mockData";

export default function BrowseLost() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Browse Lost Items</h1>
      <div className="mb-6 flex gap-4">
        <input type="text" placeholder="Search items..." className="flex-1 px-4 py-2 border rounded-md" />
        <select className="px-4 py-2 border rounded-md">
          <option value="">All Categories</option>
          <option value="Wallet">Wallet</option>
          <option value="Phone">Phone</option>
          <option value="Keys">Keys</option>
          <option value="Bag">Bag</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockLostItems.map((item) => (
          <Link key={item.id} href={`/item/${item.id}`} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">LOST</span>
              <h3 className="font-semibold mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500 mt-1">{item.location}</p>
              <p className="text-xs text-gray-400 mt-1">{item.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
