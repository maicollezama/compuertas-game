
import React, { useEffect, useState } from "react";
import { LogicGateIcon, LogicGateType } from "./LogicGateIcon";
import { cn } from "@/lib/utils";

interface FallingGateProps {
  type: LogicGateType;
  position: number;
  speed: number;
  y: number;
  isActive?: boolean;
  hit?: boolean;
}

const FallingGate: React.FC<FallingGateProps> = ({ 
  type, 
  position, 
  y, 
  speed,
  isActive = false,
  hit = false
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (hit) {
      setIsAnimating(true);
    }
  }, [hit]);
  
  return (
    <div 
      className={cn(
        "absolute transition-all duration-200 gate-falling",
        isActive && "scale-110",
        hit && "gate-hit",
        !hit && !isActive && "gate-pulse"
      )}
      style={{ 
        left: `${position}%`, 
        top: `${y}%`, 
        transform: `translateX(-50%)`
      }}
    >
      <LogicGateIcon 
        type={type} 
        size={48} 
        className={cn(
          "filter",
          isActive ? "text-purple-400" : "text-gray-300"
        )}
      />
      <div className="text-xs mt-1 text-center text-white font-bold">
        {type}
      </div>
    </div>
  );
};

export default FallingGate;
