
import logo1 from "../assets/logo1.svg";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.svg";
import logo4 from "../assets/logo4.svg";
import post1 from "../assets/post1.jpg";
import post2 from "../assets/post2.avif";
import post3 from "../assets/post3.avif";
import { motion } from "framer-motion";
import { Link  } from "react-router-dom";


import { useState } from "react";

import {   Hash,  MessageCircle, ImageIcon,} from "lucide-react";
// import { motion } from "framer-motion";
import { Sparkles, ArrowRight,   ArrowUpRight, Check,  CalendarDays,BarChart3,Plus,TrendingUp,Users,Eye,Heart,Clock3,} from "lucide-react";
const logos = [logo1, logo2, logo3, logo4];
import {FaInstagram,FaFacebookF,FaLinkedinIn} from "react-icons/fa";



const Hero = () => {
   const cards = [
  {
    image: post1,
    title: "Create content",
    subtitle: "10x faster with AI",
    button: "Generate now",
    type: "feature",
  },
  {
    image: post2,
    name: "Benjamin Austin",
    role: "Account Executive",
    text: "AI workflows save hours every week.",
    type: "review",
  },
  {
    image: post3,
    title: "Grow Faster",
    subtitle: "Using AI",
    button: "Learn More",
    type: "feature",
  },
];



 const stats = [
    {
      title: "Total Followers",
      value: "24.8K",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Engagement",
      value: "8.4%",
      change: "+3.2%",
      icon: Heart,
    },
    {
      title: "Post Reach",
      value: "86.2K",
      change: "+18.1%",
      icon: Eye,
    },
    {
      title: "Scheduled",
      value: "12",
      change: "This week",
      icon: CalendarDays,
    },
  ];





  const features = [{icon: <Sparkles size={30} />,title: "AI Caption Generator",description:
    "Generate engaging captions in seconds using advanced AI tailored for every platform.",
    },
    {
      icon: <CalendarDays size={30} />,
      title: "Smart Scheduler",
      description:
        "Schedule posts automatically at the best time to maximize engagement.",
    },
    {
      icon: <Hash size={30} />,
      title: "Hashtag Generator",
      description:
        "Discover trending hashtags to increase your reach and visibility.",
    },
    {
      icon: <BarChart3 size={30} />,
      title: "Analytics Dashboard",
      description:
        "Track likes, reach, engagement, and audience growth with AI insights.",
    },
    {
      icon: <MessageCircle size={30} />,
      title: "AI Reply Assistant",
      description:
        "Respond to comments and messages instantly with intelligent AI replies.",
    },
    {
      icon: <ImageIcon size={30} />,
      title: "AI Creative Studio",
      description:
        "Generate stunning social media creatives, banners, and post ideas effortlessly.",
    },
  ];



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

const [yearly, setYearly] = useState(false);














  return (
    <>
<motion.section className=" flex relative min-h-screen overflow-hidden" style={{ backgroundColor: "#151515", backgroundImage:"radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",   backgroundSize: "28px 28px",}}>
  <div className="absolute top-250px left-1/2 -translate-x-1/2 w-900px h-900px rounded-full bg-white/5 blur-[180px]" />
  <div className="absolute bottom-100px right-100px w-500px h-500px rounded-full bg-violet-500/10 blur-[160px]" />
  <div className="absolute top-40 left-100px w-350px h-350px rounded-full bg-cyan-500/10 blur-[150px]" />
   <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-20">
   <div className="grid lg:grid-cols-2 gap-16 items-start">
  <div>  <motion.div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-cyan-400 mb-8"> <Sparkles size={18} /> AI Powered Social Media Manager</motion.div>
   <motion.h1  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-5xl md:text-7xl font-bold leading-tight text-white">Grow Faster<br />With<span className="bg-gradient from-violet-400 to-cyan-400 bg-clip-text text-transparent">  {" "}AI Automation </span>
  </motion.h1><motion.p   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="mt-8 text-slate-400 text-lg leading-8 max-w-xl">  Create captions, schedule content, generate hashtags, analyze engagement, and manage all your social media accounts from one intelligent platform.</motion.p>
   <div className="mt-10 flex flex-wrap gap-4"><Link to = "/signup" className="px-8 py-4 rounded-xl bg-gradient from-violet-600 to-cyan-500 text-white font-semibold flex items-center gap-2 hover:scale-105 transition">  Start Free  <ArrowRight size={18} /></Link>
   <motion.div whileHover={{ scale: 1.05, y: -3 }}whileTap={{ scale: 0.97 }}><Link to="/demo"className="inline-flex px-8 py-4 rounded-xl border border-white/15 text-white hover:bg-white/5 transition">
    Watch Demo</Link></motion.div></div>
<div className="mt-12 flex items-center">
<div className="group flex items-center cursor-pointer"> {logos.map((logo, index) => (
 <div key={index} style={{ zIndex: logos.length - index, }} className={` relative w-16 h-16  rounded-full bg-white border-4 border-[#0B0F19] flex items-center justify-center transition-all duration-500 
    ease-out hover:-translate-y-2 ${   index !== 0 ? "-ml-5 group-hover:ml-2"  : "" } `}   >
 <img src={logo} alt="" className="w-8 h-8 object-contain" /></div>))}
 </div>
  <motion.div> <motion.h4  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-white font-semibold">  Trusted by 20,000+ marketers  </motion.h4>
  <motion.p className="text-slate-400 text-sm"> Manage Instagram, LinkedIn, Facebook & X from one place. </motion.p> </motion.div></div><div className="flex flex-wrap gap-10 mt-14">
 <div><h2 className="text-3xl font-bold text-white">100K+</h2> <p className="text-slate-400">Posts Generated</p></div>
<div><h2 className="text-3xl font-bold text-white">20K+</h2><p className="text-slate-400">Active Users</p></div><div>
                <h2 className="text-3xl font-bold text-white">99.9%</h2>
                <p className="text-slate-400">Uptime</p>
              </div>

            </div>

          </div> {/* END LEFT */}

        

           {/* RIGHT */}
           <div className="hidden lg:flex justify-end">

  <div className="relative h-760px w-360px overflow-hidden">

    {/* Top Fade */}
    <div className="absolute top-0 left-0 w-full h-24 bg-gradient from-[#151515] to-transparent z-20" />

    {/* Bottom Fade */}
    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient from-[#151515] to-transparent z-20" />

   <div className="animate-scroll flex flex-col gap-6">

{cards.map((card, index) => (

        <div key={index}>

          {card.type === "feature" ? (

            <div className="relative rounded-3xl overflow-hidden border border-white/10">

              <img
                src={card.image}
                className="w-full h-430px object-cover"
                alt=""
              />

              <div className="absolute inset-0 bg-gradient from-black via-black/20 to-transparent"></div>

              <div className="absolute bottom-7 left-7">

                <h2 className="text-4xl font-bold text-white leading-tight">
                  {card.title}
                  <br />
                  {card.subtitle}
                </h2>

                <button className="mt-6 text-white font-medium">
                  {card.button} →
                </button>

              </div>

            </div>

          ) : (

            <div className="bg-[#111111] border border-white/10 rounded-3xl p-6">

              <div className="flex items-center gap-4">

                <img
                  src={card.image}
                  className="w-14 h-14 rounded-full object-cover"
                  alt=""
                />

                <div>

                  <h3 className="text-white font-semibold">
                    {card.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {card.role}
                  </p>

                </div>

              </div>

              <p className="mt-6 text-gray-300 leading-7">
                {card.text}
              </p>

            </div>

          )}

        </div>

      ))}

    </div>

  </div>

</div>

         

        </div>

      </div>

    </motion.section>







    <section className="py-28 bg-black" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: "easeOut" }}>
<div className="max-w-7xl mx-auto">

   

        <p className="text-center text-gray-400 text-xl">
          Trusted by some of the biggest companies globally
        </p>

        {/* Logos */}

        <div className="mt-16 flex flex-wrap justify-center items-center gap-20 opacity-50">

          <img src={logo1} className="h-10 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300" />

          <img src={logo2} className="h-10 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300" />

          <img src={logo3} className="h-10 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300" />

          <img src={logo4} className="h-10 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300" />

        </div>

        {/* AI Tag */}
<motion.div
  className="flex justify-center gap-16 mt-16"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.4, duration: 0.8 }}
