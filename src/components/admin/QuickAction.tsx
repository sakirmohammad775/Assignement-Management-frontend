import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface QuickActionProps {
  href: string;
  label: string;
}

export default function QuickAction({
  href,
  label,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
    >
      {label}

      <ArrowUpRight size={16} />
    </Link>
  );
}