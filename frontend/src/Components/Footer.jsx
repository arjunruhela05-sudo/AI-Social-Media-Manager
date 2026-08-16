import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="relative border-t border-white/10"
      style={{
        backgroundColor: "#050505",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-12">
          {/* Logo */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-black font-bold text-xl">
                ✦
              </div>

              <h2 className="text-3xl font-bold text-white">
                SocialAI
              </h2>
            </div>

            <p className="text-gray-400 mt-6 leading-8 max-w-md">
              SocialAI helps creators, startups, and businesses create,
              schedule, and manage social media content using AI-powered
              automation.
            </p>

            <div className="flex gap-4 mt-8">
              {[
                FaFacebookF,
                FaInstagram,
                FaLinkedinIn,
                FaTwitter,
                FaGithub,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-cyan-500 hover:text-white hover:scale-110 transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Product
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/features" className="hover:text-cyan-400 transition">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/templates" className="hover:text-cyan-400 transition">
                  Templates
                </Link>
              </li>

              <li>
                <Link to="/pricing" className="hover:text-cyan-400 transition">
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  to="/integrations"
                  className="hover:text-cyan-400 transition"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  API Docs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-5">
              Stay Updated
            </h3>

            <p className="text-gray-400 text-sm mb-5">
              Get AI tips, product updates, and social media strategies.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />

            <button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SocialAI. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              Terms of Service
            </a>

            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;