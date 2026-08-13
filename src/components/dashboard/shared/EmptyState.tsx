interface EmptyStateProps {
  message: string;
}

export default function EmptyState({
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg bg-slate-50 p-8 text-center">
      <p className="text-sm text-slate-500">
        {message}
      </p>
    </div>
  );
}