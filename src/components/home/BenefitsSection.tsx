import {
  Clock3,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  Workflow,
} from "lucide-react";

const benefits = [
  {
    icon: LayoutDashboard,
    title: "Centralized Dashboard",
    description:
      "Keep assignments, submissions, classes and academic activity organized in one place.",
  },
  {
    icon: Workflow,
    title: "Simple Workflow",
    description:
      "Create, publish, submit, review and grade assignments through one clear workflow.",
  },
  {
    icon: Clock3,
    title: "Save Time",
    description:
      "Reduce manual assignment tracking and spend more time focused on teaching and learning.",
  },
  {
    icon: MessageSquareText,
    title: "Better Feedback",
    description:
      "Teachers can provide marks and meaningful feedback directly through submissions.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Administrators, teachers and students only access the features relevant to their role.",
  },
  {
    icon: Smartphone,
    title: "Responsive Experience",
    description:
      "Access the platform comfortably across desktop, tablet and mobile devices.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Why EduAssign
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything in one place
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            Designed to make academic assignment management simpler,
            faster and more organized.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Icon size={20} />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}