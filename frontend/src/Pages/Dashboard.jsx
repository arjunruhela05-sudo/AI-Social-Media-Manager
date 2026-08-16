import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  CalendarDays,
  BarChart3,
  Plus,
  TrendingUp,
  Users,
  FileText,
  Send,
  Clock3,
  Globe2,
  AlertCircle,
  LogOut,
} from "lucide-react";

import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // =========================
  // DASHBOARD STATE
  // =========================

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // AI GENERATOR STATE
  // =========================

  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");

  const [tone, setTone] = useState([
    "Bold",
    "Energetic",
  ]);

  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [generateError, setGenerateError] = useState("");

  // =========================
  // FETCH DASHBOARD
  // =========================

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/dashboard");

      console.log("DASHBOARD RESPONSE:", response.data);

      setDashboard(response.data.data);

    } catch (error) {
      console.error("DASHBOARD ERROR:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Unable to load dashboard."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // =========================
  // GENERATE AI CONTENT
  // =========================

  const handleGenerateContent = async () => {
    setGenerateError("");
    setGeneratedContent(null);

    if (!brandName.trim()) {
      setGenerateError("Please enter a brand name.");
      return;
    }

    if (!industry.trim()) {
      setGenerateError("Please enter the industry.");
      return;
    }

    if (!topic.trim()) {
      setGenerateError("Please enter a topic.");
      return;
    }

    try {
      setGenerating(true);

      const response = await api.post(
        "/content/generate",
        {
          brandName: brandName.trim(),
          industry: industry.trim(),
          platform,
          topic: topic.trim(),
          tone,
        }
      );

      console.log(
        "GENERATED CONTENT:",
        response.data
      );

      setGeneratedContent(
        response.data.data
      );

      // Refresh dashboard numbers
      await fetchDashboard();

    } catch (error) {
      console.error(
        "CONTENT GENERATION ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setGenerateError(
        error.response?.data?.message ||
        "Failed to generate content."
      );

    } finally {
      setGenerating(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <Sparkles
            size={36}
            className="text-cyan-400 mx-auto animate-pulse"
          />

          <p className="text-gray-400 mt-4">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="max-w-md text-center">

          <AlertCircle
            size={42}
            className="text-red-400 mx-auto"
          />

          <h1 className="text-white text-2xl font-bold mt-5">
            Dashboard unavailable
          </h1>

          <p className="text-gray-400 mt-3">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="
              mt-6
              px-6
              py-3
              rounded-xl
              bg-blue-600
              hover:bg-blue-500
              text-white
              font-semibold
              transition
            "
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  // =========================
  // DATA
  // =========================

  const stats = [
    {
      title: "Total Brands",
      value: dashboard?.totalBrands ?? 0,
      icon: Users,
    },
    {
      title: "Generated Posts",
      value: dashboard?.generatedPosts ?? 0,
      icon: Sparkles,
    },
    {
      title: "Scheduled Posts",
      value: dashboard?.scheduledPosts ?? 0,
      icon: CalendarDays,
    },
    {
      title: "Published Posts",
      value: dashboard?.publishedPosts ?? 0,
      icon: Send,
    },
  ];

  const secondaryStats = [
    {
      title: "AI Requests",
      value: dashboard?.totalAIRequests ?? 0,
      icon: Sparkles,
    },
    {
      title: "Draft Posts",
      value: dashboard?.draftPosts ?? 0,
      icon: FileText,
    },
    {
      title: "Failed Posts",
      value: dashboard?.failedPosts ?? 0,
      icon: AlertCircle,
    },
    {
      title: "Completion Rate",
      value: `${dashboard?.completionRate ?? 0}%`,
      icon: TrendingUp,
    },
  ];

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-10">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <p className="text-gray-500 text-sm">
              SocialAI Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              Welcome back 👋
            </h1>

            <p className="text-gray-400 mt-2">
              Here's what's happening with your social media.
            </p>
          </div>

          <div className="flex items-center gap-3">

  {/* Create Post */}

  <button
    onClick={() => {
      document
        .getElementById("content-generator")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }}
    className="
      flex
      items-center
      justify-center
      gap-2
      px-5
      py-3
      bg-blue-600
      hover:bg-blue-500
      text-white
      font-semibold
      rounded-xl
      transition
    "
  >
    <Plus size={19} />
    Create Post
  </button>

  {/* Logout */}

  <button
    onClick={handleLogout}
    className="
      flex
      items-center
      justify-center
      gap-2
      px-5
      py-3
      bg-red-500/10
      hover:bg-red-500/20
      border
      border-red-500/20
      text-red-400
      font-semibold
      rounded-xl
      transition
    "
  >
    <LogOut size={18} />
    Logout
  </button>

</div>

        </div>

        {/* ========================= */}
        {/* PRIMARY STATS */}
        {/* ========================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  bg-[#101010]
                  border
                  border-white/10
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
                    <Icon
                      size={18}
                      className="text-cyan-400"
                    />
                  </div>

                </div>

                <h2 className="text-3xl font-bold mt-4">
                  {item.value}
                </h2>

              </div>
            );
          })}

        </div>

        {/* ========================= */}
        {/* SECONDARY STATS */}
        {/* ========================= */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">

          {secondaryStats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  bg-[#101010]
                  border
                  border-white/10
                  rounded-2xl
                  p-5
                "
              >

                <div className="flex justify-between items-center">

                  <p className="text-gray-400 text-sm">
                    {item.title}
                  </p>

                  <Icon
                    size={18}
                    className="text-gray-500"
                  />

                </div>

                <h2 className="text-2xl font-bold mt-4">
                  {item.value}
                </h2>

              </div>
            );
          })}

        </div>

        {/* ========================= */}
        {/* MAIN GRID */}
        {/* ========================= */}

        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* ========================= */}
          {/* LEFT SIDE */}
          {/* ========================= */}

          <div className="lg:col-span-2 space-y-6">

            {/* ========================= */}
            {/* AI CONTENT GENERATOR */}
            {/* ========================= */}

            <div
              id="content-generator"
              className="
                bg-[#101010]
                border
                border-white/10
                rounded-2xl
                p-6
              "
            >

              <div className="flex items-center gap-3 mb-6">

                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Sparkles
                    className="text-cyan-400"
                    size={21}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    AI Content Generator
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Generate social media content in seconds.
                  </p>
                </div>

              </div>

              {/* Brand */}
              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Brand Name
                  </label>

                  <input
                    value={brandName}
                    onChange={(e) =>
                      setBrandName(e.target.value)
                    }
                    placeholder="Nike"
                    className="
                      w-full
                      bg-[#181818]
                      border
                      border-white/10
                      rounded-xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-blue-500
                    "
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Industry
                  </label>

                  <input
                    value={industry}
                    onChange={(e) =>
                      setIndustry(e.target.value)
                    }
                    placeholder="Sports & Fitness"
                    className="
                      w-full
                      bg-[#181818]
                      border
                      border-white/10
                      rounded-xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-blue-500
                    "
                  />
                </div>

              </div>

              {/* Topic */}
              <div className="mt-4">

                <label className="block text-sm text-gray-400 mb-2">
                  Topic
                </label>

                <textarea
                  value={topic}
                  onChange={(e) =>
                    setTopic(e.target.value)
                  }
                  placeholder="Launching a new running shoe..."
                  className="
                    w-full
                    h-28
                    resize-none
                    bg-[#181818]
                    border
                    border-white/10
                    rounded-xl
                    p-4
                    text-white
                    placeholder-gray-600
                    outline-none
                    focus:border-blue-500
                  "
                />

              </div>

              {/* Platform + Generate */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">

                <select
                  value={platform}
                  onChange={(e) =>
                    setPlatform(e.target.value)
                  }
                  className="
                    bg-[#181818]
                    border
                    border-white/10
                    text-gray-300
                    px-4
                    py-2.5
                    rounded-lg
                    outline-none
                  "
                >
                  <option>Instagram</option>
                  <option>LinkedIn</option>
                  <option>Facebook</option>
                  <option>X</option>
                </select>

                <button
                  onClick={handleGenerateContent}
                  disabled={generating}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    px-6
                    py-2.5
                    rounded-lg
                    font-semibold
                    hover:scale-[1.02]
                    transition
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                    disabled:hover:scale-100
                  "
                >
                  <Sparkles size={17} />

                  {generating
                    ? "Generating..."
                    : "Generate Content"}
                </button>

              </div>

              {/* Error */}
              {generateError && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {generateError}
                </div>
              )}

            </div>

            {/* ========================= */}
            {/* GENERATED RESULT */}
            {/* ========================= */}

            {generatedContent && (
              <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

                <div className="flex items-center justify-between mb-6">

                  <div>
                    <h2 className="text-xl font-bold">
                      AI Generated Content
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Choose the caption style that fits your brand.
                    </p>
                  </div>

                  <Sparkles
                    className="text-cyan-400"
                    size={22}
                  />

                </div>

                {/* Captions */}
                <div className="space-y-4">

                  {generatedContent.captions?.map(
                    (caption) => (
                      <div
                        key={caption._id || caption.style}
                        className="
                          bg-[#181818]
                          border
                          border-white/10
                          rounded-xl
                          p-5
                        "
                      >

                        <div className="flex items-center justify-between mb-3">

                          <span className="text-cyan-400 font-semibold">
                            {caption.style}
                          </span>

                        </div>

                        <p className="text-gray-300 leading-7">
                          {caption.text}
                        </p>

                      </div>
                    )
                  )}

                </div>

                {/* Hashtags */}
                <div className="mt-6">

                  <h3 className="text-sm font-semibold text-gray-300 mb-3">
                    Hashtags
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {generatedContent.hashtags?.map(
                      (hashtag, index) => {

                        const formatted =
                          hashtag.startsWith("#")
                            ? hashtag
                            : `#${hashtag}`;

                        return (
                          <span
                            key={index}
                            className="
                              px-3
                              py-1.5
                              rounded-full
                              bg-blue-500/10
                              border
                              border-blue-500/20
                              text-blue-400
                              text-sm
                            "
                          >
                            {formatted}
                          </span>
                        );
                      }
                    )}

                  </div>

                </div>

                {/* CTA */}
                <div className="mt-6">

                  <h3 className="text-sm font-semibold text-gray-300 mb-2">
                    Call-To-Action
                  </h3>

                  <p className="text-gray-400">
                    {generatedContent.cta}
                  </p>

                </div>

                {/* Best Posting Time */}
                {generatedContent.bestPostingTime && (
                  <div className="mt-6 grid md:grid-cols-2 gap-4">

                    <div className="bg-[#181818] rounded-xl p-5">

                      <div className="flex items-center gap-2 text-gray-400">
                        <CalendarDays size={17} />
                        <span className="text-sm">
                          Best Posting Time
                        </span>
                      </div>

                      <p className="text-white font-semibold mt-3">
                        {generatedContent.bestPostingTime.day}
                        {" • "}
                        {generatedContent.bestPostingTime.time}
                      </p>

                      <p className="text-gray-500 text-sm mt-2">
                        {generatedContent.bestPostingTime.reason}
                      </p>

                    </div>

                    {/* Engagement */}
                    {generatedContent.engagementPrediction && (
                      <div className="bg-[#181818] rounded-xl p-5">

                        <div className="flex items-center gap-2 text-gray-400">
                          <BarChart3 size={17} />

                          <span className="text-sm">
                            Engagement Prediction
                          </span>
                        </div>

                        <div className="flex items-end gap-2 mt-3">

                          <p className="text-3xl font-bold text-green-400">
                            {generatedContent.engagementPrediction.score}
                          </p>

                          <p className="text-gray-500 mb-1">
                            / 100
                          </p>

                          <span className="text-green-400 text-sm mb-1">
                            {generatedContent.engagementPrediction.level}
                          </span>

                        </div>

                        <p className="text-gray-500 text-sm mt-2">
                          {generatedContent.engagementPrediction.reason}
                        </p>

                      </div>
                    )}

                  </div>
                )}

                {/* Emoji Style */}
                {generatedContent.emojiStyle && (
                  <div className="mt-6">

                    <h3 className="text-sm font-semibold text-gray-300 mb-2">
                      Emoji Style
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {generatedContent.emojiStyle}
                    </p>

                  </div>
                )}

              </div>
            )}

            {/* ========================= */}
            {/* RECENT CONTENT */}
            {/* ========================= */}

            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-xl font-bold">
                    Recent Generated Content
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Your latest AI-generated posts.
                  </p>
                </div>

                <FileText
                  size={20}
                  className="text-gray-500"
                />

              </div>

              {dashboard?.recentPosts?.length > 0 ? (
                <div className="space-y-4">

                  {dashboard.recentPosts.map(
                    (post) => (
                      <div
                        key={post._id}
                        className="
                          bg-[#181818]
                          rounded-xl
                          p-4
                          border
                          border-white/5
                        "
                      >

                        <div className="flex justify-between gap-4">

                          <div>
                            <p className="text-white font-medium">
                              {post.brandName}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                              {post.platform} • {post.topic}
                            </p>
                          </div>

                          <span className="text-gray-600 text-xs">
                            {post.createdAt
                              ? new Date(
                                  post.createdAt
                                ).toLocaleDateString()
                              : ""}
                          </span>

                        </div>

                        {post.captions?.[0]?.text && (
                          <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                            {post.captions[0].text}
                          </p>
                        )}

                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="text-center py-8">

                  <FileText
                    size={30}
                    className="text-gray-600 mx-auto"
                  />

                  <p className="text-gray-500 mt-3">
                    No generated content yet.
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* ========================= */}
          {/* RIGHT SIDE */}
          {/* ========================= */}

          <div className="space-y-6">

            {/* Platform Breakdown */}
            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-lg font-bold">
                    Platform Breakdown
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Scheduled content by platform
                  </p>
                </div>

                <BarChart3
                  size={20}
                  className="text-gray-500"
                />

              </div>

              {dashboard?.platformBreakdown &&
              Object.keys(
                dashboard.platformBreakdown
              ).length > 0 ? (

                <div className="space-y-4">

                  {Object.entries(
                    dashboard.platformBreakdown
                  ).map(
                    ([name, count]) => (
                      <div
                        key={name}
                        className="flex items-center justify-between"
                      >

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                            <Globe2
  size={18}
  className="text-pink-400"
/>
                          </div>

                          <span className="text-gray-300">
                            {name}
                          </span>

                        </div>

                        <span className="text-white font-semibold">
                          {count}
                        </span>

                      </div>
                    )
                  )}

                </div>

              ) : (
                <p className="text-gray-500 text-sm">
                  No scheduled platform data yet.
                </p>
              )}

            </div>

            {/* AI Insights */}
            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={19}
                  className="text-cyan-400"
                />

                <h2 className="text-lg font-bold">
                  AI Insights
                </h2>

              </div>

              <p className="text-gray-400 text-sm leading-6 mt-4">
                {dashboard?.insights?.summary ||
                  "Generate content and schedule posts to receive AI insights."}
              </p>

              {dashboard?.insights?.bestPlatform && (
                <div className="mt-5 p-4 bg-[#181818] rounded-xl">

                  <p className="text-gray-500 text-xs uppercase">
                    Best Platform
                  </p>

                  <p className="text-white font-semibold mt-1">
                    {dashboard.insights.bestPlatform}
                  </p>

                </div>
              )}

              {dashboard?.insights?.postingSuggestion && (
                <div className="mt-3 p-4 bg-[#181818] rounded-xl">

                  <p className="text-gray-500 text-xs uppercase">
                    Posting Suggestion
                  </p>

                  <p className="text-gray-300 text-sm mt-1 leading-6">
                    {dashboard.insights.postingSuggestion}
                  </p>

                </div>
              )}

            </div>

            {/* Quick Actions */}
            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <h2 className="text-lg font-bold mb-5">
                Quick Actions
              </h2>

              <div className="space-y-3">

                <button
                  onClick={() => {
                    document
                      .getElementById(
                        "content-generator"
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    bg-[#181818]
                    hover:bg-[#202020]
                    p-4
                    rounded-xl
                    transition
                  "
                >

                  <div className="flex items-center gap-3">
                    <Sparkles
                      size={18}
                      className="text-cyan-400"
                    />

                    <span>
                      Generate Content
                    </span>
                  </div>

                  <span className="text-gray-500">
                    →
                  </span>

                </button>

                <button
                  onClick={() =>
                    navigate("/schedule")
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    bg-[#181818]
                    hover:bg-[#202020]
                    p-4
                    rounded-xl
                    transition
                  "
                >

                  <div className="flex items-center gap-3">
                    <CalendarDays
                      size={18}
                      className="text-purple-400"
                    />

                    <span>
                      Schedule Post
                    </span>
                  </div>

                  <span className="text-gray-500">
                    →
                  </span>

                </button>

<button
  onClick={() => navigate("/brands")}
  className="
    w-full
    flex
    items-center
    justify-between
    bg-[#181818]
    hover:bg-[#202020]
    p-4
    rounded-xl
    transition
  "
>
  <div className="flex items-center gap-3">
    <Users
      size={18}
      className="text-blue-400"
    />

    <span>
      Manage Brands
    </span>
  </div>

  <span className="text-gray-500">
    →
  </span>
</button>


<button
  onClick={() => navigate("/content-history")}
  className="
    w-full
    flex
    items-center
    justify-between
    bg-[#181818]
    hover:bg-[#202020]
    p-4
    rounded-xl
    transition
  "
>
  <div className="flex items-center gap-3">
    <FileText
      size={18}
      className="text-green-400"
    />

    <span>
      Content History
    </span>
  </div>

  <span className="text-gray-500">
    →
  </span>
</button>


<button
  onClick={() => navigate("/replies")}
  className="
    w-full
    flex
    items-center
    justify-between
    bg-[#181818]
    hover:bg-[#202020]
    p-4
    rounded-xl
    transition
  "
>
  <div className="flex items-center gap-3">
    <Send
      size={18}
      className="text-cyan-400"
    />

    <span>
      AI Reply Assistant
    </span>
  </div>

  <span className="text-gray-500">
    →
  </span>
</button>
              </div>
              

            </div>

            

            {/* Next Post */}
            <div className="bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex items-center gap-2 text-gray-400">

                <Clock3 size={18} />

                <span className="text-sm">
                  Scheduled Posts
                </span>

              </div>

              <h3 className="text-3xl text-white font-bold mt-4">
                {dashboard?.scheduledPosts ?? 0}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                posts currently scheduled
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}