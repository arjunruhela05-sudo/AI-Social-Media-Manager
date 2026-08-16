export default function IntegrationCard({
  title,
  type,
  description,
  Icon,
}) {
  return (
    <div className="group bg-[#0d0d0f] border border-white/10 rounded-3xl p-8 hover:border-cyan-400 hover:-translate-y-2 transition-all duration-300">

      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
        <Icon className="text-black" size={32} />
      </div>

      <h2 className="text-white text-2xl font-semibold mt-6">
        {title}
      </h2>

      <p className="text-cyan-400 mt-2 text-sm">
        {type}
      </p>

      <p className="text-gray-400 mt-5 leading-7">
        {description}
      </p>

      <button className="mt-8 text-white font-semibold group-hover:text-cyan-400 transition">
        Learn more →
      </button>

    </div>
  );
}