import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Building2 } from "lucide-react";

import bg from "../assets/bg.avif";
import api from "../api/axios";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("SIGNUP BUTTON CLICKED");

    setError("");

    // -------------------------
    // Frontend validation
    // -------------------------

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    // Backend requires minimum 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);

      console.log("SENDING REGISTER REQUEST...");

      const response = await api.post("/auth/register", {
        fullName: fullName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        password,
      });

      console.log("SIGNUP RESPONSE:", response.data);

      const token =
        response.data?.data?.token ||
        response.data?.token;

      const user =
        response.data?.data?.user ||
        response.data?.user;

      if (!token) {
        throw new Error(
          "Registration succeeded but no token was returned."
        );
      }

      // Save authentication
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      }

      console.log("TOKEN SAVED");

      navigate("/dashboard");

    } catch (error) {
      console.error("SIGNUP ERROR:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Signup failed. Please try again.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-cover
        bg-center
        px-4
        py-10
      "
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div
        className="
          w-full
          max-w-md
          bg-black/40
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-8
          shadow-2xl
        "
      >
        {/* Heading */}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Start managing your social media with AI
          </p>
        </div>

        {/* Error */}

        {error && (
          <div
            className="
              mb-5
              p-3
              rounded-lg
              border
              border-red-500/30
              bg-red-500/10
              text-red-400
              text-sm
            "
          >
            {error}
          </div>
        )}

        {/* Form */}

        <form onSubmit={handleSignup}>

          {/* Full Name */}

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-400
                  w-5
                  h-5
                "
              />

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                placeholder="Your full name"
                autoComplete="name"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                  transition
                "
              />
            </div>
          </div>

          {/* Company Name */}

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Company Name
            </label>

            <div className="relative">
              <Building2
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-400
                  w-5
                  h-5
                "
              />

              <input
                type="text"
                value={companyName}
                onChange={(e) =>
                  setCompanyName(e.target.value)
                }
                placeholder="Your company name"
                autoComplete="organization"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                  transition
                "
              />
            </div>
          </div>

          {/* Email */}

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <div className="relative">
              <Mail
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-400
                  w-5
                  h-5
                "
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="name@company.com"
                autoComplete="email"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                  transition
                "
              />
            </div>
          </div>

          {/* Password */}

          <div className="mb-5">
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                className="
                  absolute
                  left-4
                  top-4
                  text-gray-400
                  w-5
                  h-5
                "
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                className="
                  w-full
                  pl-12
                  pr-4
                  py-3.5
                  rounded-xl
                  bg-white/5
                  border
                  border-white/10
                  text-white
                  placeholder-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/30
                  transition
                "
              />
            </div>
          </div>

          {/* Terms */}

          <label
            className="
              flex
              items-start
              gap-3
              text-sm
              text-gray-400
              cursor-pointer
            "
          >
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) =>
                setAcceptedTerms(e.target.checked)
              }
              className="mt-1 accent-blue-500"
            />

            <span>
              I agree to the{" "}
              <span className="text-blue-400">
                Terms & Conditions
              </span>
            </span>
          </label>

          {/* Create Account */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-6
              py-3.5
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-semibold
              hover:scale-[1.02]
              transition-all
              duration-300
              disabled:opacity-60
              disabled:cursor-not-allowed
              disabled:hover:scale-100
            "
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center my-7">
          <div className="flex-1 h-px bg-white/10" />

          <span className="mx-4 text-gray-500 text-sm">
            OR SIGN UP WITH
          </span>

          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Google */}

        <button
          type="button"
          disabled
          className="
            w-full
            py-3.5
            rounded-xl
            border
            border-white/10
            bg-white/5
            flex
            items-center
            justify-center
            gap-3
            text-gray-400
            cursor-not-allowed
          "
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />

          Sign up with Google
        </button>

        {/* Login */}

        <p className="text-center text-gray-400 text-sm mt-7">
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              text-blue-400
              hover:text-blue-300
              font-medium
            "
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}