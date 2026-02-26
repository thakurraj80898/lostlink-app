"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import ShareItem from "@/components/ShareItem";

export default function MyReports() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyReports();
  }, []);

  const fetchMyReports = async () => {
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      const [lostRes, foundRes] = await Promise.all([
        axios.get("http://localhost:5000/api/lost", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
        axios.get("http://localhost:5000/api/found", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
      ]);

      const allItems = [
        ...lostRes.data.items.map((item: any) => ({ ...item, type: 'lost' })),
        ...foundRes.data.items.map((item: any) => ({ ...item, type: 'found' })),
      ];
      
      setItems(allItems);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">No reports yet. Report a lost or found item!</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
              {item.images && item.images[0] && (
                <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded" />
              )}
              <div className="flex-1">
                <span className={`text-xs px-2 py-1 rounded ${item.type === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {item.type.toUpperCase()}
                </span>
                <h3 className="font-semibold mt-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location} • {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col gap-2">
                {item.type === 'lost' && <ShareItem itemId={item.id} itemTitle={item.title} />}
                <Link href={`/item/${item.id}`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm text-center">View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
