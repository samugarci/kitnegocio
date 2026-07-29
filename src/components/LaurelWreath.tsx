export default function LaurelWreath({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`text-brand ${flip ? 'scale-x-[-1]' : ''}`}
      aria-hidden="true"
    >
      <path
        d="M12 3C10 5 8 6 6 7C7 9 8 11 9 13C10 11 11 9 12 7C13 9 14 11 15 13C16 11 17 9 18 7C16 6 14 5 12 3Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M4 10C5 12 6 14 7 16C8 14 9 12 10 10C8 9 6 9 4 10Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M20 10C19 12 18 14 17 16C16 14 15 12 14 10C16 9 18 9 20 10Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}
