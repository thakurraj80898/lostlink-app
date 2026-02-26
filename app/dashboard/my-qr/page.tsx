"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useAuth } from "@/contexts/AuthContext";

export default function MyQRCode() {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState("");
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "If you find my item, please contact me!",
  });

  useEffect(() => {
    if (user) {
      setContactInfo(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (user) generateQR();
  }, [contactInfo, user]);

  const generateQR = () => {
    const contactLink = `${window.location.origin}/contact/${user?.id}?name=${encodeURIComponent(contactInfo.name)}&email=${encodeURIComponent(contactInfo.email)}&phone=${encodeURIComponent(contactInfo.phone)}&message=${encodeURIComponent(contactInfo.message)}`;
    QRCode.toDataURL(contactLink, { width: 400, margin: 2 }).then(setQrCode);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = `${contactInfo.name}-Contact-QR.png`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        My Personal QR Code
      </h1>
      
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-6">
        <p className="text-gray-700 mb-4">
          🏷️ Print this QR code and stick it on your belongings (laptop, bag, phone case, etc.)
        </p>
        <p className="text-gray-700">
          📱 If someone finds your item, they can scan the QR code and contact you directly - no app needed!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4">Customize Your Contact Info</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Your Name</label>
              <input
                type="text"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone (Optional)</label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Custom Message</label>
              <textarea
                value={contactInfo.message}
                onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
          <h2 className="text-xl font-bold mb-4">Your QR Code</h2>
          
          {qrCode && (
            <div className="mb-6">
              <div className="inline-block p-4 bg-white border-4 border-indigo-200 rounded-2xl">
                <img src={qrCode} alt="Personal QR Code" className="w-full max-w-sm mx-auto" />
              </div>
              <p className="text-sm text-gray-600 mt-4">Scan to contact {contactInfo.name}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={downloadQR}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              ⬇️ Download QR Code
            </button>
            
            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg font-bold hover:scale-105 transition-transform"
            >
              🖨️ Print QR Code
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg text-left">
            <p className="text-sm font-semibold text-yellow-800 mb-2">💡 Pro Tips:</p>
            <ul className="text-xs text-yellow-700 space-y-1">
              <li>• Print on waterproof sticker paper</li>
              <li>• Stick on laptop, bag, phone case</li>
              <li>• Use lamination for durability</li>
              <li>• Add "Reward if found" text below QR</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
