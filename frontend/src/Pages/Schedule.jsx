import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CalendarDays,
  Clock,
  Loader2,
  AlertCircle,
  FileText,
  Globe2,
} from "lucide-react";

import api from "../api/axios";

export default function Schedule() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const [form, setForm] = useState({
    contentId: "",
    platform: "Instagram",
    scheduledDate: "",
    status: "Scheduled",
    notes: "",
  });

  const platforms = [
    "Instagram",
    "TikTok",
    "Facebook",
    "LinkedIn",
    "X",
  ];

  // =========================
  // FETCH SCHEDULED POSTS
  // =========================

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/schedule");

      console.log(
        "SCHEDULE RESPONSE:",
        response.data
      );

      setPosts(response.data.data || []);

    } catch (error) {
      console.error(
        "FETCH SCHEDULE ERROR:",
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
        "Failed to load scheduled posts."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH GENERATED CONTENT
  // =========================

  const fetchContent = async () => {
    try {
      const response = await api.get(
        "/content/history"
      );

      console.log(
        "CONTENT RESPONSE:",
        response.data
      );

      const result = response.data.data;

      if (Array.isArray(result)) {
        setContent(result);
      } else if (Array.isArray(result?.data)) {
        setContent(result.data);
      } else {
        setContent([]);
      }

    } catch (error) {
      console.error(
        "FETCH CONTENT ERROR:",
        error
      );

      /*
       * Content history is used only for selecting
       * a generated content item.
       *
       * If it fails, scheduling can still be
       * attempted using a manually entered ID.
       */
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchContent();
  }, []);

  // =========================
  // FORM
  // =========================

  const resetForm = () => {
    setForm({
      contentId: "",
      platform: "Instagram",
      scheduledDate: "",
      status: "Scheduled",
      notes: "",
    });

    setEditingPost(null);
    setShowForm(false);
    setError("");
  };

  const openCreateForm = () => {
    setEditingPost(null);

    setForm({
      contentId:
        content.length > 0
          ? content[0]._id
          : "",
      platform: "Instagram",
      scheduledDate: "",
      status: "Scheduled",
      notes: "",
    });

    setError("");
    setShowForm(true);
  };

  const openEditForm = (post) => {
    setEditingPost(post);

    setForm({
      contentId:
        typeof post.contentId === "object"
          ? post.contentId?._id
          : post.contentId || "",

      platform: post.platform || "Instagram",

      scheduledDate: post.scheduledDate
        ? formatDateForInput(
            post.scheduledDate
          )
        : "",

      status: post.status || "Scheduled",

      notes: post.notes || "",
    });

    setError("");
    setShowForm(true);
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDateForInput = (date) => {
    const d = new Date(date);

    if (Number.isNaN(d.getTime())) {
      return "";
    }

    const year = d.getFullYear();

    const month = String(
      d.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      d.getDate()
    ).padStart(2, "0");

    const hours = String(
      d.getHours()
    ).padStart(2, "0");

    const minutes = String(
      d.getMinutes()
    ).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // =========================
  // INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.contentId) {
      setError(
        "Please select generated content."
      );
      return;
    }

    if (!form.platform) {
      setError("Please select a platform.");
      return;
    }

    if (!form.scheduledDate) {
      setError(
        "Please select a scheduled date and time."
      );
      return;
    }

    const selectedDate = new Date(
      form.scheduledDate
    );

    if (
      Number.isNaN(selectedDate.getTime())
    ) {
      setError(
        "Please enter a valid date and time."
      );
      return;
    }

    if (
      !editingPost &&
      selectedDate <= new Date()
    ) {
      setError(
        "Scheduled date must be in the future."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        contentId: form.contentId,
        platform: form.platform,
        scheduledDate:
          selectedDate.toISOString(),
        status: form.status,
        notes: form.notes.trim(),
      };

      console.log(
        "SCHEDULE PAYLOAD:",
        payload
      );

      if (editingPost) {
        await api.put(
          `/schedule/${editingPost._id}`,
          payload
        );
      } else {
        await api.post(
          "/schedule",
          payload
        );
      }

      await fetchPosts();

      resetForm();

    } catch (error) {
      console.error(
        "SAVE SCHEDULE ERROR:",
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
        "Failed to save scheduled post."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (post) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this scheduled post?"
      );

    if (!confirmed) return;

    try {
      setError("");

      await api.delete(
        `/schedule/${post._id}`
      );

      setPosts((prev) =>
        prev.filter(
          (item) =>
            item._id !== post._id
        )
      );

    } catch (error) {
      console.error(
        "DELETE SCHEDULE ERROR:",
        error
      );

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setError(
        error.response?.data?.message ||
        "Failed to delete scheduled post."
      );
    }
  };

  // =========================
  // CONTENT HELPERS
  // =========================

  const getContentText = (post) => {
    const item =
      typeof post.contentId === "object"
        ? post.contentId
        : content.find(
            (item) =>
              item._id === post.contentId
          );

    if (!item) {
      return "Generated content";
    }

    if (item.caption) {
      return item.caption;
    }

    if (
      Array.isArray(item.captions) &&
      item.captions.length > 0
    ) {
      return (
        item.captions[0]?.text ||
        "Generated content"
      );
    }

    return "Generated content";
  };

  const getContentBrand = (post) => {
    const item =
      typeof post.contentId === "object"
        ? post.contentId
        : content.find(
            (item) =>
              item._id === post.contentId
          );

    return item?.brandName || "Unknown Brand";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Failed":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "Draft":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      default:
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">

        <div className="text-center">

          <Loader2
            size={34}
            className="text-cyan-400 mx-auto animate-spin"
          />

          <p className="text-gray-400 mt-4">
            Loading scheduled posts...
          </p>

        </div>

      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="fixed inset-0 pointer-events-none">

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

            <p className="text-gray-500 text-sm">
              SocialAI
            </p>

            <h1 className="
              text-3xl
              md:text-4xl
              font-bold
              mt-1
            ">
              Schedule Posts
            </h1>

            <p className="
              text-gray-400
              mt-2
            ">
              Plan and manage your upcoming social media posts.
            </p>

          </div>

          <button
            onClick={openCreateForm}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              bg-blue-600
              hover:bg-blue-500
              rounded-xl
              font-semibold
              transition
            "
          >
            <Plus size={19} />
            Schedule Post
          </button>

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

        {/* FORM */}

        {showForm && (
          <div className="
            mb-8
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

              <div>

                <h2 className="text-xl font-bold">
                  {editingPost
                    ? "Edit Scheduled Post"
                    : "Schedule New Post"}
                </h2>

                <p className="
                  text-gray-500
                  text-sm
                  mt-1
                ">
                  Choose generated content and schedule when it should be posted.
                </p>

              </div>

              <button
                type="button"
                onClick={resetForm}
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

            <form onSubmit={handleSubmit}>

              {/* CONTENT */}

              <div className="mb-5">

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Generated Content *
                </label>

                {content.length > 0 ? (
                  <select
                    name="contentId"
                    value={form.contentId}
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

                    <option value="">
                      Select generated content
                    </option>

                    {content.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.brandName} —{" "}
                        {item.topic}
                      </option>
                    ))}

                  </select>
                ) : (
                  <div className="
                    bg-[#181818]
                    border
                    border-white/10
                    rounded-xl
                    p-4
                  ">

                    <p className="
                      text-yellow-400
                      text-sm
                    ">
                      No generated content found.
                    </p>

                    <p className="
                      text-gray-500
                      text-xs
                      mt-1
                    ">
                      Generate AI content first, then return here to schedule it.
                    </p>

                  </div>
                )}

              </div>

              {/* PLATFORM + DATE */}

              <div className="
                grid
                md:grid-cols-2
                gap-5
              ">

                <div>

                  <label className="
                    block
                    text-sm
                    text-gray-400
                    mb-2
                  ">
                    Platform *
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
                    Scheduled Date & Time *
                  </label>

                  <div className="relative">

                    <CalendarDays
                      size={18}
                      className="
                        absolute
                        left-4
                        top-3.5
                        text-gray-500
                      "
                    />

                    <input
                      type="datetime-local"
                      name="scheduledDate"
                      value={
                        form.scheduledDate
                      }
                      onChange={handleChange}
                      className="
                        w-full
                        bg-[#181818]
                        border
                        border-white/10
                        rounded-xl
                        pl-11
                        pr-4
                        py-3
                        text-white
                        outline-none
                        focus:border-blue-500
                      "
                    />

                  </div>

                </div>

              </div>

              {/* STATUS */}

              <div className="mt-5">

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
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

                  <option value="Scheduled">
                    Scheduled
                  </option>

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Published">
                    Published
                  </option>

                  <option value="Failed">
                    Failed
                  </option>

                </select>

              </div>

              {/* NOTES */}

              <div className="mt-5">

                <label className="
                  block
                  text-sm
                  text-gray-400
                  mb-2
                ">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional notes..."
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
                justify-end
                gap-3
                mt-6
              ">

                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-white/5
                    hover:bg-white/10
                    text-gray-300
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    content.length === 0
                  }
                  className="
                    flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    text-white
                    font-semibold
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />

                      {editingPost
                        ? "Update Schedule"
                        : "Schedule Post"}
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>
        )}

        {/* POSTS */}

        {posts.length === 0 ? (
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
              bg-blue-500/10
              flex
              items-center
              justify-center
            ">
              <CalendarDays
                size={30}
                className="text-blue-400"
              />
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-5
            ">
              No scheduled posts
            </h2>

            <p className="
              text-gray-500
              mt-2
              max-w-md
              mx-auto
            ">
              Generate some AI content and schedule your first post.
            </p>

          </div>
        ) : (
          <div className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-5
          ">

            {posts.map((post) => (
              <div
                key={post._id}
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

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      w-11
                      h-11
                      rounded-xl
                      bg-blue-500/10
                      border
                      border-white/10
                      flex
                      items-center
                      justify-center
                    ">

                      <Globe2
                        size={20}
                        className="text-cyan-400"
                      />

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {getContentBrand(
                          post
                        )}
                      </h3>

                      <p className="
                        text-gray-500
                        text-sm
                      ">
                        {post.platform}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-1">

                    <button
                      onClick={() =>
                        openEditForm(post)
                      }
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-white/5
                        hover:bg-blue-500/10
                        text-gray-400
                        hover:text-blue-400
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(post)
                      }
                      className="
                        w-9
                        h-9
                        rounded-lg
                        bg-white/5
                        hover:bg-red-500/10
                        text-gray-400
                        hover:text-red-400
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

                {/* STATUS */}

                <div className="mt-5">

                  <span
                    className={`
                      inline-flex
                      px-3
                      py-1
                      rounded-full
                      border
                      text-xs
                      font-medium
                      ${getStatusClass(
                        post.status
                      )}
                    `}
                  >
                    {post.status}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="
                  mt-5
                  p-4
                  rounded-xl
                  bg-white/[0.03]
                  border
                  border-white/5
                ">

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-gray-500
                    text-xs
                    mb-2
                  ">

                    <FileText size={13} />

                    Generated Content

                  </div>

                  <p className="
                    text-gray-300
                    text-sm
                    leading-6
                    line-clamp-4
                  ">
                    {getContentText(post)}
                  </p>

                </div>

                {/* DATE */}

                <div className="
                  mt-5
                  flex
                  items-center
                  gap-2
                  text-gray-400
                  text-sm
                ">

                  <Clock size={15} />

                  {post.scheduledDate
                    ? new Date(
                        post.scheduledDate
                      ).toLocaleString()
                    : "No date"}

                </div>

                {/* NOTES */}

                {post.notes && (
                  <div className="
                    mt-3
                    text-gray-500
                    text-xs
                    leading-5
                  ">
                    {post.notes}
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}