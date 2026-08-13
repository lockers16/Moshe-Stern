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
  const boxSizeClasses = {
    sm: 'p-1 rounded-lg',
    md: 'p-1.5 rounded-xl',
    lg: 'p-2 rounded-xl',
    xl: 'p-2.5 rounded-2xl',
  };

  const sizeClasses = {
    sm: 'h-7 sm:h-8',
    md: 'h-8 sm:h-9',
    lg: 'h-10 sm:h-12',
    xl: 'h-14 sm:h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className={`bg-white shadow-xs flex items-center justify-center shrink-0 border border-white/20 ${boxSizeClasses[size]}`}>
        <img
          src="/logo.png"
          alt="משה שטרן - נאומים, תוכן והנחייה"
          className={`${sizeClasses[size]} w-auto object-contain shrink-0`}
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

