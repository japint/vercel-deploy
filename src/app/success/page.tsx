"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [showConfetti, setShowConfetti] = useState(true);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 5000);

    const confettiTimeout = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
      clearTimeout(confettiTimeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-800 relative overflow-hidden">
      {showConfetti && (
        <Confetti width={width} height={height} numberOfPieces={300} />
      )}

      <div className="p-8 rounded-lg shadow-lg bg-white text-center animate-fade-in z-10">
        <h1 className="text-3xl font-bold mb-4">🎉 Submission Successful!</h1>
        <p className="text-lg">Thank you for submitting your event details.</p>
        <p className="text-sm mt-2">
          We’ll contact you if we need anything else.
        </p>
        <p className="text-sm mt-4 text-gray-500">
          Redirecting in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>

        <button
          onClick={() => router.push("/")}
          className="mt-6 inline-block px-5 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          Back to Homepage Now
        </button>
      </div>
    </div>
  );
}
