interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const styles: Record<string, string> = {
    PUBLISHED:
      "bg-green-100 text-green-700",

    DRAFT:
      "bg-slate-100 text-slate-600",

    SUBMITTED:
      "bg-blue-100 text-blue-700",

    GRADED:
      "bg-green-100 text-green-700",

    LATE:
      "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}