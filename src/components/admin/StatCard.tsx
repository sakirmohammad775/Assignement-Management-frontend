import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  href: string;
  description: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  href,
  description,
}: StatCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-rose-50 p-3 text-[#6b1d2f]">
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-slate-300 transition group-hover:text-indigo-500"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </Link>
  );
}