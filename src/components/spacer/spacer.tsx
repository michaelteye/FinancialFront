import React from 'react';

interface SpacerProps {
  className?: string;
}

export const Spacer: React.FC<SpacerProps> = ({ className = 'h-4' }) => {
  return <div className={`w-full ${className}`}></div>;
};
