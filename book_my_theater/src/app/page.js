'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [imgSrc, setImgSrc] = useState('/banner1.jpg');
  const images = ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg'];
  const [rear, setRear] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRear((prevRear) => {
        const newRear = (prevRear + 1) % images.length;
        setImgSrc(images[newRear]);
        return newRear;
      });
    }, 3500);

    return () => clearInterval(intervalId);
  }, [images]);

  const popularLocations = [
    "Bhubaneswar", "Cuttack", "Puri", "Balasore", "Rourkela",
    "Berhampur", "Sambalpur", "Bhadrak", "Baripada", "Dhenkanal",
    "Anugul", "Jharsuguda", "Paradip", "Rayagada", "Bolangir"
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
      <div>
        <Header />

        {/* Ambient Gradient Background */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-900/30 via-indigo-800/20 to-pink-900/10 blur-[120px] pointer-events-none rounded-full -z-10"></div>

        {/* Hero Banner & Search Section */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Live Jatra Ticket Booking
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight mb-6">
            Experience the Magic of <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Odisha's Legendary Jatra
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mb-8 leading-relaxed font-normal">
            Search by your city or location to discover upcoming shows, select preferred seats, and book tickets instantly.
          </p>

          {/* Search Input Bar */}
          <div className="w-full max-w-2xl bg-slate-900/90 p-2 rounded-2xl border border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-950/40 flex items-center gap-3">
            <div className="flex items-center justify-center pl-4 text-purple-400">
              <span className="material-symbols-outlined text-2xl">location_on</span>
            </div>
            <input
              type="search"
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none font-medium py-2"
              placeholder="Enter your city (e.g. Bhubaneswar, Cuttack, Puri)..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && location.trim() !== '') {
                  router.push(`/searchby/${encodeURIComponent(location.trim())}`);
                }
              }}
            />
            <button
              onClick={() => {
                if (location.trim() !== '') {
                  router.push(`/searchby/${encodeURIComponent(location.trim())}`);
                }
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Search</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Popular Locations Grid */}
        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-400">explore</span>
              Popular Cities & Towns
            </h2>
            <span className="text-xs text-purple-400/80 font-medium uppercase tracking-wider">Explore Location</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {popularLocations.map((loc) => (
              <Link key={loc} href={`/searchby/${loc.toLowerCase()}`}>
                <div className="glass-card p-3.5 rounded-xl flex items-center gap-3 group cursor-pointer border border-slate-800 hover:border-purple-500/40">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center transition-all">
                    <span className="material-symbols-outlined text-lg">theater_comedy</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {loc}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Banner Carousel */}
        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full rounded-2xl overflow-hidden glass-panel p-2 border border-purple-500/20 shadow-2xl shadow-black/80">
            <div className="relative w-full h-[240px] sm:h-[380px] md:h-[450px] rounded-xl overflow-hidden">
              <img
                src={imgSrc}
                alt="Jatra Featured Show"
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-10">
                <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold w-fit uppercase tracking-wider mb-2">
                  Featured Showcases
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                  Grand Stage Performances 2026
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Book premium front-row seats for top Jatra troupes across Odisha with guaranteed instant confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
