import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeColors } from "./types";
import Image from "next/image";
import { getUserQrCode } from "../../apis/AuthApi";

interface QrCodeDisplayProps {
  themeColors: ThemeColors;
  theme: string;
}

const QrCodeDisplay: React.FC<QrCodeDisplayProps> = ({ themeColors, theme }) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { textColor } = themeColors;

  const toggleQrModal = () => {
    setIsQrModalOpen(!isQrModalOpen);
    
    // If opening the modal and we don't have a QR code yet, fetch it
    if (!isQrModalOpen && !qrCode) {
      fetchQrCode();
    }
  };

  // Initial load only on first mount
  useEffect(() => {
    let mounted = true;
    
    const loadInitialQrCode = async () => {
      try {
        setIsLoading(true);
        const qrCodeUrl = await getUserQrCode();
        // Only update state if component is still mounted
        if (mounted) {
          setQrCode(qrCodeUrl);
        }
      } catch (error) {
        if (mounted) {
          console.error("Error fetching QR code:", error);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    
    // Only fetch if we don't have a QR code already
    if (!qrCode) {
      loadInitialQrCode();
    }
    
    // Cleanup function to prevent state updates if unmounted
    return () => {
      mounted = false;
    };
  }, []);


  // Use either the fetched QR code or fall back to default
  const qrSrc = qrCode || "/images/others/qr.png";

  return (
    <>
      <div className="mt-4 flex flex-col items-center">
        <p className={`${textColor} text-xl font-medium mb-3`}>Event Badge</p>
        <div 
          className={`p-2 ${theme === "dark" ? "bg-white" : "bg-gray-200"} rounded-lg cursor-pointer transition-transform hover:scale-105`}
          onClick={toggleQrModal}
        >
          {isLoading ? (
            <div className="w-44 h-44 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <img
              src={qrSrc}
              alt="QR Code"
              className="w-44 h-44"
            />
          )}
        </div>
        <p className="text-sm text-center mt-2 text-gray-500">
          Click to expand
        </p>
      </div>

      <AnimatePresence>
        {isQrModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
            onClick={toggleQrModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white p-6 rounded-xl max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Your Event Badge</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  {isLoading ? (
                    <div className="w-full h-64 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <img
                      src={qrSrc}
                      alt="QR Code"
                      className="w-full h-auto"
                    />
                  )}
                </div>
                <p className="mt-4 text-gray-600 text-sm">
                  Present this QR code at the entrance or for workshop check-ins.
                </p>
                <button
                  onClick={toggleQrModal}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default QrCodeDisplay;