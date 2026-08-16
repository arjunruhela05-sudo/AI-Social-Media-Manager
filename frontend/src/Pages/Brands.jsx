  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import {
    Plus,
    Pencil,
    Trash2,
    X,
    Save,
    Building2,
    Globe2,
    AlertCircle,
    Loader2,
  } from "lucide-react";

  import api from "../api/axios";

  export default function Brands() {
    const navigate = useNavigate();

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [showForm, setShowForm] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);

    const [form, setForm] = useState({
      brandName: "",
      industry: "",
      tone: [],
      platforms: [],
      description: "",
    });

    const [toneInput, setToneInput] = useState("");

    const availablePlatforms = [
      "Instagram",
      "TikTok",
      "Facebook",
      "LinkedIn",
      "X",
    ];

    // =========================
    // FETCH BRANDS
    // =========================

    const fetchBrands = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/brands");

        console.log("BRANDS RESPONSE:", response.data);

        setBrands(response.data.data || []);

      } catch (error) {
        console.error("FETCH BRANDS ERROR:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
          "Failed to load brands."
        );
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBrands();
    }, []);

    // =========================
    // FORM HELPERS
    // =========================

    const resetForm = () => {
      setForm({
        brandName: "",
        industry: "",
        tone: [],
        platforms: [],
        description: "",
      });

      setToneInput("");
      setEditingBrand(null);
      setShowForm(false);
      setError("");
    };

    const openCreateForm = () => {
      setEditingBrand(null);

      setForm({
        brandName: "",
        industry: "",
        tone: [],
        platforms: [],
        description: "",
      });

      setToneInput("");
      setError("");
      setShowForm(true);
    };

    const openEditForm = (brand) => {
      setEditingBrand(brand);

      setForm({
        brandName: brand.brandName || "",
        industry: brand.industry || "",
        tone: brand.tone || [],
        platforms: brand.platforms || [],
        description: brand.description || "",
      });

      setToneInput("");
      setError("");
      setShowForm(true);
    };

    // =========================
    // INPUT HANDLERS
    // =========================

    const handleChange = (e) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const togglePlatform = (platform) => {
      setForm((prev) => ({
        ...prev,
        platforms: prev.platforms.includes(platform)
          ? prev.platforms.filter(
              (item) => item !== platform
            )
          : [...prev.platforms, platform],
      }));
    };

    const addTone = () => {
      const value = toneInput.trim();

      if (!value) return;

      if (
        form.tone.some(
          (tone) =>
            tone.toLowerCase() === value.toLowerCase()
        )
      ) {
        setToneInput("");
        return;
      }

      setForm((prev) => ({
        ...prev,
        tone: [...prev.tone, value],
      }));

      setToneInput("");
    };

    const removeTone = (toneToRemove) => {
      setForm((prev) => ({
        ...prev,
        tone: prev.tone.filter(
          (tone) => tone !== toneToRemove
        ),
      }));
    };

    // =========================
    // CREATE / UPDATE BRAND
    // =========================

    const handleSubmit = async (e) => {
      e.preventDefault();

      setError("");

      if (!form.brandName.trim()) {
        setError("Brand name is required.");
        return;
      }

      if (!form.industry.trim()) {
        setError("Industry is required.");
        return;
      }

      try {
        setSaving(true);

        const payload = {
          brandName: form.brandName.trim(),
          industry: form.industry.trim(),
          tone: form.tone,
          platforms: form.platforms,
          description: form.description.trim(),
        };

        let response;

        if (editingBrand) {
          response = await api.put(
            `/brands/${editingBrand._id}`,
            payload
          );
        } else {
          response = await api.post(
            "/brands",
            payload
          );
        }

        console.log(
          "BRAND SAVE RESPONSE:",
          response.data
        );

        await fetchBrands();

        resetForm();

      } catch (error) {
        console.error("SAVE BRAND ERROR:", error);

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
          "Failed to save brand."
        );
      } finally {
        setSaving(false);
      }
    };

    // =========================
    // DELETE BRAND
    // =========================

    const handleDelete = async (brand) => {
      const confirmed = window.confirm(
        `Are you sure you want to delete "${brand.brandName}"?`
      );

      if (!confirmed) return;

      try {
        setError("");

        await api.delete(
          `/brands/${brand._id}`
        );

        setBrands((prev) =>
          prev.filter(
            (item) => item._id !== brand._id
          )
        );

      } catch (error) {
        console.error(
          "DELETE BRAND ERROR:",
          error
        );

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        setError(
          error.response?.data?.message ||
          "Failed to delete brand."
        );
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
              Loading brands...
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

        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full" />

          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

            <div>
              <p className="text-gray-500 text-sm">
                SocialAI
              </p>

              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                Brand Management
              </h1>

              <p className="text-gray-400 mt-2">
                Manage the brands you create content for.
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
              Add Brand
            </button>

          </div>

          {/* ========================= */}
          {/* ERROR */}
          {/* ========================= */}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">

              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />

              <p>{error}</p>

            </div>
          )}

          {/* ========================= */}
          {/* FORM */}
          {/* ========================= */}

          {showForm && (
            <div className="mb-8 bg-[#101010] border border-white/10 rounded-2xl p-6">

              <div className="flex items-center justify-between mb-6">

                <div>
                  <h2 className="text-xl font-bold">
                    {editingBrand
                      ? "Edit Brand"
                      : "Create New Brand"}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Add your brand information for AI content generation.
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

                {/* Brand + Industry */}
                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Brand Name *
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

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Industry *
                    </label>

                    <input
                      name="industry"
                      value={form.industry}
                      onChange={handleChange}
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
                        placeholder-gray-600
                        outline-none
                        focus:border-blue-500
                      "
                    />
                  </div>

                </div>

                {/* Tone */}
                <div className="mt-5">

                  <label className="block text-sm text-gray-400 mb-2">
                    Brand Tone
                  </label>

                  <div className="flex gap-2">

                    <input
                      value={toneInput}
                      onChange={(e) =>
                        setToneInput(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTone();
                        }
                      }}
                      placeholder="Bold, Friendly, Professional..."
                      className="
                        flex-1
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

                    <button
                      type="button"
                      onClick={addTone}
                      className="
                        px-5
                        rounded-xl
                        bg-white/10
                        hover:bg-white/15
                        text-white
                      "
                    >
                      Add
                    </button>

                  </div>

                  {form.tone.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">

                      {form.tone.map((tone) => (
                        <span
                          key={tone}
                          className="
                            flex
                            items-center
                            gap-2
                            px-3
                            py-1.5
                            rounded-full
                            bg-cyan-500/10
                            border
                            border-cyan-500/20
                            text-cyan-400
                            text-sm
                          "
                        >
                          {tone}

                          <button
                            type="button"
                            onClick={() =>
                              removeTone(tone)
                            }
                            className="hover:text-white"
                          >
                            <X size={14} />
                          </button>

                        </span>
                      ))}

                    </div>
                  )}

                </div>

                {/* Platforms */}
                <div className="mt-5">

                  <label className="block text-sm text-gray-400 mb-3">
                    Platforms
                  </label>

                  <div className="flex flex-wrap gap-3">

                    {availablePlatforms.map(
                      (platform) => {
                        const selected =
                          form.platforms.includes(
                            platform
                          );

                        return (
                          <button
                            key={platform}
                            type="button"
                            onClick={() =>
                              togglePlatform(
                                platform
                              )
                            }
                            className={`
                              px-4
                              py-2.5
                              rounded-xl
                              border
                              text-sm
                              transition
                              ${
                                selected
                                  ? "bg-blue-500/15 border-blue-500/40 text-blue-400"
                                  : "bg-[#181818] border-white/10 text-gray-400 hover:border-white/20"
                              }
                            `}
                          >
                            {platform}
                          </button>
                        );
                      }
                    )}

                  </div>

                </div>

                {/* Description */}
                <div className="mt-5">

                  <label className="block text-sm text-gray-400 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your brand, audience, products, or positioning..."
                    rows={4}
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

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">

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
                    disabled={saving}
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
                      disabled:opacity-60
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

                        {editingBrand
                          ? "Update Brand"
                          : "Create Brand"}
                      </>
                    )}

                  </button>

                </div>

              </form>

            </div>
          )}

          {/* ========================= */}
          {/* BRANDS */}
          {/* ========================= */}

          {brands.length === 0 ? (
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
                <Building2
                  size={30}
                  className="text-blue-400"
                />
              </div>

              <h2 className="text-xl font-bold mt-5">
                No brands yet
              </h2>

              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Create your first brand to start generating
                personalized social media content.
              </p>

              <button
                onClick={openCreateForm}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-500
                  font-semibold
                "
              >
                <Plus size={18} />
                Create Your First Brand
              </button>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {brands.map((brand) => (
                <div
                  key={brand._id}
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

                  {/* Brand Header */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-gradient-to-br
                        from-blue-600/20
                        to-cyan-500/20
                        border
                        border-white/10
                        flex
                        items-center
                        justify-center
                      ">
                        <Building2
                          size={20}
                          className="text-cyan-400"
                        />
                      </div>

                      <div>

                        <h2 className="font-bold text-lg">
                          {brand.brandName}
                        </h2>

                        <p className="text-gray-500 text-sm">
                          {brand.industry}
                        </p>

                      </div>

                    </div>

                    <div className="flex gap-1">

                      <button
                        onClick={() =>
                          openEditForm(brand)
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
                        title="Edit brand"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(brand)
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
                        title="Delete brand"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                  </div>

                  {/* Description */}
                  {brand.description && (
                    <p className="text-gray-500 text-sm leading-6 mt-5 line-clamp-3">
                      {brand.description}
                    </p>
                  )}

                  {/* Tone */}
                  {brand.tone?.length > 0 && (
                    <div className="mt-5">

                      <p className="text-gray-600 text-xs uppercase mb-2">
                        Tone
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {brand.tone.map((tone) => (
                          <span
                            key={tone}
                            className="
                              px-2.5
                              py-1
                              rounded-full
                              bg-cyan-500/10
                              text-cyan-400
                              text-xs
                            "
                          >
                            {tone}
                          </span>
                        ))}

                      </div>

                    </div>
                  )}

                  {/* Platforms */}
                  {brand.platforms?.length > 0 && (
                    <div className="mt-5">

                      <p className="text-gray-600 text-xs uppercase mb-2">
                        Platforms
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {brand.platforms.map(
                          (platform) => (
                            <span
                              key={platform}
                              className="
                                flex
                                items-center
                                gap-1.5
                                px-2.5
                                py-1
                                rounded-full
                                bg-white/5
                                text-gray-400
                                text-xs
                              "
                            >
                              <Globe2 size={12} />    

                              {platform}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  {/* Date */}
                  <div className="mt-6 pt-4 border-t border-white/5">

                    <p className="text-gray-600 text-xs">
                      Created{" "}
                      {brand.createdAt
                        ? new Date(
                            brand.createdAt
                          ).toLocaleDateString()
                        : "Recently"}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    );
  }