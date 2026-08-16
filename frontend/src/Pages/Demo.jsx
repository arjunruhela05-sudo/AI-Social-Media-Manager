
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  WandSparkles,
  ArrowRight,
  Play,
  CheckCircle2,
} from "lucide-react";

const Demo = () => {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32">
        
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-400 backdrop-blur-xl">
            <Sparkles size={16} />
            See AI Social Media Manager in action
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Everything You Need to
            <span className="block bg-gradient from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Grow Your Social Media
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Discover how AI Social Media Manager helps you create content,
            schedule posts, manage multiple platforms, and understand your
            audience from one powerful dashboard.
          </p>

        </div>
      </section>


      {/* DEMO VIDEO / PREVIEW */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/0.04 p-3 shadow-2xl shadow-violet-950/20">

            {/* Glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient from-violet-500/10 via-transparent to-cyan-500/10" />

            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-[#0b1120]">

              {/* Fake Dashboard */}
              <div className="absolute inset-0 p-6 opacity-70">

                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <div className="h-3 w-32 rounded bg-white/10" />
                    <div className="mt-3 h-7 w-48 rounded bg-white/10" />
                  </div>

                  <div className="h-9 w-24 rounded-lg bg-violet-500/20" />
                </div>

                <div className="grid gap-4 md:grid-cols-3">

                  <div className="h-32 rounded-2xl border border-white/10 bg-white/0.03" />
                  <div className="h-32 rounded-2xl border border-white/10 bg-white/0.03" />
                  <div className="h-32 rounded-2xl border border-white/10 bg-white/0.03" />

                </div>

                <div className="mt-4 h-52 rounded-2xl border border-white/10 bg-white/0.03" />

              </div>

              {/* Play Button */}
              <button className="group/play relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient from-violet-600 to-cyan-500 shadow-2xl shadow-violet-500/30 transition duration-300 hover:scale-110">
                <Play
                  size={30}
                  fill="white"
                  className="ml-1 text-white"
                />
              </button>

            </div>
          </div>

          <p className="mt-5 text-center text-sm text-slate-500">
            Product walkthrough · Approximately 2 minutes
          </p>

        </div>
      </section>


      {/* WHAT YOU WILL SEE */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-400">
              Product Tour
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              See what you can do
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              From creating your first post to analyzing campaign performance,
              everything is available from one simple workspace.
            </p>

          </div>


          <div className="grid gap-6 md:grid-cols-2">

            {/* Feature 1 */}
            <div className="group rounded-2xl border border-white/10 bg-white/0.04 p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-400/30 hover:bg-white/0.06">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <WandSparkles size={24} />
              </div>

              <p className="mb-2 text-sm font-medium text-violet-400">
                01
              </p>

              <h3 className="text-xl font-semibold">
                AI Content Creation
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Generate captions, post ideas, hashtags, and engaging content
                in seconds with your AI-powered content assistant.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-green-400" />
                Create content faster
              </div>

            </div>


            {/* Feature 2 */}
            <div className="group rounded-2xl border border-white/10 bg-white/0.04 p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/0.06">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <CalendarDays size={24} />
              </div>

              <p className="mb-2 text-sm font-medium text-cyan-400">
                02
              </p>

              <h3 className="text-xl font-semibold">
                Smart Scheduling
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Plan your content calendar and schedule posts across your
                social platforms without constantly switching between apps.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-green-400" />
                Stay consistent automatically
              </div>

            </div>


            {/* Feature 3 */}
            <div className="group rounded-2xl border border-white/10 bg-white/0.04 p-7 transition duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/0.06">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <BarChart3 size={24} />
              </div>

              <p className="mb-2 text-sm font-medium text-blue-400">
                03
              </p>

              <h3 className="text-xl font-semibold">
                Analytics & Insights
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Monitor reach, engagement, followers, and content performance
                to understand what is working for your audience.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-green-400" />
                Make data-driven decisions
              </div>

            </div>


            {/* Feature 4 */}
            <div className="group rounded-2xl border border-white/10 bg-white/0.04 p-7 transition duration-300 hover:-translate-y-2 hover:border-pink-400/30 hover:bg-white/0.06">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400">
                <Sparkles size={24} />
              </div>

              <p className="mb-2 text-sm font-medium text-pink-400">
                04
              </p>

              <h3 className="text-xl font-semibold">
                AI Social Assistant
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Get personalized content ideas, hashtag suggestions, and
                recommendations to improve your social media strategy.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={16} className="text-green-400" />
                Get smarter recommendations
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* FINAL CTA */}
      <section className="px-6 pb-24">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient from-violet-600/20 via-white/0.4 to-cyan-500/10 p-10 text-center sm:p-16">

          <div className="relative">

            <Sparkles
              className="mx-auto mb-5 text-cyan-400"
              size={28}
            />

            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to transform your social media?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Create smarter content, automate your workflow, and grow your
              audience with AI.
            </p>

            <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient from-violet-600 to-cyan-500 px-7 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/20">
              Start Free
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Demo;

