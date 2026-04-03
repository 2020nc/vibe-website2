'use client'

export default function CoffeeLoader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex items-center justify-center w-full h-full" style={{ minHeight: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Se încarcă..."
        role="img"
      >
        {/* Farfurioară */}
        <ellipse cx="24" cy="38" rx="14" ry="3" fill="#D4A96A" opacity="0.4"/>

        {/* Ceașcă */}
        <path d="M12 20 Q12 36 24 36 Q36 36 36 20 Z" fill="#C8956C"/>
        <path d="M12 20 H36" stroke="#A0724A" strokeWidth="1.5"/>

        {/* Toartă */}
        <path d="M36 22 Q44 22 44 28 Q44 34 36 34"
          stroke="#A0724A" strokeWidth="2" fill="none"
          strokeLinecap="round"/>

        {/* Cafea în ceașcă — nivel care crește */}
        <clipPath id="cupClip">
          <path d="M12 20 Q12 36 24 36 Q36 36 36 20 Z"/>
        </clipPath>
        <rect x="12" y="20" width="24" height="16" fill="#6B3F1F"
          clipPath="url(#cupClip)" opacity="0.85">
          <animate attributeName="y" values="36;20" dur="1.4s"
            repeatCount="indefinite" calcMode="ease-in-out"/>
          <animate attributeName="height" values="0;16" dur="1.4s"
            repeatCount="indefinite" calcMode="ease-in-out"/>
        </rect>

        {/* Abur */}
        <g opacity="0.6">
          <path d="M20 16 Q21 13 20 10" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0s"/>
          </path>
          <path d="M24 14 Q25 11 24 8" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0.4s"/>
          </path>
          <path d="M28 16 Q29 13 28 10" stroke="#9CA3AF" strokeWidth="1.5"
            strokeLinecap="round" fill="none">
            <animate attributeName="opacity" values="0;0.7;0" dur="1.8s"
              repeatCount="indefinite" begin="0.8s"/>
          </path>
        </g>
      </svg>
    </div>
  )
}
