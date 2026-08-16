import { useState } from "react";
import { Check } from "lucide-react";
import bg from "../assets/bg.avif";
import {motion} from "framer-motion";

const plans = [
  {
    name: "Starter",
    monthly: 9,
    yearly: 90,
    features: [
      "5 Social Accounts",
      "AI Content Generation",
      "Basic Analytics",
    ],
  },
  {
    name: "Professional",
    monthly: 29,
    yearly: 290,
    popular: true,
    features: [
      "Unlimited Posts",
      "Advanced AI Tools",
      "Team Collaboration",
      "Detailed Analytics",
    ],
  },
  {
    name: "Enterprise",
    monthly: 99,
    yearly: 990,
    features: [
      "Unlimited Users",
      "Priority Support",
      "Custom AI Solutions",
    ],
  },
];


function Pricing() {

  const [yearly, setYearly] = useState(false);


  return (
<div
  className="
    relative min-h-screen overflow-hidden
    bg-black  bg-cover bg-center"    style={{ backgroundImage: `url(${bg})` }}>




      <div className="text-center mb-12">

       <motion.h1  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="  mt-20 pt-15 text-5xl font-bold  text-white animate-[fadeIn_0.8s_ease-in-out] transition-all duration-700 hover:scale-105  hover:text-blue-400">
  Simple Pricing Plans
</motion.h1>

        <motion.p  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}   className="text-white mt-4">
          Choose the plan that fits your business
        </motion.p>


        <div className="mt-8 flex justify-center">

          <button
            onClick={()=>setYearly(false)}
            className={`px-5 py-2 rounded-l-lg ${
              !yearly ? "bg-blue-600":"bg-gray-800"
            }`}
          >
            Monthly
          </button>


          <button
            onClick={()=>setYearly(true)}
            className={`px-5 py-2 rounded-r-lg ${
              yearly ? "bg-blue-600":"bg-gray-800"
            }`}
          >
            Yearly
          </button>

        </div>

      </div>



      <div className="grid md:grid-cols-3 text-white gap-8 max-w-6xl mx-auto">


        {
          plans.map((plan,index)=>(

            <div
            key={index}
            className={`relative rounded-3xl p-8 bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl
            hover:-translate-y-2 transition
            ${plan.popular ? "ring-2 ring-blue-500":""}
            `}
            >


              {
                plan.popular &&
                <span className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-sm">
                  Popular
                </span>
              }


              <h2 className="text-2xl font-bold">
                {plan.name}
              </h2>


              <div className="mt-6">

                <span className="text-5xl font-bold">
                  $
                  {yearly ? plan.yearly : plan.monthly}
                </span>

                <span className="text-white">
                  /{yearly ? "year":"month"}
                </span>

              </div>



              <div className="mt-8 space-y-4">

              {
                plan.features.map((feature,i)=>(

                  <div 
                  key={i}
                  className="flex gap-3 items-center"
                  >

                    <Check className="text-green-400"/>

                    <p>
                      {feature}
                    </p>

                  </div>

                ))
              }

              </div>


              <button
              className="mt-10 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
              >
                Get Started
              </button>


            </div>

          ))
        }


      </div>

    </div>
  )
}

export default Pricing;