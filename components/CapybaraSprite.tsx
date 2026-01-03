import React from 'react';
import { CapyState } from '../types';

interface CapybaraSpriteProps {
  state: CapyState;
  direction: 'left' | 'right';
}

export const CapybaraSprite: React.FC<CapybaraSpriteProps> = ({ state, direction }) => {
  const isSwimming = state === CapyState.SWIMMING;
  const isSleeping = state === CapyState.SLEEPING;
  
  // Transform for direction
  const transform = direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)';

  // Determine animation class
  let animationClass = "origin-bottom"; // Pivot point for animations
  if (state === CapyState.WALKING) animationClass += " animate-waddle";
  if (state === CapyState.SWIMMING) animationClass += " animate-swim";
  if (state === CapyState.EATING) animationClass += " animate-chew";
  if (state === CapyState.IDLE) animationClass += " animate-pulse"; // Slow breathing
  if (state === CapyState.MEDITATING) animationClass += " animate-pulse";

  return (
    <div className="relative w-24 h-24">
      {/* Direction Wrapper */}
      <div 
        className="w-full h-full transition-transform duration-200"
        style={{ transform }}
      >
        {/* Animation Wrapper */}
        <div className={`w-full h-full ${animationClass}`}>
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Shadow */}
            {!isSwimming && (
              <ellipse cx="50" cy="85" rx="35" ry="8" fill="rgba(0,0,0,0.2)" />
            )}

            {/* Back Legs */}
            {!isSwimming && !isSleeping && (
              <>
                <path d="M30 70 L30 90 A 2 2 0 0 0 35 90 L35 70" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
                <path d="M70 70 L70 90 A 2 2 0 0 0 75 90 L75 70" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" />
              </>
            )}

            {/* Body */}
            <path 
              d={isSleeping 
                ? "M20 60 Q 50 40 80 60 Q 90 70 80 85 Q 50 95 20 85 Q 10 70 20 60" 
                : "M20 50 Q 50 20 80 50 Q 90 60 80 80 Q 50 90 20 80 Q 10 60 20 50"} 
              fill="#8D6E63" 
              stroke="#5D4037" 
              strokeWidth="3"
            />

            {/* Head */}
            <g transform={isSleeping ? "translate(10, 10) rotate(10)" : "translate(0,0)"}>
              <rect x="65" y="30" width="30" height="35" rx="12" fill="#8D6E63" stroke="#5D4037" strokeWidth="3" />
              
              {/* Snout */}
              <path d="M85 45 L98 45 Q 100 50 98 55 L 85 55" fill="#6D4C41" />
              
              {/* Nose */}
              <circle cx="95" cy="48" r="2" fill="#3E2723" />
              
              {/* Eye */}
              {state === CapyState.MEDITATING || state === CapyState.SLEEPING ? (
                 <path d="M72 42 Q 76 45 80 42" stroke="#3E2723" strokeWidth="2" fill="none" />
              ) : (
                <circle cx="76" cy="42" r="3" fill="#3E2723" />
              )}

              {/* Ear */}
              <path d="M70 30 Q 72 20 78 30" fill="#6D4C41" stroke="#5D4037" strokeWidth="2" />
            </g>
            
            {/* Front Legs (only if not swimming/sleeping) */}
            {!isSwimming && !isSleeping && (
               <>
                <path d="M35 75 L35 92 A 2 2 0 0 0 40 92 L40 75" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" />
                <path d="M65 75 L65 92 A 2 2 0 0 0 70 92 L70 75" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" />
               </>
            )}

            {/* Water Ripples when Swimming */}
            {isSwimming && (
              <g>
                <path d="M10 80 Q 30 90 50 80 T 90 80" stroke="#81D4FA" strokeWidth="3" fill="none" opacity="0.8" />
                <path d="M0 85 Q 25 95 50 85 T 100 85" stroke="#4FC3F7" strokeWidth="3" fill="none" opacity="0.6" />
              </g>
            )}
          </svg>
        </div>
      </div>
      
      {/* State Indicators */}
      {state === CapyState.MEDITATING && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-spin-slow">✨</div>
      )}
      {state === CapyState.SLEEPING && (
        <div className="absolute -top-8 right-0 text-xl animate-bounce">Zzz</div>
      )}
    </div>
  );
};