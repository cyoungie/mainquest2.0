/** MainQuest logo: MQ monogram in Stanford cardinal */
function Logo({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="#8C1515" />
      {/* M: classic form with valley at baseline */}
      <path d="M6 10L6 22L10 22L14 10L14 22Z" fill="white" />
      {/* Q */}
      <circle cx="22" cy="16" r="4.5" stroke="white" strokeWidth="1.5" fill="none" />
      <path d="M25 19l2.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default Logo;
