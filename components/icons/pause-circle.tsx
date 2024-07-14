import React from "react";

export const PauseCircleIcon = ({
  size = 24,
  width,
  height,
  ...props
}: any) => (
  <svg
    width="40"
    stroke="#006FEE"
    height="40"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 28V16M26 28V16M42 22C42 33.0457 33.0457 42 22 42C10.9543 42 2 33.0457 2 22C2 10.9543 10.9543 2 22 2C33.0457 2 42 10.9543 42 22Z"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
