import { IIconsTypes } from "@/types/iconTypes";

export interface FileIconProps {
 
}

export function FileIcon({
   width = 14, height = 14, fill = "currentColor", filter, style, ...props 
}: IIconsTypes) {

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      style={{ filter, ...style }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 1L17 5V18C17 18.5523 16.5523 19 16 19H4C3.44772 19 3 18.5523 3 18V2C3 1.44772 3.44772 1 4 1H13ZM12 6V2H4V18H16V6H12Z"
        fill={fill}
      />
    </svg>
  );
}

export default FileIcon;
