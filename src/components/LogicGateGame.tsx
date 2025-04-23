
import React, { useState, useEffect, useCallback } from "react";
import FallingGate from "./FallingGate";
import KeyboardControl from "./KeyboardControl";
import { LogicGateType } from "./LogicGateIcon";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface GameGate {
  id: number;
  type: LogicGateType;
  position: number;
  y: number;
  speed: number;
  active: boolean;
  hit: boolean;
}

const GAME_SPEED_BASE = 0.5;
const SCORE_INCREMENT = 10;
const MISS_PENALTY = 5;
const GAME_HEIGHT = 80; // % of container height

const LogicGateGame: React.FC = () => {
  const [gates, setGates] = useState<GameGate[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [nextGateId, setNextGateId] = useState(1);
  const [lastKeyPressed, setLastKeyPressed] = useState<LogicGateType | null>(null);
  
  const startGame = useCallback(() => {
    setGates([]);
    setScore(0);
    setLevel(1);
    setIsGameOver(false);
    setIsPlaying(true);
    setLastKeyPressed(null);
  }, []);
  
  const gameOver = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    toast(`Game Over! Your score: ${score}`);
  }, [score]);

  // Generate a new gate
  const generateGate = useCallback(() => {
    const gateTypes: LogicGateType[] = ["AND", "OR", "NOT", "XOR", "NAND", "NOR", "XNOR"];
    const randomType = gateTypes[Math.floor(Math.random() * gateTypes.length)];
    const randomPosition = 10 + Math.random() * 80; // Between 10-90% of screen width
    const speed = GAME_SPEED_BASE * (1 + level * 0.1); // Increase speed with level
    
    const newGate: GameGate = {
      id: nextGateId,
      type: randomType,
      position: randomPosition,
      y: 0,
      speed,
      active: false,
      hit: false,
    };
    
    setNextGateId(prev => prev + 1);
    setGates(prev => [...prev, newGate]);
  }, [level, nextGateId]);

  // Move gates downward
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setGates(prevGates => 
        prevGates
          .map(gate => ({
            ...gate,
            y: gate.y + gate.speed,
          }))
          .filter(gate => {
            if (gate.y > GAME_HEIGHT && !gate.hit) {
              // Gate has fallen out of play area and wasn't hit
              setScore(s => Math.max(0, s - MISS_PENALTY));
              toast.error(`Missed ${gate.type}! -${MISS_PENALTY} points`);
              return false;
            }
            return gate.y <= GAME_HEIGHT || gate.hit;
          })
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Generate new gates
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      if (gates.length < level + 2) { // Limit max gates on screen based on level
        generateGate();
      }
    }, 2000 - (level * 100)); // Faster generation at higher levels
    
    return () => clearInterval(interval);
  }, [isPlaying, level, generateGate, gates.length]);

  // Level up based on score
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      toast.success(`Level up! Now level ${newLevel}`);
    }
  }, [score, level]);

  // Check for game over when too many gates are missed
  useEffect(() => {
    if (score < 0 && isPlaying) {
      gameOver();
    }
  }, [score, isPlaying, gameOver]);

  // Handle keyboard input
  const handleKeyPress = useCallback((pressedGateType: LogicGateType) => {
    if (!isPlaying || isGameOver) return;
    
    setLastKeyPressed(pressedGateType);
    setTimeout(() => setLastKeyPressed(null), 300);
    
    let hitGate = false;
    let lowestMatchingGate: GameGate | null = null;
    let lowestY = -1;
    
    // Find the lowest matching gate that hasn't been hit
    gates.forEach(gate => {
      if (gate.type === pressedGateType && !gate.hit && gate.y > lowestY) {
        lowestMatchingGate = gate;
        lowestY = gate.y;
      }
    });
    
    if (lowestMatchingGate) {
      hitGate = true;
      
      // Mark the gate as hit
      setGates(prevGates => 
        prevGates.map(gate => 
          gate.id === lowestMatchingGate?.id ? { ...gate, active: true, hit: true } : gate
        )
      );
      
      // Award points based on how early/late the hit was
      let pointsAwarded = SCORE_INCREMENT;
      if (lowestY < GAME_HEIGHT * 0.3) {
        pointsAwarded += 5; // Early hit bonus
      }
      
      setScore(prev => prev + pointsAwarded);
      toast.success(`Hit ${pressedGateType}! +${pointsAwarded} points`);
      
      // Remove hit gates after animation
      setTimeout(() => {
        setGates(prevGates => 
          prevGates.filter(gate => gate.id !== lowestMatchingGate?.id)
        );
      }, 500);
    } else {
      // Wrong key penalty
      setScore(prev => Math.max(0, prev - MISS_PENALTY));
      toast.error(`Wrong key! -${MISS_PENALTY} points`);
    }
  }, [isPlaying, isGameOver, gates]);

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[70vh] bg-gray-900 rounded-lg overflow-hidden border-4 border-purple-500 shadow-lg">
      {/* Game container */}
      <div className="absolute inset-0">
        {gates.map(gate => (
          <FallingGate
            key={gate.id}
            type={gate.type}
            position={gate.position}
            y={gate.y}
            speed={gate.speed}
            isActive={gate.active}
            hit={gate.hit}
          />
        ))}
      </div>
      
      {/* Controls */}
      <KeyboardControl onKeyPress={handleKeyPress} />
      
      {/* Key press indicator */}
      {lastKeyPressed && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-purple-500 font-bold opacity-50">
          {lastKeyPressed}
        </div>
      )}
      
      {/* HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-purple-900 bg-opacity-80 px-4 py-2 rounded-full text-white font-bold">
          Score: {score}
        </div>
        <div className="bg-purple-900 bg-opacity-80 px-4 py-2 rounded-full text-white font-bold">
          Level: {level}
        </div>
      </div>
      
      {/* Start/Game Over screen */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            {isGameOver ? "Game Over!" : "Logic Gate Challenge"}
          </h2>
          
          {isGameOver && (
            <div className="text-2xl text-purple-300 mb-8">
              Final Score: {score}
            </div>
          )}
          
          <div className="mb-8 text-white text-center max-w-md">
            <p className="mb-4">Press these keys to match falling logic gates:</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">A</span> for AND</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">O</span> for OR</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">N</span> for NOT</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">X</span> for XOR</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">D</span> for NAND</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">R</span> for NOR</div>
              <div><span className="bg-purple-700 px-3 py-1 rounded mr-2 font-mono">Z</span> for XNOR</div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            onClick={startGame}
            className="bg-purple-600 hover:bg-purple-700 text-xl py-6 px-8"
          >
            {isGameOver ? "Play Again" : "Start Game"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LogicGateGame;
