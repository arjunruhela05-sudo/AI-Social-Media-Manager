import Navbar from "../Components/Navbar";
import IntegrationCard from "../Components/IntegrationCard";
import { integrations } from "../data/integrations";
import {motion} from "framer-motion";

export default function Integrations() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] bg-size:20px_20px opacity-30"></div>

      {/* Glow Effects */}
      <div className="absolute -top-52 -left-52 w-500px h-500px rounded-full bg-cyan-500/20 blur-[120px]"></div>

      <div className="absolute -bottom-52 -right-52 w-500px h-500px rounded-full bg-purple-600/20 blur-[120px]"></div>

      {/* Content */}
      <section className="relative max-w-7xl mx-auto px-6 pt-36 pb-20">

        <motion.h1   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-center text-6xl md:text-7xl font-bold text-white">
          Integrations.
        </motion.h1>

        <motion.p   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-center text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
          Easily integrate all your favourite social media platforms
          and publish content from one place.
        </motion.p>

        {/* Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {integrations.map((item) => (
            <IntegrationCard
              key={item.title}
              title={item.title}
              type={item.type}
              description={item.description}
              Icon={item.icon}
            />
          ))}

        </div>

      </section>

    </div>
  );
}