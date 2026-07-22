import React from "react";
import Link from "next/link";


export function getLink(
  link?:
    | {
        text: string;
        href: string;
      }
    | React.ReactElement
) {
  if (!link) return <></>;

  if ("text" in link) {
    return (
      <Link prefetch={false} href={link.href}>
        {link.text}
      </Link>
    );
  }

  return link;
}

export function getIcon(
  type?: "close" | "announcement" | "success" | "favorite" | React.ReactElement
) {
  if (!type) return <></>;

  if (typeof type === "string") {
    switch (type) {
      case "close":
        return <AlertClose />;
      case "announcement":
        return <IconAnnouncement />;
      case "success":
        return <IconVerify />;
      case "favorite":
        return <IconFavorite />;
      default:
        return <></>;
    }
  } else {
    return type;
  }
}

const IconAnnouncement = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="11"
      viewBox="0 0 12 11"
      fill="none"
    >
      <path
        d="M2.5 5.00001L9.50002 2V9.00002L2.5 7.00001V5.00001Z"
        stroke="white"
        strokeWidth="0.500001"
        strokeLinejoin="round"
      />
      <path
        d="M1 5.25C1 4.83579 1.33579 4.5 1.75 4.5V4.5C2.16422 4.5 2.5 4.83579 2.5 5.25V6.75001C2.5 7.16422 2.16422 7.50001 1.75 7.50001V7.50001C1.33579 7.50001 1 7.16422 1 6.75001V5.25Z"
        stroke="white"
        strokeWidth="0.500001"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 1.75C9.5 1.33579 9.83579 1 10.25 1V1C10.6642 1 11 1.33579 11 1.75V9.25003C11 9.66424 10.6642 10 10.25 10V10C9.83579 10 9.5 9.66424 9.5 9.25002V1.75Z"
        stroke="white"
        strokeWidth="0.500001"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 7.5V9C4.25 9.55229 4.69772 10 5.25 10H6.00001C6.55229 10 7.00001 9.55229 7.00001 9V8.25"
        stroke="white"
        strokeWidth="0.500001"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IconVerify = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M2.47266 6.00001L4.97266 8.50001L9.97268 3.5"
        stroke="white"
        strokeWidth="0.750002"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AlertClose = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon/close">
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.26519 3.26517C9.41163 3.11872 9.41163 2.88128 9.26519 2.73484C9.11874 2.58839 8.8813 2.58839 8.73485 2.73484L6.00001 5.46968L3.26517 2.73484C3.11872 2.58839 2.88128 2.58839 2.73484 2.73484C2.58839 2.88128 2.58839 3.11872 2.73484 3.26517L5.46968 6.00001L2.73484 8.73485C2.58839 8.8813 2.58839 9.11874 2.73484 9.26519C2.88128 9.41163 3.11872 9.41163 3.26517 9.26519L6.00001 6.53034L8.73485 9.26519C8.8813 9.41163 9.11874 9.41163 9.26519 9.26519C9.41163 9.11874 9.41163 8.8813 9.26519 8.73485L6.53034 6.00001L9.26519 3.26517Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

const IconFavorite = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
    >
      <path
        d="M9.40079 5.80005L10.6704 7.65258L12.8246 8.2876L11.4551 10.0675L11.5168 12.3125L9.40079 11.5601L7.28476 12.3125L7.3465 10.0675L5.97698 8.2876L8.13117 7.65258L9.40079 5.80005Z"
        stroke="white"
        strokeWidth="0.750002"
        strokeLinejoin="round"
      />
      <path
        d="M11.2008 7.60016V3.40015H2.80078V11.2002H7.30079"
        stroke="white"
        strokeWidth="0.750002"
        strokeLinejoin="round"
      />
      <path
        d="M2.80001 3.40001L1 1"
        stroke="white"
        strokeWidth="0.750002"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 3.40001L13 1"
        stroke="white"
        strokeWidth="0.750002"
        strokeLinejoin="round"
      />
    </svg>
  );
};
