

import { motion } from "framer-motion";

const templateOptions = [
  {
    title: "Instagram Posts",
    description:
      "AI-generated post designs, captions, and creative ideas for Instagram growth.",
    icon: "📸",
  },

  {
    title: "Reels & Shorts",
    description:
      "Create viral video ideas, scripts, and captions for short-form content.",
    icon: "🎬",
  },

  {
    title: "LinkedIn Posts",
    description:
      "Professional templates for personal branding and business growth.",
    icon: "💼",
  },

  {
    title: "Marketing Campaigns",
    description:
      "Promotional templates for product launches, offers, and campaigns.",
    icon: "🚀",
  },

  {
    title: "Social Media Ads",
    description:
      "High-converting ad copy and creative templates powered by AI.",
    icon: "📢",
  },

  {
    title: "Content Calendar",
    description:
      "Plan and schedule your monthly social media strategy.",
    icon: "📅",
  },

  {
  title: "Facebook Posts",
  description:
    "Generate engaging Facebook posts, event promotions, and community updates with AI.",
  icon: "📘",
},

{
  title: "Twitter / X Posts",
  description:
    "Create concise, trending tweets, threads, and hashtags to maximize reach and engagement.",
  icon: "🐦",
},

{
  title: "YouTube Scripts",
  description:
    "Generate video scripts, catchy titles, descriptions, and SEO-friendly tags for YouTube.",
  icon: "▶️",
},

{
  title: "Email Marketing",
  description:
    "Design professional email campaigns, newsletters, and promotional messages in seconds.",
  icon: "📧",
},

{
  title: "Product Launch",
  description:
    "Create announcement posts, launch campaigns, countdowns, and promotional content for new products.",
  icon: "🎉",
},

{
  title: "Holiday & Festival Posts",
  description:
    "Generate festive greetings and seasonal marketing content for holidays and special occasions.",
  icon: "🎄",
},
];

function Templates(){

return (

<div
className="
min-h-screen
px-8
py-20
relative
overflow-hidden
bg-cover
bg-center
"
style={{
  backgroundImage:
  "url('https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000')"
}}
>


{/* Dark Overlay */}
<div
className="
absolute
inset-0
bg-black/70
"
></div>


{/* Content */}
<div
className="
relative
z-10
"
>

    <div className="text-center mt-10">


<motion.h1  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} 
className="
text-5xl
font-bold
text-white
"
>
AI Social Media Templates
</motion.h1>


<motion.p  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }} 
className="
mt-5
text-white
text-lg
p-4
mb-2.5

"
>
Create, customize, and publish engaging content
with AI-powered templates.
</motion.p>


</div>


<div
className="
grid
md:grid-cols-3
gap-8
"
>

{
templateOptions.map((item,index)=>(

<div
key={index}
className="
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-3xl
p-8
text-white
hover:-translate-y-3
transition-all
duration-300
"
>


<div className="text-4xl">
{item.icon}
</div>


<h2
className="
text-2xl
font-bold
mt-5
"
>
{item.title}
</h2>


<p
className="
text-gray-300
mt-3
"
>
{item.description}
</p>


<button
className="
mt-6
px-6
py-2
rounded-xl
bg-blue-600
hover:bg-blue-700
transition
"
>
Use Template
</button>


</div>


))
}

</div>


</div>


</div>

)

}

export default Templates;


























