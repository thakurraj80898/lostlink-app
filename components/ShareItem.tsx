"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface ShareItemProps {
  itemId: string;
  itemTitle: string;
}

export default function ShareItem({ itemId, itemTitle }: ShareItemProps) {
  const [qrCode, setQrCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const publicLink = `${window.location.origin}/public/lost/${itemId}`;

  useEffect(() => {
    QRCode.toDataURL(publicLink, { width: 300 }).then(setQrCode);
  }, [publicLink]);

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    alert("Link copied!");
  };

  const shareWhatsApp = () => {
    const text = `I lost my ${itemTitle}. If you find it, please report here: ${publicLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:scale-105 transition-transform font-semibold"
      >
        📱 Share & Get QR
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Share Your Lost Item
            </h2>
            
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-4">Anyone can scan this QR code or use the link to report if they find your item!</p>
              {qrCode && <img src={qrCode} alt="QR Code" className="mx-auto border-4 border-indigo-100 rounded-xl" />}
            </div>

            <div className="space-y-3">
              <button
                onClick={copyLink}
                className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
              >
                📋 Copy Link
              </button>
              
              <button
                onClick={shareWhatsApp}
                className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
              >
                💬 Share on WhatsApp
              </button>

              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = qrCode;
                  link.download = `${itemTitle}-QR.png`;
                  link.click();
                }}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
              >
                ⬇️ Download QR Code
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
