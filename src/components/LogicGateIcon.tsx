
import React from "react";
import { cn } from "@/lib/utils";

export type LogicGateType = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR" | "XNOR";

interface LogicGateIconProps {
  type: LogicGateType;
  size?: number;
  className?: string;
}

export const LogicGateIcon: React.FC<LogicGateIconProps> = ({ 
  type, 
  size = 24, 
  className 
}) => {
  const iconSize = size || 24;
  const strokeWidth = 2;
  
  const svgProps = {
    width: iconSize,
    height: iconSize,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor", 
    strokeWidth,
    strokeLinecap: "round" as "round",
    strokeLinejoin: "round" as "round",
    className: cn("transition-all duration-200", className)
  };

  switch (type) {
    case "AND":
      return (
        <svg {...svgProps}>
          <path d="M6 3v18" />
          <path d="M18 3h-7v18h7a5 5 0 0 0 0 -18z" />
        </svg>
      );
    case "OR":
      return (
        <svg {...svgProps}>
          <path d="M6 3a10 10 0 0 1 10 10 10 10 0 0 1 -10 10" />
          <path d="M6 3v18" />
        </svg>
      );
    case "NOT":
      return (
        <svg {...svgProps}>
          <path d="M4 3v18l12 -9z" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      );
    case "XOR":
      return (
        <svg {...svgProps}>
          <path d="M6 3a10 10 0 0 1 10 10 10 10 0 0 1 -10 10" />
          <path d="M6 3v18" />
          <path d="M3 3a10 10 0 0 0 0 18" />
        </svg>
      );
    case "NAND":
      return (
        <svg {...svgProps}>
          <path d="M6 3v18" />
          <path d="M18 3h-7v18h7a5 5 0 0 0 0 -18z" />
          <circle cx="21" cy="12" r="2" />
        </svg>
      );
    case "NOR":
      return (
        <svg {...svgProps}>
          <path d="M6 3a10 10 0 0 1 10 10 10 10 0 0 1 -10 10" />
          <path d="M6 3v18" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      );
    case "XNOR":
      return (
        <svg {...svgProps}>
          <path d="M6 3a10 10 0 0 1 10 10 10 10 0 0 1 -10 10" />
          <path d="M6 3v18" />
          <path d="M3 3a10 10 0 0 0 0 18" />
          <circle cx="21" cy="12" r="2" />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <path d="M6 3v18" />
          <path d="M18 3h-7v18h7a5 5 0 0 0 0 -18z" />
        </svg>
      );
  }
};
