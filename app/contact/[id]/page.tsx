"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ContactOwner() {
  const searchParams = useSearchParams();
  const ownerName = searchParams.get("name") || "Owner";
  const ownerEmail = searchParams.get("email") || "";
  const ownerPhone = searchParams.get("phone") || "";
  const ownerMessage = searchParams.get("message") || "";
  
  const [submitted, setSubmitted] = useState(false);

  const handleEmail = () => {
    window.location.href = `mailto:${ownerEmail}?subject=Found Your Item&body=Hi ${ownerName}, I found your item. Please contact me.`;
  };

  const handleWhatsApp = () => {
    const phone = ownerPhone.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phone}?text=Hi ${ownerName}, I found your item!`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold text-indigo-600 mb-2">Found Something?</h1>
          <p className="text-gray-600">Contact the owner directly</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-lg mb-3">Owner Details:</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {ownerName}</p>
            {ownerEmail && <p><strong>Email:</strong> {ownerEmail}</p>}
            {ownerPhone && <p><strong>Phone:</strong> {ownerPhone}</p>}
          </div>
          {ownerMessage && (
            <div className="mt-4 p-3 bg-white rounded-lg">
              <p className="text-sm text-gray-700">{ownerMessage}</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {ownerEmail && (
            <button
              onClick={handleEmail}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              📧 Send Email
            </button>
          )}

          {ownerPhone && (
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              💬 WhatsApp
            </button>
          )}

          {ownerPhone && (
            <a
              href={`tel:${ownerPhone}`}
              className="block w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-bold hover:scale-105 transition-transform text-center"
            >
              📞 Call Now
            </a>
          )}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
          <p className="text-sm text-green-800">
            Thank you for being honest! 🙏<br/>
            You're making someone's day better!
          </p>
        </div>
      </div>
    </div>
  );
}
