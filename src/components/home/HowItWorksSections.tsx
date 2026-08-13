const steps = [
  {
    number: "01",
    title: "Create",
    description:
      "Teachers create assignments with instructions, deadlines and marks.",
  },
  {
    number: "02",
    title: "Publish",
    description:
      "Publish assignments so students in the assigned class can access them.",
  },
  {
    number: "03",
    title: "Submit",
    description:
      "Students submit their answers before the assignment deadline.",
  },
  {
    number: "04",
    title: "Review & Grade",
    description:
      "Teachers review submissions, assign marks and provide feedback.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Workflow
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-950">
            How EduAssign works
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            From creating an assignment to receiving feedback, everything
            happens in one simple workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden w-6 translate-x-full border-t border-dashed border-slate-300 md:block" />
              )}

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                {step.number}
              </div>

              <h3 className="mt-5 font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}