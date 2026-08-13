interface OverviewCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
}

export default function OverviewCard({
  label,
  value,
  icon: Icon,
}: OverviewCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <Icon
        size={20}
        className="text-slate-500"
      />

      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}