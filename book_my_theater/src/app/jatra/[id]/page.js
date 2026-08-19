'use client'
import axios from "axios";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Jatra() {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setLoading(true);
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search_by_jatra_id`, { 'jatra_id': id })
                .then((res) => {
                    if (res.data && res.data.data) {
                        setData(res.data.data[0]);
                    }
                    setLoading(false);
                }).catch((err) => {
                    console.error('Error fetching jatra details:', err);
                    setLoading(false);
                });
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
            <div>
                <Header />

                <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                        <Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">home</span>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-slate-400">Jatra Details</span>
                        {data && (
                            <>
                                <span>/</span>
                                <span className="text-purple-400 font-semibold">{data.title}</span>
                            </>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-28">
                            <Loading />
                        </div>
                    ) : data != null ? (
                        <div className="relative glass-panel rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl p-6 sm:p-10">
                            {/* Ambient Blur Backdrop */}
                            <div className="absolute inset-0 -z-10 opacity-25 overflow-hidden">
                                <img src={data.poster} alt={data.title} className="w-full h-full object-cover blur-3xl scale-125" />
                                <div className="absolute inset-0 bg-slate-950/80"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                {/* Left Poster Card */}
                                <div className="md:col-span-4 flex justify-center">
                                    <div className="relative w-full max-w-[280px] h-[380px] rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-2xl shadow-purple-950/50 group">
                                        <img
                                            src={data.poster || '/banner1.jpg'}
                                            alt={data.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-purple-600/90 backdrop-blur-md text-white text-xs font-bold shadow-lg">
                                            ₹{data.ticket_price}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Details Content */}
                                <div className="md:col-span-8 flex flex-col justify-center space-y-6">
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
                                            <span className="material-symbols-outlined text-sm">theater_comedy</span>
                                            {data.party_name || "Official Jatra Party"}
                                        </span>
                                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                                            {data.title}
                                        </h1>
                                    </div>

                                    {/* Description */}
                                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
                                        <h3 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">About The Show</h3>
                                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                                            {data.description || "Get ready to experience an unforgettable live stage performance with compelling drama, live music, and stellar actors."}
                                        </p>
                                    </div>

                                    {/* Show Attributes Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                                            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-xl">location_on</span>
                                            </div>
                                            <div>
                                                <span className="text-[11px] text-slate-400 block font-medium">Venue & City</span>
                                                <span className="font-semibold text-white">{data.place}, {data.city}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                                            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-xl">event_available</span>
                                            </div>
                                            <div>
                                                <span className="text-[11px] text-slate-400 block font-medium">Date & Time</span>
                                                <span className="font-semibold text-white">{data.date} | {data.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action CTA */}
                                    <div className="pt-2 flex items-center gap-4">
                                        <Link href={`/ticket_booking/${id}/${data.ticket_price}`} className="w-full sm:w-auto">
                                            <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-base shadow-xl shadow-purple-600/40 active:scale-95 transition-all flex items-center justify-center gap-3">
                                                <span className="material-symbols-outlined text-xl">event_seat</span>
                                                Select Seats & Book (₹{data.ticket_price})
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-panel p-12 rounded-2xl text-center max-w-md mx-auto my-12">
                            <h2 className="text-xl font-bold text-white mb-2">Show Not Found</h2>
                            <p className="text-slate-400 text-sm mb-6">The requested Jatra show could not be found or has ended.</p>
                            <Link href="/">
                                <button className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs">
                                    Return Home
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