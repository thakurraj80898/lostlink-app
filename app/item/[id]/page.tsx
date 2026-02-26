"use client";

import { mockLostItems, mockFoundItems } from "@/lib/mockData";

export default function ItemDetail({ params }: { params: { id: string } }) {
  const allItems = [...mockLostItems, ...mockFoundItems];
  const item = allItems.find(i => i.id === parseInt(params.id));

  if (!item) return <div className="text-center py-12">Item not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-96 object-cover" />
        <div className="p-6">
          <span className={`text-xs px-3 py-1 rounded ${item.status === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {item.status.toUpperCase()}
          </span>
          <h1 className="text-3xl font-bold mt-4">{item.title}</h1>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-gray-500">Category</p>
              <p className="font-semibold">{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold">{item.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{item.date}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-500">Description</p>
            <p className="mt-2">{item.description}</p>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold">
            Claim This Item
          </button>
        </div>
      </div>
    </div>
  );
}
