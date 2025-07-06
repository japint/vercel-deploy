import React, { useState } from "react";
import { FormData } from "../../../types/form";
import { EVENT_OPTIONS } from "../../../constants/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  serverErrors?: { [key: string]: string };
};

export const BasicDetailsStep: React.FC<Props> = ({
  formData,
  handleChange,
  handleCheckboxChange,
  serverErrors = {},
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getNamesLabel = () => {
    switch (formData.partyType) {
      case "wedding":
        return "Names of the couple";
      case "birthday":
        return "Name of the birthday person";
      case "christening":
        return "Child's name and parents' names";
      default:
        return "Names of the honorees";
    }
  };

  // Client-side validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.names.trim()) newErrors.names = "This field is required.";
    if (!formData.date) newErrors.date = "Please select a date.";
    if (!formData.time) newErrors.time = "Please select a time.";
    if (!formData.venue.trim()) newErrors.venue = "Venue name is required.";
    if (!formData.venueAddress.trim())
      newErrors.venueAddress = "Venue address is required.";
    if (!formData.events || formData.events.length === 0)
      newErrors.events = "Select at least one event type.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Merge client and server errors for display
  const mergedErrors = { ...errors, ...serverErrors };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">Basic Details</h2>

      {/* Names */}
      <div>
        <label className="block font-medium text-gray-900 mb-1">
          {getNamesLabel()}
        </label>
        <input
          className={`w-full border rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            mergedErrors.names ? "border-red-500" : "border-gray-300"
          }`}
          name="names"
          value={formData.names}
          onChange={handleChange}
          placeholder="e.g., Jane & John"
          onBlur={validate}
        />
        {mergedErrors.names && (
          <div className="text-red-500 text-sm mt-1">{mergedErrors.names}</div>
        )}
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium text-gray-900 mb-1">Date</label>
          <input
            type="date"
            className={`w-full border rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              mergedErrors.date ? "border-red-500" : "border-gray-300"
            }`}
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={validate}
          />
          {mergedErrors.date && (
            <div className="text-red-500 text-sm mt-1">{mergedErrors.date}</div>
          )}
        </div>
        <div>
          <label className="block font-medium text-gray-900 mb-1">Time</label>
          <input
            type="time"
            className={`w-full border rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              mergedErrors.time ? "border-red-500" : "border-gray-300"
            }`}
            name="time"
            value={formData.time}
            onChange={handleChange}
            onBlur={validate}
          />
          {mergedErrors.time && (
            <div className="text-red-500 text-sm mt-1">{mergedErrors.time}</div>
          )}
        </div>
      </div>

      {/* Venue Name */}
      <div>
        <label className="block font-medium text-gray-900 mb-1">
          Venue Name
        </label>
        <input
          className={`w-full border rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            mergedErrors.venue ? "border-red-500" : "border-gray-300"
          }`}
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="e.g., Grand Ballroom"
          onBlur={validate}
        />
        {mergedErrors.venue && (
          <div className="text-red-500 text-sm mt-1">{mergedErrors.venue}</div>
        )}
      </div>

      {/* Venue Address */}
      <div>
        <label className="block font-medium text-gray-900 mb-1">
          Venue Address
        </label>
        <textarea
          className={`w-full border rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            mergedErrors.venueAddress ? "border-red-500" : "border-gray-300"
          }`}
          name="venueAddress"
          value={formData.venueAddress}
          onChange={handleChange}
          placeholder="Full address for maps"
          onBlur={validate}
        />
        {mergedErrors.venueAddress && (
          <div className="text-red-500 text-sm mt-1">
            {mergedErrors.venueAddress}
          </div>
        )}
      </div>

      {/* Event Types */}
      <div>
        <label className="block font-medium text-gray-900 mb-1">
          Event Type(s)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {EVENT_OPTIONS.map((event) => (
            <label key={event} className="flex items-center gap-2">
              <input
                type="checkbox"
                name="events"
                value={event}
                checked={formData.events.includes(event)}
                onChange={handleCheckboxChange}
                className="accent-blue-600 w-4 h-4"
              />
              <span className="text-gray-900">{event}</span>
            </label>
          ))}
        </div>
        {mergedErrors.events && (
          <div className="text-red-500 text-sm mt-1">{mergedErrors.events}</div>
        )}
      </div>
    </div>
  );
};
