"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function PublicLostItemPage() {
  const params = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    finderName: "",
    finderEmail: "",
    finderPhone: "",
    location: "",
    message: "",
  });

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/public/lost/${params.id}`);
      setItem(data);
    } catch (error) {
      console.error("Failed to fetch item");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/public/lost/${params.id}/found`, formData);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit. Please try again.");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!item) return <div className="min-h-screen flex items-center justify-center">Item not found</div>;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
          <p className="text-gray-600 text-lg">
            The owner has been notified. They will contact you soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Did You Find This Item?</h1>
            <p className="text-indigo-100">Help reunite it with the owner!</p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Lost Item Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {item.images && item.images[0] && (
                  <img src={item.images[0]} alt={item.title} className="w-full h-64 object-cover rounded-xl" />
                )}
                <div>
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Last Seen:</strong> {item.location}</p>
                    <p><strong>Date Lost:</strong> {new Date(item.dateLost).toLocaleDateString()}</p>
                    <p><strong>Owner:</strong> {item.user.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Report That You Found It</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.finderName}
                    onChange={(e) => setFormData({ ...formData, finderName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.finderEmail}
                    onChange={(e) => setFormData({ ...formData, finderEmail: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Your Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.finderPhone}
                    onChange={(e) => setFormData({ ...formData, finderPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Where Did You Find It? *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Additional Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  ✅ Yes, I Found This Item!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
