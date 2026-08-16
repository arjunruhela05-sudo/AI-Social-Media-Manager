import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
// import Trusted from "../Components/Trusted";


// import Dashboard from "../Components/Dashboard";
// import Pricing from "../Components/Pricing";
// import ScrollReveal from "../ScrollReveal";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />
{/* 
      <ScrollReveal>
        <Trusted />
      </ScrollReveal>

  

      <ScrollReveal>
        <Dashboard />
      </ScrollReveal>

      <ScrollReveal>
        <Pricing />
      </ScrollReveal> */}

      <section className="h-screen bg-black"></section>
    </>
  );
}