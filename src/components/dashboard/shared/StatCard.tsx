import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          )}
        </div>

        <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}