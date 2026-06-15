import { IIconsTypes } from "@/types/iconTypes";

const SpinnerIcon = ({
  size = 200,
  color,
  theme = "light",
  filter,
  ...props
}: IIconsTypes) => {
  const resolvedColor = color ?? (theme === "dark" ? "#000000" : "#ffffff");

  const delays = [
    "-0.9166666666666666s",
    "-0.8333333333333334s",
    "-0.75s",
    "-0.6666666666666666s",
    "-0.5833333333333334s",
    "-0.5s",
    "-0.4166666666666667s",
    "-0.3333333333333333s",
    "-0.25s",
    "-0.16666666666666666s",
    "-0.08333333333333333s",
    "0s",
  ];

  const rotations = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter,
        ...props.style,
        ...{
          margin: "auto",
          background: "rgba(255,255,255,0)",
          shapeRendering: "auto",
        },
      }}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      {rotations.map((rotation, i) => (
        <g key={i} transform={`rotate(${rotation} 50 50)`}>
          <rect
            x="47"
            y="24"
            rx="3"
            ry="6"
            width="6"
            height="12"
            fill={resolvedColor}
          >
            <animate
              attributeName="opacity"
              values="1;0"
              keyTimes="0;1"
              dur="1s"
              begin={delays[i]}
              repeatCount="indefinite"
            />
          </rect>
        </g>
      ))}
    </svg>
  );
};

export default SpinnerIcon;
