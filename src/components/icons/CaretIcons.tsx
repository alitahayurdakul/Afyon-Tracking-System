import React from "react";

export const CaretDownIcon = ({ width = 10, height = 11, color = "#BCBFC2", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 10 11"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.06087 6.93822L8.5254 3.23065C8.69965 3.04421 8.98217 3.04421 9.15642 3.23065C9.33067 3.4171 9.33067 3.71939 9.15642 3.90583L5.37638 7.95099C5.20213 8.13743 4.91962 8.13743 4.74536 7.95099L0.965325 3.90583C0.791075 3.71939 0.791075 3.4171 0.965325 3.23065C1.13958 3.04421 1.42209 3.04421 1.59634 3.23065L5.06087 6.93822Z"
      fill={color}
    />
  </svg>
);

export const CaretUpIcon = ({ width = 10, height = 11, color = "#BCBFC2", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 10 11"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.06087 6.93822L8.5254 3.23065C8.69965 3.04421 8.98217 3.04421 9.15642 3.23065C9.33067 3.4171 9.33067 3.71939 9.15642 3.90583L5.37638 7.95099C5.20213 8.13743 4.91962 8.13743 4.74536 7.95099L0.965325 3.90583C0.791075 3.71939 0.791075 3.4171 0.965325 3.23065C1.13958 3.04421 1.42209 3.04421 1.59634 3.23065L5.06087 6.93822Z"
      fill={color}
      transform="rotate(180 5 5.5)"
    />
  </svg>
);

// Default export: combined demo
export default function CaretIcons() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 24 }}>
      <CaretDownIcon />
      <CaretUpIcon />
    </div>
  );
}