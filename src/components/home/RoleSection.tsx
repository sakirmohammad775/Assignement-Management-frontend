import {
  GraduationCap,
  ShieldCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const roles = [
  {
    icon: ShieldCheck,
    title: "For Administrators",
    description:
      "Manage users, teachers, students, classes, subjects and monitor the entire academic system.",
    features: [
      "Manage users",
      "Assign teachers to classes",
      "Manage students",
      "Manage subjects",
    ],
  },
  {
    icon: GraduationCap,
    title: "For Teachers",
    description:
      "Create assignments, publish them to your classes, review submissions and provide feedback.",
    features: [
      "Create assignments",
      "Manage classes",
      "Review submissions",
      "Grade and give feedback",
    ],
  },
  {
    icon: Users,
    title: "For Students",
    description:
      "View your assignments, submit answers before deadlines and track your academic progress.",
    features: [
      "View assignments",
      "Submit answers",
      "Track submissions",
      "Receive feedback",
    ],
  },
];

export default function RoleSection() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Built for everyone
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            One platform. Three powerful experiences.
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            EduAssign gives administrators, teachers and students the tools
            they need to manage the complete assignment workflow.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {role.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {role.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {role.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  Get started
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}