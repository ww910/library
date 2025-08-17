import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  onPickerChange: (color: string) => void;
  value?: string;
}

export default function ColorPicker({ onPickerChange, value }: ColorPickerProps) {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput color={value} onChange={onPickerChange} className="hex-input" />
      </div>
      <HexColorPicker
        color={value}
        onChange={onPickerChange}
      />
    </div>


  );
}
