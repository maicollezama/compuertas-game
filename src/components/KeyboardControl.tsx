
import React, { useEffect } from "react";
import { LogicGateType } from "./LogicGateIcon";

interface KeyboardControlProps {
  onKeyPress: (gateType: LogicGateType) => void;
}

const keyMap: Record<string, LogicGateType> = {
  "a": "AND",
  "o": "OR", 
  "n": "NOT",
  "x": "XOR",
  "d": "NAND",
  "r": "NOR",
  "z": "XNOR"
};

export const KeyboardControl: React.FC<KeyboardControlProps> = ({ onKeyPress }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keyMap[key]) {
        e.preventDefault(); // Prevent default browser actions
        onKeyPress(keyMap[key]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  return (
    <div className="hidden">
      {/* Hidden component, just for keyboard control */}
      {Object.entries(keyMap).map(([key, gate]) => (
        <span key={key} data-key={key} data-gate={gate}></span>
      ))}
    </div>
  );
};

export default KeyboardControl;
