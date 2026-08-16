import { Sparkles, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = () => {

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);



  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center px-4">
      <div className="w-full max-w-5xl">

        <div className="bg-black/85 backdrop-blur-xl border border-white/10 rounded-full">

          <div className="h-20 px-8 flex items-center justify-between">

            {/* Logo */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center">
                <Sparkles className="text-black" size={20} />
              </div>

              <Link to="/" className="flex items-center gap-2"><h1 className="  text-xl   font-bold   text-white">  SocialAI</h1></Link>

            </div>

            {/* Nav */}
            <nav className="hidden lg:flex items-center gap-8">

           <Link to="/features"className="text-white hover:text-cyan-400 transition"> Features</Link>
            <Link to="/integrations" className="text-white hover:text-cyan-300">Integrations</Link>

           <Link to="/pricing" className=" text-white hover:text-cyan-400 transition">Pricing</Link>

         <Link to="/templates" className="  text-white  hover:text-cyan-400  transition">  Templates</Link>

            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">

          <button
  onClick={() => setDarkMode(!darkMode)}
  className="text-white hover:text-yellow-400 transition"
>
  {darkMode ? <Moon size={20} /> : <Sun size={20} />}
</button>
              <Link to="/login" className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition">Login </Link>

             <Link to="/signup" className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-semibold transition">Try Free</Link>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;