// src/app/success/page.tsx

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 text-green-800">
      <div className="p-8 rounded-lg shadow-lg bg-white text-center">
        <h1 className="text-3xl font-bold mb-4">🎉 Submission Successful!</h1>
        <p className="text-lg">Thank you for submitting your event details.</p>
        <p className="text-sm mt-2">
          We’ll contact you if we need anything else.
        </p>
      </div>
    </div>
  );
}
