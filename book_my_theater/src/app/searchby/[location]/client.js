// 'use client'
// import { useEffect, useState } from "react"
// import Link from "next/link"
// import Loading from "./loading"

// export default function Client({ location }) {
//   const [data, setData] = useState([])
//   const [isLoad, setIsLoad] = useState(false)
//   const [msg, setMsg] = useState('')

//   useEffect(() => {
//     setIsLoad(true)
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ search: location })
//     })
//       .then(res => res.json())
//       .then((res) => {
//         if (res.data) {
//           setData(res.data.reverse())
//           setIsLoad(false)
//         } else {
//           setIsLoad(true)
//           setMsg(res.message)
//         }
//       })
//       .catch(() => setIsLoad(false))
//   }, [location])

//   return (
//     <>
//       <header>
//         <Link href="/">Home</Link> / {location}
//       </header>
//       <section>
//         {data.length > 0 ? (
//           data.map((jatra, index) => (
//             <Link key={index} href={`/jatra/${jatra.id}`}>
//               {jatra.title}
//             </Link>
//           ))
//         ) : (
//           <div>
//             {msg !== '' ? <h1>No shows available</h1> : <Loading />}
//           </div>
//         )}
//       </section>
//     </>
//   )
// }

'use client'
import axios from "axios";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Client({ location }) {
    const [data, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        if (location != null) {
            setIsLoad(true);
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search`, { 'search': location })
                .then((res) => {
                    if (res.data && res.data.data) {
                        setData(res.data.data.reverse());
                        setIsLoad(false);
                    } else {
                        setIsLoad(false);
                        setMsg(res.data?.message || 'No shows found');
                    }
                }).catch((err) => {
                    console.error('Error fetching shows by location:', err);
                    setIsLoad(false);
                    setMsg('Failed to load shows for this location.');
                });
        }
    }, [location]);

    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
            <div>
                <Header />

                {/* Location Header Section */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 pb-4">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium">
                        <Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">home</span>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-purple-400 capitalize font-semibold">{location}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-xl">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white capitalize flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-400 text-3xl">location_on</span>
                                    Jatra Shows in {location}
                                </h1>
                                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                                    {data.length} Shows Found
                                </span>
                            </div>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                Select a show below to view full details and pick your seats.
                            </p>
                        </div>

                        <Link href="/">
                            <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all">
                                <span className="material-symbols-outlined text-sm">filter_alt</span>
                                Change City
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Show Catalog Grid */}
                <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
                    {isLoad ? (
                        <div className="flex flex-col justify-center items-center py-20">
                            <Loading />
                        </div>
                    ) : data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {data.map((jatra) => (
                                <Link key={jatra.id} href={`/jatra/${jatra.id}`} className="group">
                                    <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col h-full hover:border-purple-500/40">
                                        {/* Poster Image */}
                                        <div className="relative w-full h-[280px] bg-slate-950 overflow-hidden">
                                            <img
                                                src={jatra.poster || '/banner1.jpg'}
                                                alt={jatra.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold tracking-wide">
                                                ₹{jatra.ticket_price}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                                        </div>

                                        {/* Card Details */}
                                        <div className="p-5 flex flex-col justify-between flex-grow bg-slate-900/40">
                                            <div>
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-purple-400 mb-1 block">
                                                    {jatra.party_name || "Official Jatra Party"}
                                                </span>
                                                <h2 className="text-lg font-bold text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
                                                    {jatra.title}
                                                </h2>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-slate-300 text-xs">
                                                    <span className="material-symbols-outlined text-purple-400 text-base">calendar_today</span>
                                                    <span>{jatra.date || "Upcoming Show"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-300 text-xs">
                                                    <span className="material-symbols-outlined text-purple-400 text-base">schedule</span>
                                                    <span>{jatra.time || "Night Show"}</span>
                                                </div>

                                                <button className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:from-purple-500 group-hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-purple-600/30 flex items-center justify-center gap-2 transition-all">
                                                    <span className="material-symbols-outlined text-sm">confirmation_number</span>
                                                    Book Seats
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel p-12 rounded-2xl text-center max-w-lg mx-auto my-12 border border-slate-800">
                            <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">event_busy</span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">No Shows Available</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                There are currently no Jatra performances listed in <span className="text-purple-300 capitalize">{location}</span>.
                            </p>
                            <Link href="/">
                                <button className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all">
                                    Search Other Cities
                                </button>
                            </Link>
                        </div>
                    )}
                </main>
            </div>

            <Footer />
        </div>
    );
}