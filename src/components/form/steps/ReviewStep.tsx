import React from "react";
import { FormData } from "../../../types/form";
import {
  EVENT_OPTIONS,
  THEME_OPTIONS,
  FONT_OPTIONS,
} from "../../../constants/form";

type Props = {
  formData: FormData;
};

export const ReviewStep: React.FC<Props> = ({ formData }) => {
  const getEventNames = () => {
    return EVENT_OPTIONS.filter((event) => formData.events.includes(event));
  };

  const getThemeName = () => {
    return (
      THEME_OPTIONS.find((theme) => theme === formData.theme) || "Not specified"
    );
  };

  const getFontName = () => {
    return (
      FONT_OPTIONS.find((font) => font === formData.fonts) || "Not specified"
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Review Your Information
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Basic Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Event Type</p>
            <p className="font-medium">
              {formData.partyType === "other"
                ? formData.otherPartyType
                : formData.partyType}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Names</p>
            <p className="font-medium">{formData.names || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Date & Time</p>
            <p className="font-medium">
              {formData.date
                ? `${formData.date} at ${formData.time || "--:--"}`
                : "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Venue</p>
            <p className="font-medium">{formData.venue || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Event Types</p>
            <p className="font-medium">
              {getEventNames().length > 0
                ? getEventNames().join(", ")
                : "Not specified"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Style Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Theme</p>
            <p className="font-medium">{getThemeName()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Color Palette</p>
            <p className="font-medium">{formData.colors || "Not specified"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Font Style</p>
            <p className="font-medium">{getFontName()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Countdown Timer</p>
            <p className="font-medium">{formData.countdown ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Additional Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">RSVP Form</p>
            <p className="font-medium">{formData.rsvp ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Website Privacy</p>
            <p className="font-medium">
              {formData.privacy === "password-protected"
                ? "Password Protected"
                : "Public"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Custom Domain</p>
            <p className="font-medium">
              {formData.customDomain || "Not specified"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
