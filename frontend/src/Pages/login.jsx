import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import bg from "../assets/bg.avif";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      /*
       * Your backend response is expected to contain the JWT.
       * We support both:
       *
       * response.data.data.token
       * response.data.token
       */
      const token =
        response.data?.data?.token ||
        response.data?.token;

      if (!token) {
        throw new Error("Login successful, but no token was received.");
      }

      // Store JWT
      localStorage.setItem("token", token);

      // Optional: store user data if returned by backend
      const user =
        response.data?.data?.user ||
        response.data?.user;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";

      setError(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 mt-2">
              Sign in to your AI Social Media Manager
            </p>
          </div>

          {/* Login Type */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-semibold transition"
            >
              Password
            </button>

            <button
              type="button"
              disabled
              className="flex-1 py-3 rounded-lg text-gray-500 bg-white/5 cursor-not-allowed"
            >
              Magic Link
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3.5
                    rounded-xl
                    bg-white/5
                    border border-white/10
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
                <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    w-full
                    pl-12
                    pr-4
                    py-3.5
                    rounded-xl
                    bg-white/5
                    border border-white/10
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-2
                py-3.5
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                font-semibold
                text-white
                hover:scale-[1.02]
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center my-7">
            <div className="flex-1 h-px bg-white/10"></div>

            <span className="mx-4 text-gray-500 text-sm">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 h-px bg-white/10"></div>
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
              className="w-5 h-5"
              alt="Google"
            />

            Continue with Google
          </button>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}