>
  

          <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white text-sm">
            AI agents
          </span>
</motion.div>

        {/* Heading */}

       <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} className="text-6xl font-bold text-center text-white">
  AI agents ready to use.
</motion.h2>
        {/* Description */}

        <motion.p    initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="max-w-3xl mx-auto mt-8 text-center text-xl leading-9 text-gray-400">

          AI agent templates are designed to automate social media,
          DMs and engagement.

          <br />

          Or build your own personal agent.

        </motion.p>

      </div>

   </section>








     <motion.section className="relative py-32 overflow-hidden"style={{  backgroundColor: "black",  backgroundImage:  "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",backgroundSize: "28px 28px", }}>
         {/* Background Glow */}
         <div className="absolute top-20 left-1/2 -translate-x-1/2 w-700px h-700px bg-violet-500/10 blur-[180px] rounded-full"></div>
         <div className="relative max-w-7xl mx-auto px-6">
           {/* Badge */}
           <div className="flex justify-center">
             <motion.span  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-cyan-400 text-sm">
               ✨ Powerful AI Features
             </motion.span>
           </div>
   
           {/* Heading */}
           <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-center mt-8 text-5xl md:text-6xl font-bold text-white">
             Everything You Need
             <br />
             <motion.span initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="bg-gradient from-violet-400 to-cyan-400 bg-clip-text text-transparent">
               To Grow Faster
             </motion.span>
           </motion.h2>
   
           {/* Description */}
           <motion.p   initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-center text-gray-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
             Manage every aspect of your social media using one intelligent
             platform powered by AI.
           </motion.p>
   
           {/* Feature Cards */}
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
             {features.map((feature, index) => (
               <div
                 key={index}
                 className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40 hover:bg-white/10"
               >
                 {/* Glow */}
                 <div className="absolute inset-0 rounded-3xl bg-gradient from-violet-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-violet-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
   
                 {/* Icon */}
                 <div className="relative w-16 h-16 rounded-2xl bg-gradient from-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                   {feature.icon}
                 </div>
   
                 {/* Title */}
                 <h3 className="relative mt-8 text-2xl font-semibold text-white">
                   {feature.title}
                 </h3>
   
                 {/* Description */}
                 <p className="relative mt-4 text-gray-400 leading-7">
                   {feature.description}
                 </p>
   
                 {/* Learn More */}
                 <button className="relative mt-8 text-cyan-400 font-medium group-hover:translate-x-2 transition-all">
                   Learn More →
                 </button>
               </div>
             ))}
           </div>
         </div>
       </motion.section>
     












     <motion.section
      className="relative min-h-screen overflow-hidden pt-28 pb-16"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Background glow */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-gray-400 text-sm">
              SocialAI Dashboard
            </motion.p>

            <motion.h1  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-3xl md:text-4xl font-bold text-white mt-1">
              Welcome back 👋
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-gray-400 mt-2">
              Here's what's happening with your social accounts.
            </motion.p>
          </div>

          <motion.button
            className="
              flex items-center justify-center gap-2
              px-5 py-3
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-semibold
              rounded-xl
              transition
              shadow-lg shadow-blue-600/20
            "
          >
            <Plus size={19} />
            Create Post
          </motion.button>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  bg-[#101010]
                  border border-white/10
                  rounded-2xl
                  p-5
                  hover:border-white/20
                  transition
                "
              >
                <div className="flex justify-between items-center">

                  <p className="text-gray-400 text-sm">
                    {item.title}
                  </p>

                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <Icon size={18} className="text-cyan-400" />
                  </div>

                </div>

                <h2 className="text-3xl text-white font-bold mt-4">
                  {item.value}
                </h2>

                <p className="text-green-400 text-sm mt-2 flex items-center gap-1">
                  {item.change}
                  <TrendingUp size={14} />
                </p>
              </div>
            );
          })}

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* AI GENERATOR */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <motion.h2  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="text-cyan-400" size={21} />
                    AI Content Generator
                  </motion.h2>

                  <motion.p  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}  className="text-gray-500 text-sm mt-1">
                    Generate social media content in seconds.
                  </motion.p>
                </div>

              </div>

              <textarea
                placeholder="Example: Create an Instagram caption for our new AI productivity app..."
                className="
                  w-full
                  h-28
                  resize-none
                  bg-[#181818]
                  border border-white/10
                  rounded-xl
                  p-4
                  text-white
                  placeholder-gray-600
                  outline-none
                  focus:border-blue-500
                  transition
                "
              />

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">

                <select
                  className="
                    bg-[#181818]
                    border border-white/10
                    text-gray-300
                    px-4 py-2.5
                    rounded-lg
                    outline-none
                  "
                >
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Facebook</option>
                </select>

                <button
                  className="
                    flex items-center justify-center gap-2
                    bg-gradient
                    from-blue-600
                    to-cyan-500
                    text-white
                    px-6 py-2.5
                    rounded-lg
                    font-semibold
                    hover:scale-[1.02]
                    transition
                  "
                >
                  <Sparkles size={17} />
                  Generate Content
                </button>

              </div>

            </div>

            {/* SCHEDULED POSTS */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-xl font-bold text-white">
                    Upcoming Posts
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Your scheduled social media content
                  </p>
                </div>

                <button className="text-blue-400 text-sm hover:text-blue-300">
                  View calendar
                </button>

              </div>

              {/* POST 1 */}

              <div className="flex items-center justify-between gap-4 py-4 border-b border-white/10">

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center">
                    <FaInstagram className="text-pink-500 text-xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      Product launch announcement
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Instagram • Today, 6:30 PM
                    </p>
                  </div>

                </div>

                <span className="hidden sm:block text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-xs">
                  Scheduled
                </span>

              </div>

              {/* POST 2 */}

              <div className="flex items-center justify-between gap-4 py-4">

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <FaLinkedinIn className="text-blue-400 text-xl" />
                  </div>

                  <div>
                    <p className="text-white font-medium">
                      5 AI trends every creator should know
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      LinkedIn • Tomorrow, 10:00 AM
                    </p>
                  </div>

                </div>

                <span className="hidden sm:block text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full text-xs">
                  Scheduled
                </span>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">

            {/* CONNECTED ACCOUNTS */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex justify-between items-center mb-6">

                <h2 className="text-lg font-bold text-white">
                  Connected Accounts
                </h2>

                <Plus size={18} className="text-gray-400 cursor-pointer" />

              </div>

              {/* Instagram */}

              <div className="flex items-center justify-between py-3">

                <div className="flex items-center gap-3">
                  <FaInstagram className="text-pink-500 text-2xl" />

                  <div>
                    <p className="text-white text-sm">
                      Instagram
                    </p>

                    <p className="text-gray-500 text-xs">
                      @socialai
                    </p>
                  </div>
                </div>

                <span className="w-2 h-2 bg-green-400 rounded-full"></span>

              </div>

              {/* Facebook */}

              <div className="flex items-center justify-between py-3">

                <div className="flex items-center gap-3">
                  <FaFacebookF className="text-blue-500 text-xl" />

                  <div>
                    <p className="text-white text-sm">
                      Facebook
                    </p>

                    <p className="text-gray-500 text-xs">
                      SocialAI
                    </p>
                  </div>
                </div>

                <span className="w-2 h-2 bg-green-400 rounded-full"></span>

              </div>

              {/* LinkedIn */}

              <div className="flex items-center justify-between py-3">

                <div className="flex items-center gap-3">
                  <FaLinkedinIn className="text-sky-500 text-xl" />

                  <div>
                    <p className="text-white text-sm">
                      LinkedIn
                    </p>

                    <p className="text-gray-500 text-xs">
                      SocialAI Company
                    </p>
                  </div>
                </div>

                <span className="w-2 h-2 bg-green-400 rounded-full"></span>

              </div>

              <button className="w-full border border-white/10 text-gray-300 rounded-xl py-2.5 mt-4 hover:bg-white/5 transition">
                + Connect Account
              </button>

            </div>

            {/* QUICK ACTIONS */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <h2 className="text-lg font-bold text-white mb-5">
                Quick Actions
              </h2>

              <div className="space-y-3">

                <button className="w-full flex items-center justify-between bg-[#181818] hover:bg-[#202020] p-4 rounded-xl transition">

                  <div className="flex items-center gap-3 text-white">
                    <Sparkles size={18} className="text-cyan-400" />
                    Generate Caption
                  </div>

                  <ArrowUpRight size={16} className="text-gray-500" />

                </button>

                <button className="w-full flex items-center justify-between bg-[#181818] hover:bg-[#202020] p-4 rounded-xl transition">

                  <div className="flex items-center gap-3 text-white">
                    <CalendarDays size={18} className="text-purple-400" />
                    Schedule Post
                  </div>

                  <ArrowUpRight size={16} className="text-gray-500" />

                </button>

                <button className="w-full flex items-center justify-between bg-[#181818] hover:bg-[#202020] p-4 rounded-xl transition">

                  <div className="flex items-center gap-3 text-white">
                    <BarChart3 size={18} className="text-green-400" />
                    View Analytics
                  </div>

                  <ArrowUpRight size={16} className="text-gray-500" />

                </button>

              </div>

            </div>

            {/* NEXT POST */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex items-center gap-2 text-gray-400">
                <Clock3 size={18} />
                <span className="text-sm">Next scheduled post</span>
              </div>

              <h3 className="text-2xl text-white font-bold mt-4">
                Today, 6:30 PM
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                Instagram • Product Launch
              </p>

            </div>

          </div>

        </div>

      </div>
    </motion.section>















    






















<div
  className="
    relative min-h-screen overflow-hidden
    bg-black  ">




      <div className="text-center mb-12">

       <motion.h1  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}   className="  mt-16 text-5xl font-bold  text-white animate-[fadeIn_0.8s_ease-in-out] transition-all duration-700 hover:scale-105  hover:text-blue-400">
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
















 </>
  );
};

export default Hero;