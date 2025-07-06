"use client";

import { useRouter } from "next/navigation";
import { PartyTypeStep } from "../components/form/steps/PartTypeStep";
import { BasicDetailsStep } from "../components/form/steps/BasicDetailsStep";
import { StylePreferencesStep } from "../components/form/steps/StylePreferencesStep";
import { MediaStep } from "../components/form/steps/MediaStep";
import { RSVPStep } from "../components/form/steps/RSVPStep";
import { ExtrasStep } from "../components/form/steps/ExtraStep";
import { ReviewStep } from "../components/form/steps/ReviewStep";
import { FormProgress } from "../components/form/FormProgress";
import { Button } from "../components/ui/Button";
import { FormData } from "../types/form";
import { useState } from "react";

interface FormStep {
  id: number;
  name: string;
  component: React.ComponentType<{
    formData: FormData;
    handleChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    serverErrors: Record<string, string | string[] | undefined>;
  }>;
}

const STEPS: FormStep[] = [
  { id: 1, name: "Event Type", component: PartyTypeStep },
  { id: 2, name: "Basic Details", component: BasicDetailsStep },
  { id: 3, name: "Style Preferences", component: StylePreferencesStep },
  { id: 4, name: "Media", component: MediaStep },
  { id: 5, name: "RSVP", component: RSVPStep },
  { id: 6, name: "Extras", component: ExtrasStep },
  { id: 7, name: "Review", component: ReviewStep },
];

export default function Home() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    partyType: "wedding",
    names: "",
    date: "",
    time: "",
    venue: "",
    venueAddress: "",
    events: [],
    theme: "",
    colors: "",
    fonts: "",
    mainMessage: "",
    countdown: false,
    hasPhotos: false,
    backgroundMedia: "",
    backgroundMediaType: "none",
    music: false,
    rsvp: false,
    rsvpFields: [],
    rsvpDestination: "email",
    registryLink: "",
    accommodationInfo: "",
    dressCode: "",
    faq: "",
    customDomain: "",
    privacy: "public",
  });

  const [serverErrors] = useState<
    Record<string, string | string[] | undefined>
  >({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => {
      const currentValue = prev[name as keyof FormData];
      const arrayValue = Array.isArray(currentValue) ? currentValue : [];

      if (checked) {
        return {
          ...prev,
          [name]: [...arrayValue, value],
        };
      } else {
        return {
          ...prev,
          [name]: arrayValue.filter((item) => item !== value),
        };
      }
    });
  };

  const nextStep = () => {
    if (step < STEPS.length) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        throw new Error("Configuration error. Please contact support.");
      }

      let retryCount = 0;
      const maxRetries = 3;

      while (retryCount < maxRetries) {
        if (
          typeof window.grecaptcha !== "undefined" &&
          window.grecaptcha.ready
        ) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        retryCount++;
      }

      if (
        typeof window.grecaptcha === "undefined" ||
        !window.grecaptcha.ready
      ) {
        throw new Error(
          "Security service unavailable. Please refresh the page and try again."
        );
      }

      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(() => {
          setTimeout(() => {
            window.grecaptcha
              .execute(siteKey, { action: "submit_form" })
              .then((token: string) => {
                if (!token || token.length < 20) {
                  reject(new Error("Invalid reCAPTCHA token received"));
                } else {
                  resolve(token);
                }
              })
              .catch((error: Error) => {
                console.error("reCAPTCHA execute error:", error);
                reject(new Error("Failed to complete security verification"));
              });
          }, 100);
        });
      });

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...formData, recaptchaToken: token }),
      });

      if (response.status === 405) {
        throw new Error(
          "Form submission is currently unavailable. Please try again later."
        );
      }

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            `Submission failed (HTTP ${response.status})`
        );
      }

      router.push("/success");
    } catch (error) {
      console.error("Submission error:", error);
      const message =
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please check your connection and try again.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CurrentStepComponent = STEPS.find((s) => s.id === step)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-gray-50">
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-primary-100 p-6 text-gray-900">
            <h1 className="text-3xl font-bold text-center">
              {formData.partyType === "wedding"
                ? "Wedding"
                : formData.partyType === "birthday"
                ? "Birthday"
                : formData.partyType === "christening"
                ? "Christening"
                : "Event"}{" "}
              Website Creator
            </h1>
            <p className="text-center text-gray-700 mt-2">
              Step {step} of {STEPS.length}:{" "}
              {STEPS.find((s) => s.id === step)?.name}
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <FormProgress currentStep={step} totalSteps={STEPS.length} />

            <div className="my-8 animate-fade-in">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  formData={formData}
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange}
                  serverErrors={serverErrors}
                />
              )}
            </div>

            <div className="flex justify-between mt-8 border-t pt-6">
              {step > 1 && (
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </Button>
              )}

              {step < STEPS.length ? (
                <Button
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-2"
                >
                  Next
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  className="ml-auto bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Submit & Create Website
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
