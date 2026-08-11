import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp, undistorted vector emblem */}
      <div className={`rounded-xl bg-white p-0.5 shadow-md flex items-center justify-center shrink-0 aspect-square overflow-hidden ${sizeClasses[size]}`}>
        <img
          src="/logo.svg"
          alt="משה שטרן - נאומים, תוכן והנחייה"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>

      {showText && (
        <div className="text-right leading-tight">
          <div className="font-black text-xl tracking-tight text-white font-['Assistant']">
            משה שטרן
          </div>
          <div className="text-[10px] sm:text-xs text-white/90 font-medium tracking-wide">
            נאומים, תוכן והנחייה
          </div>
        </div>
      )}
    </div>
  );
};
