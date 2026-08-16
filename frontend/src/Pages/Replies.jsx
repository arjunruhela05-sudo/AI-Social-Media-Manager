import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  AlertCircle,
  Loader2,
} from "lucide-react";

import api from "../api/axios";

export default function Replies() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brandName: "",
    platform: "Instagram",
    tone: "Friendly",
    customerComment: "",
  });

  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const platforms = [
    "Instagram",
    "TikTok",
    "Facebook",
    "LinkedIn",
    "X",
  ];

  const tones = [
    "Professional",
    "Friendly",
    "Humorous",
    "Bold",
    "Energetic",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateReply = async (e) => {
    e.preventDefault();

    setError("");
    setCopied(false);
    setReply("");

    if (!form.brandName.trim()) {
      setError("Please enter a brand name.");
      return;
    }

    if (!form.customerComment.trim()) {
      setError("Please enter the customer comment.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        brandName: form.brandName.trim(),
        platform: form.platform,
        tone: form.tone,
        customerComment:
          form.customerComment.trim(),
      };

      console.log(
        "REPLY REQUEST:",
        payload
      );

      const response = await api.post(
        "/replies/generate",
        payload
      );

      console.log(
        "REPLY RESPONSE:",
        response.data
      );

      const generatedReply =
        response.data?.data?.reply;

      if (!generatedReply) {
        throw new Error(
          "AI response did not contain a reply."
        );
      }

      setReply(generatedReply);

    } catch (error) {
      console.error(
        "GENERATE REPLY ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to generate reply."
      );

    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(
        reply
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

    } catch (error) {
      console.error(
        "COPY ERROR:",
        error
      );
    }
  };

  const reset = () => {
    setForm({
      brandName: "",
      platform: "Instagram",
      tone: "Friendly",
      customerComment: "",
    });

    setReply("");
    setError("");
    setCopied(false);
  };

  return (
    <div className="
      min-h-screen
      bg-[#050505]
      text-white
    ">

      {/* Background */}

      <div className="
        fixed
        inset-0
        pointer-events-none
      ">

        <div className="
          absolute
          top-20
          left-1/3
          w-96
          h-96
          bg-blue-600/10
          blur-[150px]
          rounded-full
        " />

        <div className="
          absolute
          bottom-20
          right-20
          w-96
          h-96
          bg-cyan-500/10
          blur-[150px]
          rounded-full
        " />

      </div>

      <div className="
        relative
        max-w-6xl
        mx-auto
        px-6
        py-10
      ">

        {/* HEADER */}

        <div className="mb-10">

          <p className="
            text-gray-500
            text-sm
          ">
            SocialAI
          </p>

          <h1 className="
            text-3xl
            md:text-4xl
            font-bold
            mt-1
          ">
            AI Reply Assistant
          </h1>

          <p className="
            text-gray-400
            mt-2
            max-w-2xl
          ">
            Generate contextual replies to customer comments in your brand's voice.
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="
            mb-6
            p-4
            rounded-xl
            bg-red-500/10
            border
            border-red-500/20
            text-red-400
            flex
            items-start
            gap-3
          ">

            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <p>{error}</p>

          </div>
        )}

        <div className="
          grid
          lg:grid-cols-2
          gap-6
        ">

          {/* ========================= */}
          {/* INPUT */}
          {/* ========================= */}

          <div className="
            bg-[#101010]
            border
            border-white/10
            rounded-2xl
            p-6
          ">

            <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-blue-500/10
                flex
                items-center
                justify-center
              ">

                <MessageCircle
                  size={21}
                  className="text-blue-400"
                />

              </div>

              <div>

                <h2 className="font-bold">
                  Customer Comment
                </h2>

                <p className="
                  text-gray-500
                  text-sm
                ">
                  Tell the AI what you're responding to.
                </p>

              </div>

            </div>

            <form onSubmit={generateReply}>

              {/* BRAND */}

              <div className="mb-5">

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Brand Name
                </label>

                <input
                  name="brandName"
                  value={form.brandName}
                  onChange={handleChange}
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
                    placeholder-gray-600
                    outline-none
                    focus:border-blue-500
                  "
                />

              </div>

              {/* PLATFORM + TONE */}

              <div className="
                grid
                sm:grid-cols-2
                gap-4
                mb-5
              ">

                <div>

                  <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                  ">
                    Platform
                  </label>

                  <select
                    name="platform"
                    value={form.platform}
                    onChange={handleChange}
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
                  >

                    {platforms.map(
                      (platform) => (
                        <option
                          key={platform}
                          value={platform}
                        >
                          {platform}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div>

                  <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                  ">
                    Tone
                  </label>

                  <select
                    name="tone"
                    value={form.tone}
                    onChange={handleChange}
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
                  >

                    {tones.map((tone) => (
                      <option
                        key={tone}
                        value={tone}
                      >
                        {tone}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* COMMENT */}

              <div className="mb-5">

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Customer Comment
                </label>

                <textarea
                  name="customerComment"
                  value={
                    form.customerComment
                  }
                  onChange={handleChange}
                  placeholder="Your new shoes look amazing! 🔥"
                  rows={7}
                  className="
                    w-full
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

              {/* ACTIONS */}

              <div className="
                flex
                gap-3
              ">

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex-1
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    font-semibold
                    disabled:opacity-50
                  "
                >

                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />

                      Generate Reply
                    </>
                  )}

                </button>

                <button
                  type="button"
                  onClick={reset}
                  className="
                    px-4
                    rounded-xl
                    bg-white/5
                    hover:bg-white/10
                    text-gray-400
                  "
                  title="Reset"
                >

                  <RotateCcw size={18} />

                </button>

              </div>

            </form>

          </div>

          {/* ========================= */}
          {/* RESULT */}
          {/* ========================= */}

          <div className="
            bg-[#101010]
            border
            border-white/10
            rounded-2xl
            p-6
          ">

            <div className="
              flex
              items-center
              justify-between
              mb-6
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-cyan-500/10
                  flex
                  items-center
                  justify-center
                ">

                  <Sparkles
                    size={21}
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <h2 className="font-bold">
                    AI Reply
                  </h2>

                  <p className="
                    text-gray-500
                    text-sm
                  ">
                    Your generated response
                  </p>

                </div>

              </div>

              {reply && (
                <button
                  onClick={copyReply}
                  className="
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    bg-white/5
                    hover:bg-white/10
                    text-gray-300
                    text-sm
                  "
                >

                  {copied ? (
                    <>
                      <Check
                        size={15}
                        className="text-green-400"
                      />

                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} />

                      Copy
                    </>
                  )}

                </button>
              )}

            </div>

            {reply ? (
              <div>

                <div className="
                  p-6
                  rounded-xl
                  bg-[#181818]
                  border
                  border-cyan-500/10
                ">

                  <p className="
                    text-gray-200
                    leading-8
                  ">
                    {reply}
                  </p>

                </div>

                <button
                  onClick={generateReply}
                  disabled={loading}
                  className="
                    mt-5
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3
                    rounded-xl
                    bg-white/5
                    hover:bg-white/10
                    text-gray-300
                  "
                >

                  <Sparkles size={16} />

                  Generate Another Reply

                </button>

              </div>
            ) : (
              <div className="
                h-[400px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                border
                border-dashed
                border-white/10
                rounded-xl
              ">

                <MessageCircle
                  size={38}
                  className="text-gray-700"
                />

                <h3 className="
                  text-gray-400
                  font-semibold
                  mt-4
                ">
                  No reply generated yet
                </h3>

                <p className="
                  text-gray-600
                  text-sm
                  mt-2
                  max-w-sm
                ">
                  Enter a customer comment and click Generate Reply to create an AI-powered response.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}