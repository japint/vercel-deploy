import React from "react";
import { Input } from "../../ui/Input";
import { Checkbox } from "../../ui/Checkbox";
import { RadioGroup } from "../../ui/RadioGroup";
import { FormData } from "../../../types/form";
import { RSVP_FIELD_OPTIONS, RSVP_DESTINATIONS } from "../../../constants/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RSVPStep: React.FC<Props> = ({
  formData,
  handleChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">RSVP Details</h2>

      <Checkbox
        label="Include RSVP form on the website"
        name="rsvp"
        checked={formData.rsvp}
        onChange={handleChange}
      />

      {formData.rsvp && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              RSVP Form Fields
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RSVP_FIELD_OPTIONS.map((field) => (
                <Checkbox
                  key={field}
                  label={field}
                  name="rsvpFields"
                  value={field}
                  checked={formData.rsvpFields.includes(field)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </div>

          <RadioGroup
            label="RSVP Destination"
            name="rsvpDestination"
            value={formData.rsvpDestination}
            options={RSVP_DESTINATIONS}
            onChange={handleChange}
          />

          {formData.rsvpDestination === "email" && (
            <Input
              label="Email for RSVPs"
              name="rsvpEmail"
              type="email"
              value={formData.rsvpEmail || ""}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          )}

          <Input
            label="RSVP Deadline (optional)"
            name="rsvpDeadline"
            type="date"
            value={formData.rsvpDeadline || ""}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};
