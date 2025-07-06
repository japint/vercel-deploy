import React from "react";
import { Select } from "../../ui/Select";
import { Input } from "../../ui/Input";
import { FormData } from "../../../types/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export const PartyTypeStep: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Event Type</h2>

      <Select
        label="What type of event is this?"
        labelClassName="text-gray-800 font-medium"
        name="partyType"
        value={formData.partyType}
        onChange={handleChange}
        options={[
          { value: "wedding", label: "Wedding" },
          { value: "birthday", label: "Birthday Party" },
          { value: "christening", label: "Christening" },
          { value: "other", label: "Other Celebration" },
        ]}
        selectClassName="text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        optionClassName="text-gray-900 bg-white"
      />

      {formData.partyType === "other" && (
        <Input
          label="Please specify:"
          labelClassName="text-gray-800 font-medium"
          inputClassName="text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="otherPartyType"
          value={formData.otherPartyType || ""}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
