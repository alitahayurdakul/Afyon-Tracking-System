export const ErrorIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      // preserveAspectRatio="none"
    >
      <g id="Icon/Exclamation mark">
        <path
          id="Exclamation mark"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.5 19C8.67157 19 8 18.3284 8 17.5C8 16.6716 8.67157 16 9.5 16C10.3284 16 11 16.6716 11 17.5C11 18.3284 10.3284 19 9.5 19ZM8 1H11V11L10.25 14H8.75L8 11V1Z"
          fill="#ED8E7A"
        />
      </g>
    </svg>
  );
};
