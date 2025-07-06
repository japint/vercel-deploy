import React from "react";
import { Input } from "../../ui/Input";
import { Checkbox } from "../../ui/Checkbox";
import { RadioGroup } from "../../ui/RadioGroup";
import { FormData } from "../../../types/form";
import { BACKGROUND_MEDIA_TYPES } from "../../../constants/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

export const MediaStep: React.FC<Props> = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">Media</h2>

      <Checkbox
        label="Do you have photos to include on the website?"
        name="hasPhotos"
        checked={formData.hasPhotos}
        onChange={handleChange}
      />

      <RadioGroup
        label="Background media type"
        name="backgroundMediaType"
        value={formData.backgroundMediaType}
        options={BACKGROUND_MEDIA_TYPES}
        onChange={handleChange}
      />

      {(formData.backgroundMediaType === "image" ||
        formData.backgroundMediaType === "video") && (
        <Input
          label={`${
            formData.backgroundMediaType === "image" ? "Image" : "Video"
          } URL`}
          name="backgroundMedia"
          value={formData.backgroundMedia}
          onChange={handleChange}
          placeholder={`Paste ${formData.backgroundMediaType} URL here`}
          helperText={`For ${
            formData.backgroundMediaType === "image" ? "images" : "videos"
          }, use high-quality URLs from services like Unsplash or YouTube`}
        />
      )}

      <Checkbox
        label="Include background music on the website"
        name="music"
        checked={formData.music}
        onChange={handleChange}
      />

      {formData.music && (
        <Input
          label="Music file URL"
          name="musicFile"
          value={formData.musicFile || ""}
          onChange={handleChange}
          placeholder="Paste audio file URL"
          helperText="Use a direct link to an MP3 file or embed from services like SoundCloud"
        />
      )}
    </div>
  );
};
