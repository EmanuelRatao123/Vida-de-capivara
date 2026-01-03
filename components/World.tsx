import React, { useMemo } from 'react';
import { FoodItem } from '../types';

interface WorldProps {
  width: number;
  height: number;
  food: FoodItem[];
}

export const World: React.FC<WorldProps> = ({ width, height, food }) => {
  // Generate random decorative elements (flowers, rocks) only once
  const decorations = useMemo(() => {
    const items = [];
    for (let i = 0; i < 15; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 60, // Keep decorations mostly on grass
        type: Math.random() > 0.7 ? 'ROCK' : 'FLOWER',
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grass Area */}
      <div className="absolute top-0 left-0 w-full h-[70%] bg-[#C5E1A5] transition-colors duration-1000">
        {/* Pattern overlay for grass texture */}
        <div className="w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#AED581 15%, transparent 16%)', backgroundSize: '20px 20px' }}></div>
      </div>

      {/* Water Area */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] bg-[#4FC3F7] border-t-8 border-[#B3E5FC]">
         <div className="w-full h-full opacity-30 animate-pulse" style={{ backgroundImage: 'linear-gradient(45deg, #29B6F6 25%, transparent 25%, transparent 50%, #29B6F6 50%, #29B6F6 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Decorations */}
      {decorations.map((d) => (
        <div
          key={d.id}
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: `scale(${d.scale})`,
          }}
        >
          {d.type === 'FLOWER' ? (
            <span className="text-xl">🌼</span>
          ) : (
            <span className="text-xl text-stone-600">🪨</span>
          )}
        </div>
      ))}

      {/* Food Items */}
      {food.map((f) => (
        <div
          key={f.id}
          className="absolute transition-all duration-300 animate-bounce"
          style={{
            left: f.x,
            top: f.y,
            width: '32px',
            height: '32px',
            transform: 'translate(-50%, -50%)', // Center anchor
          }}
        >
          <span className="text-3xl drop-shadow-md">
            {f.type === 'ORANGE' ? '🍊' : '🍉'}
          </span>
        </div>
      ))}
    </div>
  );
};
