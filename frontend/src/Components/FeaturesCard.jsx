export default function FeatureCard({
  title,
  description,
  Icon,
}) {
  return (
    <div className="group bg-zinc-900 border border-white/10 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2">

      <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
        <Icon size={34} className="text-cyan-400" />
      </div>

      <h2 className="text-white text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-gray-400 mt-4 leading-7">
        {description}
      </p>

      <button className="mt-8 text-cyan-400 font-semibold">
        Learn More →
      </button>

    </div>
  );
}