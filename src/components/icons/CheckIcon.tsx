import { IIconsTypes } from "@/types/iconTypes";

export const CheckIcon = ({ className, filter }: IIconsTypes) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter }}
    >
      <g id="Icon/Check">
        <path
          id="Check"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.56083 13.887L17.3175 3.99274C17.7024 3.60242 18.3264 3.60242 18.7113 3.99274C19.0962 4.38306 19.0962 5.01589 18.7113 5.40621L8.25773 16.0073C7.87284 16.3976 7.24881 16.3976 6.86392 16.0073L1.28867 10.3534C0.903777 9.96305 0.903777 9.33021 1.28867 8.93989C1.67356 8.54957 2.29759 8.54957 2.68248 8.93989L7.56083 13.887Z"
          fill="#16AD88"
        />
      </g>
    </svg>
  );
};