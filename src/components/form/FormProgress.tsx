import React from "react";

type FormProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${
                currentStep === step
                  ? "bg-blue-600 text-white"
                  : currentStep > step
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="text-center text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};
