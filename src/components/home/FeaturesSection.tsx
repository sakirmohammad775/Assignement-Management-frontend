import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "Assignment Management",
    description:
      "Teachers can create, publish and manage assignments in one place.",
  },
  {
    icon: BookOpen,
    title: "Easy Submissions",
    description:
      "Students can view assignments and submit their answers before deadlines.",
  },
  {
    icon: CheckCircle2,
    title: "Review & Feedback",
    description:
      "Teachers can review submissions, assign marks and provide feedback.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-y border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Features
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            Everything needed to manage assignments
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            A simple platform that connects teachers, students and
            administrators in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Icon size={22} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}