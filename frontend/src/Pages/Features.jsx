import Navbar from "../Components/Navbar";
import FeatureCard from "../Components/FeaturesCard";
import { features } from "../data/features";
import bg from "../assets/bg.avif";
import {motion } from "framer-motion";

export default function Features() {
  return (
    <div className="relative min-h-screen bg-black bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
    

      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2f2f2f_1px,transparent_1px)] bg-size:22px_22px opacity-30"></div>

      <div className="absolute -top-52 -left-52 w-500px h-500px rounded-full bg-cyan-500/20 blur-[120px]"></div>

      <div className="absolute -bottom-52 -right-52 w-500px h-500px rounded-full bg-purple-600/20 blur-[120px]"></div>

      <section className="relative max-w-7xl mx-auto px-6 pt-36 pb-24">

        <motion.h1   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-6xl md:text-7xl font-bold text-white text-center">
          Powerful AI Features
        </motion.h1>

        <motion.p  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} p className="text-center text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
          Everything you need to create, schedule, publish, analyze,
          and grow your social media using AI.
        </motion.p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}

        </div>

      </section>

    </div>
  );
}