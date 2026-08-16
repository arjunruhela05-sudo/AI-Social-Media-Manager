import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Trash2,
  Eye,
  X,
  CalendarDays,
  BarChart3,
  Loader2,
  AlertCircle,
  Hash,
  Megaphone,
  Clock,
} from "lucide-react";

import api from "../api/axios";

export default function ContentHistory() {
  const navigate = useNavigate();

  const [content, setContent] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedContent, setSelectedContent] =
    useState(null);

  // =========================
  // FETCH HISTORY
  // =========================

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/content/history?page=${page}&limit=10`
      );

      console.log(
        "CONTENT HISTORY RESPONSE:",
        response.data
      );

      const result = response.data.data;

      setContent(result?.data || []);

      setPagination(
        result?.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 1,
        }
      );

    } catch (error) {
      console.error(
        "CONTENT HISTORY ERROR:",
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
        "Failed to load content history."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(1);
  }, []);

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Delete content for "${item.brandName}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/content/${item._id}`
      );

      setSelectedContent(null);

      await fetchHistory(
        pagination.page
      );

    } catch (error) {
      console.error(
        "DELETE CONTENT ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to delete content."
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="
        min-h-screen
        bg-[#050505]
        flex
        items-center
        justify-center
      ">

        <div className="text-center">

          <Loader2
            size={34}
            className="
              text-cyan-400
              mx-auto
              animate-spin
            "
          />

          <p className="
            text-gray-400
            mt-4
          ">
            Loading content history...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

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
        max-w-7xl
        mx-auto
        px-6
        py-10
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          justify-between
          gap-5
          mb-10
        ">

          <div>

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
              Content History
            </h1>

            <p className="
              text-gray-400
              mt-2
            ">
              View and manage your AI-generated social media content.
            </p>

          </div>

          <div className="
            flex
            items-center
            gap-2
            text-gray-500
            text-sm
          ">

            <Sparkles size={17} />

            {pagination.total} generated items

          </div>

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
              className="mt-0.5"
            />

            <p>{error}</p>

          </div>
        )}

        {/* EMPTY */}

        {content.length === 0 ? (
          <div className="
            bg-[#101010]
            border
            border-white/10
            rounded-2xl
            p-12
            text-center
          ">

            <div className="
              w-16
              h-16
              mx-auto
              rounded-2xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
            ">

              <Sparkles
                size={30}
                className="text-cyan-400"
              />

            </div>

            <h2 className="
              text-xl
              font-bold
              mt-5
            ">
              No generated content yet
            </h2>

            <p className="
              text-gray-500
              mt-2
              max-w-md
              mx-auto
            ">
              Generate your first AI-powered social media post from the dashboard.
            </p>

            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="
                mt-6
                px-5
                py-3
                rounded-xl
                bg-blue-600
                hover:bg-blue-500
                font-semibold
              "
            >
              Go to Dashboard
            </button>

          </div>
        ) : (
          <>
            {/* CONTENT GRID */}

            <div className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
            ">

              {content.map((item) => (
                <div
                  key={item._id}
                  className="
                    bg-[#101010]
                    border
                    border-white/10
                    rounded-2xl
                    p-6
                    hover:border-white/20
                    transition
                  "
                >

                  {/* CARD HEADER */}

                  <div className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  ">

                    <div>

                      <h2 className="
                        text-lg
                        font-bold
                      ">
                        {item.brandName}
                      </h2>

                      <p className="
                        text-gray-500
                        text-sm
                        mt-1
                      ">
                        {item.industry}
                      </p>

                    </div>

                    <span className="
                      px-2.5
                      py-1
                      rounded-full
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      text-blue-400
                      text-xs
                    ">
                      {item.platform}
                    </span>

                  </div>

                  {/* TOPIC */}

                  <div className="mt-5">

                    <p className="
                      text-gray-600
                      text-xs
                      uppercase
                      mb-2
                    ">
                      Topic
                    </p>

                    <p className="
                      text-gray-300
                      text-sm
                      line-clamp-2
                    ">
                      {item.topic}
                    </p>

                  </div>

                  {/* CAPTION PREVIEW */}

                  <div className="
                    mt-5
                    p-4
                    rounded-xl
                    bg-white/[0.03]
                    border
                    border-white/5
                  ">

                    <p className="
                      text-gray-600
                      text-xs
                      uppercase
                      mb-2
                    ">
                      Caption
                    </p>

                    <p className="
                      text-gray-400
                      text-sm
                      leading-6
                      line-clamp-4
                    ">

                      {item.captions?.[0]?.text ||
                        item.caption ||
                        "No caption available."}

                    </p>

                  </div>

                  {/* HASHTAGS */}

                  {item.hashtags?.length > 0 && (
                    <div className="
                      flex
                      flex-wrap
                      gap-1.5
                      mt-4
                    ">

                      {item.hashtags
                        .slice(0, 4)
                        .map(
                          (
                            hashtag,
                            index
                          ) => (
                            <span
                              key={index}
                              className="
                                text-blue-400
                                text-xs
                              "
                            >
                              {hashtag.startsWith(
                                "#"
                              )
                                ? hashtag
                                : `#${hashtag}`}
                            </span>
                          )
                        )}

                      {item.hashtags.length >
                        4 && (
                        <span className="
                          text-gray-600
                          text-xs
                        ">
                          +
                          {item.hashtags.length -
                            4}
                        </span>
                      )}

                    </div>
                  )}

                  {/* DATE */}

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-gray-600
                    text-xs
                    mt-5
                  ">

                    <Clock size={13} />

                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleString()
                      : "Unknown date"}

                  </div>

                  {/* ACTIONS */}

                  <div className="
                    flex
                    gap-2
                    mt-5
                    pt-4
                    border-t
                    border-white/5
                  ">

                    <button
                      onClick={() =>
                        setSelectedContent(
                          item
                        )
                      }
                      className="
                        flex-1
                        flex
                        items-center
                        justify-center
                        gap-2
                        px-4
                        py-2.5
                        rounded-xl
                        bg-white/5
                        hover:bg-white/10
                        text-gray-300
                        text-sm
                      "
                    >

                      <Eye size={16} />

                      View

                    </button>

                    <button
                      onClick={() =>
                        handleDelete(item)
                      }
                      className="
                        w-11
                        rounded-xl
                        bg-red-500/5
                        hover:bg-red-500/10
                        text-red-400
                        flex
                        items-center
                        justify-center
                      "
                      title="Delete content"
                    >

                      <Trash2 size={16} />

                    </button>

                  </div>

                </div>
              ))}

            </div>

            {/* PAGINATION */}

            {pagination.totalPages > 1 && (
              <div className="
                flex
                items-center
                justify-center
                gap-3
                mt-8
              ">

                <button
                  disabled={
                    pagination.page <= 1
                  }
                  onClick={() =>
                    fetchHistory(
                      pagination.page - 1
                    )
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-white/5
                    hover:bg-white/10
                    text-gray-300
                    disabled:opacity-30
                  "
                >
                  Previous
                </button>

                <span className="
                  text-gray-500
                  text-sm
                ">
                  Page {pagination.page} of{" "}
                  {pagination.totalPages}
                </span>

                <button
                  disabled={
                    pagination.page >=
                    pagination.totalPages
                  }
                  onClick={() =>
                    fetchHistory(
                      pagination.page + 1
                    )
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    bg-white/5
                    hover:bg-white/10
                    text-gray-300
                    disabled:opacity-30
                  "
                >
                  Next
                </button>

              </div>
            )}

          </>
        )}

      </div>

      {/* ========================= */}
      {/* DETAIL MODAL */}
      {/* ========================= */}

      {selectedContent && (
        <div className="
          fixed
          inset-0
          z-50
          bg-black/70
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-6
        ">

          <div className="
            w-full
            max-w-3xl
            max-h-[90vh]
            overflow-y-auto
            bg-[#101010]
            border
            border-white/10
            rounded-2xl
            p-6
          ">

            {/* MODAL HEADER */}

            <div className="
              flex
              items-start
              justify-between
              gap-4
              mb-6
            ">

              <div>

                <p className="
                  text-cyan-400
                  text-sm
                ">
                  {selectedContent.platform}
                </p>

                <h2 className="
                  text-2xl
                  font-bold
                  mt-1
                ">
                  {selectedContent.brandName}
                </h2>

                <p className="
                  text-gray-500
                  text-sm
                  mt-1
                ">
                  {selectedContent.topic}
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedContent(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-white/5
                  hover:bg-white/10
                  flex
                  items-center
                  justify-center
                  text-gray-400
                "
              >
                <X size={19} />
              </button>

            </div>

            {/* CAPTIONS */}

            <div>

              <div className="
                flex
                items-center
                gap-2
                mb-4
              ">

                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />

                <h3 className="
                  font-semibold
                ">
                  Caption Variants
                </h3>

              </div>

              <div className="space-y-4">

                {selectedContent.captions?.map(
                  (caption) => (
                    <div
                      key={
                        caption._id ||
                        caption.style
                      }
                      className="
                        bg-[#181818]
                        border
                        border-white/5
                        rounded-xl
                        p-5
                      "
                    >

                      <p className="
                        text-cyan-400
                        text-sm
                        font-semibold
                        mb-2
                      ">
                        {caption.style}
                      </p>

                      <p className="
                        text-gray-300
                        text-sm
                        leading-7
                      ">
                        {caption.text}
                      </p>

                    </div>
                  )
                )}

                {!selectedContent.captions?.length &&
                  selectedContent.caption && (
                    <div className="
                      bg-[#181818]
                      rounded-xl
                      p-5
                    ">
                      <p className="
                        text-gray-300
                        text-sm
                        leading-7
                      ">
                        {selectedContent.caption}
                      </p>
                    </div>
                  )}

              </div>

            </div>

            {/* HASHTAGS */}

            {selectedContent.hashtags?.length > 0 && (
              <div className="mt-7">

                <div className="
                  flex
                  items-center
                  gap-2
                  mb-3
                ">

                  <Hash
                    size={18}
                    className="text-blue-400"
                  />

                  <h3 className="font-semibold">
                    Hashtags
                  </h3>

                </div>

                <div className="
                  flex
                  flex-wrap
                  gap-2
                ">

                  {selectedContent.hashtags.map(
                    (
                      hashtag,
                      index
                    ) => (
                      <span
                        key={index}
                        className="
                          px-3
                          py-1.5
                          rounded-full
                          bg-blue-500/10
                          text-blue-400
                          text-sm
                        "
                      >
                        {hashtag.startsWith(
                          "#"
                        )
                          ? hashtag
                          : `#${hashtag}`}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

            {/* CTA */}

            {selectedContent.cta && (
              <div className="mt-7">

                <div className="
                  flex
                  items-center
                  gap-2
                  mb-3
                ">

                  <Megaphone
                    size={18}
                    className="text-purple-400"
                  />

                  <h3 className="font-semibold">
                    Call-To-Action
                  </h3>

                </div>

                <p className="
                  text-gray-400
                  text-sm
                  leading-6
                ">
                  {selectedContent.cta}
                </p>

              </div>
            )}

            {/* BEST POSTING TIME */}

            {selectedContent.bestPostingTime && (
              <div className="
                mt-7
                grid
                md:grid-cols-2
                gap-4
              ">

                <div className="
                  bg-[#181818]
                  rounded-xl
                  p-5
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-gray-400
                  ">

                    <CalendarDays
                      size={17}
                    />

                    <span className="text-sm">
                      Best Posting Time
                    </span>

                  </div>

                  <p className="
                    text-white
                    font-semibold
                    mt-3
                  ">
                    {selectedContent
                      .bestPostingTime
                      .day}
                    {" • "}
                    {selectedContent
                      .bestPostingTime
                      .time}
                  </p>

                  <p className="
                    text-gray-500
                    text-sm
                    mt-2
                  ">
                    {selectedContent
                      .bestPostingTime
                      .reason}
                  </p>

                </div>

                {/* ENGAGEMENT */}

                {selectedContent.engagementPrediction && (
                  <div className="
                    bg-[#181818]
                    rounded-xl
                    p-5
                  ">

                    <div className="
                      flex
                      items-center
                      gap-2
                      text-gray-400
                    ">

                      <BarChart3
                        size={17}
                      />

                      <span className="text-sm">
                        Engagement Prediction
                      </span>

                    </div>

                    <div className="
                      flex
                      items-end
                      gap-2
                      mt-3
                    ">

                      <p className="
                        text-3xl
                        font-bold
                        text-green-400
                      ">
                        {
                          selectedContent
                            .engagementPrediction
                            .score
                        }
                      </p>

                      <span className="
                        text-gray-500
                        mb-1
                      ">
                        / 100
                      </span>

                      <span className="
                        text-green-400
                        text-sm
                        mb-1
                      ">
                        {
                          selectedContent
                            .engagementPrediction
                            .level
                        }
                      </span>

                    </div>

                    <p className="
                      text-gray-500
                      text-sm
                      mt-2
                    ">
                      {
                        selectedContent
                          .engagementPrediction
                          .reason
                      }
                    </p>

                  </div>
                )}

              </div>
            )}

            {/* EMOJI STYLE */}

            {selectedContent.emojiStyle && (
              <div className="mt-7">

                <h3 className="
                  font-semibold
                  mb-2
                ">
                  Emoji Style
                </h3>

                <p className="
                  text-gray-500
                  text-sm
                  leading-6
                ">
                  {selectedContent.emojiStyle}
                </p>

              </div>
            )}

            {/* DELETE */}

            <div className="
              flex
              justify-end
              mt-8
              pt-5
              border-t
              border-white/5
            ">

              <button
                onClick={() =>
                  handleDelete(
                    selectedContent
                  )
                }
                className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-red-500/10
                  hover:bg-red-500/20
                  text-red-400
                "
              >

                <Trash2 size={16} />

                Delete Content

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}