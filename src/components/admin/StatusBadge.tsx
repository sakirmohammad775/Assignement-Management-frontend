interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const classes =
    status === "GRADED"
      ? "bg-green-100 text-green-700"
      : status === "LATE"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}