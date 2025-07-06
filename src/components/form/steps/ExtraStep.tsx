import React from "react";
import { Input } from "../../ui/Input";
import { RadioGroup } from "../../ui/RadioGroup";
import { Textarea } from "../../ui/TextArea";
import { FormData } from "../../../types/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

export const ExtrasStep: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Additional Information
      </h2>

      <Input
        label="Gift Registry URL (optional)"
        name="registryLink"
        type="url"
        value={formData.registryLink}
        onChange={handleChange}
        placeholder="https://..."
      />

      <Textarea
        label="Accommodation Information (optional)"
        name="accommodationInfo"
        value={formData.accommodationInfo}
        onChange={handleChange}
        placeholder="Hotel options, room blocks, etc."
        rows={3}
      />

      <Input
        label="Dress Code (optional)"
        name="dressCode"
        value={formData.dressCode}
        onChange={handleChange}
        placeholder="e.g., Black Tie, Casual, etc."
      />

      <Textarea
        label="FAQs (optional)"
        name="faq"
        value={formData.faq}
        onChange={handleChange}
        placeholder="Common questions and answers"
        rows={4}
      />

      <Input
        label="Custom Domain (optional)"
        name="customDomain"
        value={formData.customDomain}
        onChange={handleChange}
        placeholder="e.g., johnandjane2025.com"
        helperText="You'll need to configure DNS settings separately"
      />

      <RadioGroup
        label="Website Privacy"
        name="privacy"
        value={formData.privacy}
        options={[
          { value: "public", label: "Public - Anyone can view" },
          { value: "password-protected", label: "Password Protected" },
        ]}
        onChange={handleChange}
      />

      {formData.privacy === "password-protected" && (
        <Input
          label="Website Password"
          name="password"
          type="password"
          value={formData.password || ""}
          onChange={handleChange}
        />
      )}
    </div>
  );
};
