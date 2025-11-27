import React from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showText = true,
  size = "md",
}) => {
  const sizeClasses = {
    sm: {
      icon: "h-6 w-6",
      text: "text-lg",
      container: "gap-2",
    },
    md: {
      icon: "h-8 w-8",
      text: "text-2xl",
      container: "gap-3",
    },
    lg: {
      icon: "h-12 w-12",
      text: "text-4xl",
      container: "gap-4",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center ${currentSize.container} ${className}`}>
      {/* Minimalist Construction-Style Logo */}
      <svg
        className={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold/Bronze gradient inspired by construction logos */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#d4af37", stopOpacity: 1 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#f4c542", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#c9a961", stopOpacity: 1 }}
            />
          </linearGradient>

          {/* Darker accent */}
          <linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#b8932f", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8b6f1f", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Left Building - Stepped design */}
        <g>
          {/* Outer structure */}
          <path
            d="M 15 75 L 15 45 L 20 40 L 25 40 L 30 45 L 30 75 Z"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinejoin="miter"
          />
          {/* Inner lines for depth */}
          <line
            x1="20"
            y1="40"
            x2="20"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          <line
            x1="25"
            y1="40"
            x2="25"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          {/* Windows */}
          <rect
            x="17"
            y="50"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="24"
            y="50"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="17"
            y="60"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="24"
            y="60"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
        </g>

        {/* Center Building - Tallest, Letter T inspired */}
        <g>
          {/* Main vertical structure */}
          <path
            d="M 40 75 L 40 30 L 45 25 L 55 25 L 60 30 L 60 75 Z"
            stroke="url(#goldGradient)"
            strokeWidth="6"
            fill="none"
            strokeLinejoin="miter"
          />
          {/* Top horizontal cap (T shape) */}
          <path
            d="M 35 35 L 40 30 L 60 30 L 65 35"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="square"
          />
          {/* Vertical accent lines */}
          <line
            x1="45"
            y1="30"
            x2="45"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          <line
            x1="50"
            y1="25"
            x2="50"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3.5"
            opacity="0.8"
          />
          <line
            x1="55"
            y1="30"
            x2="55"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          {/* Windows/Details */}
          <rect
            x="45"
            y="40"
            width="10"
            height="8"
            fill="url(#goldGradient)"
            opacity="0.5"
          />
          <rect
            x="45"
            y="50"
            width="10"
            height="8"
            fill="url(#goldGradient)"
            opacity="0.5"
          />
          <rect
            x="45"
            y="60"
            width="10"
            height="8"
            fill="url(#goldGradient)"
            opacity="0.5"
          />
        </g>

        {/* Right Building - Medium height, modern design */}
        <g>
          {/* Outer frame */}
          <path
            d="M 70 75 L 70 40 L 73 37 L 77 37 L 80 40 L 85 40 L 85 75 Z"
            stroke="url(#goldGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinejoin="miter"
          />
          {/* Diagonal accent */}
          <line
            x1="75"
            y1="37"
            x2="75"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          <line
            x1="80"
            y1="40"
            x2="80"
            y2="75"
            stroke="url(#darkGold)"
            strokeWidth="3"
            opacity="0.6"
          />
          {/* Windows */}
          <rect
            x="71"
            y="45"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="79"
            y="45"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="71"
            y="55"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="79"
            y="55"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="71"
            y="65"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
          <rect
            x="79"
            y="65"
            width="6"
            height="7"
            fill="url(#goldGradient)"
            opacity="0.7"
          />
        </g>

        {/* Base/Foundation line */}
        <line
          x1="10"
          y1="75"
          x2="90"
          y2="75"
          stroke="url(#goldGradient)"
          strokeWidth="6"
          strokeLinecap="square"
        />

        {/* Ground shadow effect */}
        <line
          x1="10"
          y1="78"
          x2="90"
          y2="78"
          stroke="url(#darkGold)"
          strokeWidth="2"
          opacity="0.4"
        />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className={`${currentSize.text} font-bold bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent tracking-tight`}
          >
            T-ComplexOS
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-wide uppercase">
            Smart Building
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
