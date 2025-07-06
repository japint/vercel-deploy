import React from "react";
import { Select } from "../../ui/Select";
import { Checkbox } from "../../ui/Checkbox";
import { Textarea } from "../../ui/TextArea";
import { FormData } from "../../../types/form";
import {
  THEME_OPTIONS,
  FONT_OPTIONS,
  COLOR_PALETTES,
} from "../../../constants/form";

type Props = {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
};

export const StylePreferencesStep: React.FC<Props> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Style Preferences
      </h2>

      {/* Theme selection */}
      <div>
        <Select
          label="Overall theme/style"
          name="theme"
          value={formData.theme}
          onChange={handleChange}
          options={THEME_OPTIONS.map((theme) => ({
            value: theme,
            label: theme,
          }))}
        />
      </div>

      {/* Color palette selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-3">
          Color palette
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {COLOR_PALETTES.map((palette) => (
            <button
              type="button"
              key={palette.name}
              className={`flex flex-col items-center border-2 rounded-lg p-2 transition
                ${
                  formData.colors === palette.name
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200 hover:border-blue-300"
                } bg-white shadow-sm`}
              onClick={() =>
                handleChange({
                  target: {
                    name: "colors",
                    value: palette.name,
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              aria-pressed={formData.colors === palette.name}
              tabIndex={0}
            >
              <div className="flex h-8 w-20 rounded overflow-hidden mb-1 border">
                {palette.colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-700">{palette.name}</span>
              {formData.colors === palette.name && (
                <span className="mt-1 text-blue-600 text-xs font-semibold">
                  Selected
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font selection */}
      <div>
        <Select
          label="Font style"
          name="fonts"
          value={formData.fonts}
          onChange={handleChange}
          options={FONT_OPTIONS.map((font) => ({ value: font, label: font }))}
        />
      </div>

      {/* Main message */}
      <div>
        <Textarea
          label="Main message/intro"
          name="mainMessage"
          value={formData.mainMessage}
          onChange={handleChange}
          placeholder="e.g., 'Join us to celebrate our love'"
          rows={3}
        />
      </div>

      {/* Countdown */}
      <div className="flex items-center gap-2">
        <Checkbox
          label="Include countdown timer to the event date"
          name="countdown"
          checked={formData.countdown}
          onChange={handleChange}
        />
        <span className="text-sm text-gray-500">
          (Guests will see a live countdown)
        </span>
      </div>
    </div>
  );
};
