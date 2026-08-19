'use client'
import Ticket from "@/components/Ticket";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";

export default function Bookings() {
    const [allTickets, setAllTickets] = useState([]);
    const [uId, setUId] = useState('');
    const router = useRouter();
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUID = localStorage.getItem('UID');
            if (storedUID) {
                setUId(storedUID);
                setLoading(true);
                axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/all_booking/user_id`, { 'user_id': storedUID })
                    .then((res) => {
                        setLoading(false);
                        if (res.data && res.data.data && res.data.data.length > 0) {
                            setAllTickets(res.data.data.reverse());
                        } else {
                            setMsg('You have no ticket bookings yet.');
                        }
                    }).catch((err) => {
                        setLoading(false);
                        console.error('Error fetching bookings:', err);
                        setMsg('Failed to load your ticket history.');
                    });
            } else {
                router.push('/login');
            }
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between selection:bg-purple-500 selection:text-white">
            <div>
                <Header />

                <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                        <Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">home</span>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-purple-400 font-semibold">My Tickets</span>
                    </div>

                    {/* Page Title */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-xl mb-10">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-purple-400 text-3xl">confirmation_number</span>
                                My Booking History
                            </h1>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                View your active and completed Jatra show tickets & QR entry passes.
                            </p>
                        </div>

                        <span className="px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold">
                            Total Tickets: {allTickets.length}
                        </span>
                    </div>

                    {/* Ticket Gallery */}
                    {loading ? (
                        <div className="flex justify-center items-center py-24">
                            <Loading />
                        </div>
                    ) : allTickets.length > 0 ? (
                        <div className="flex flex-wrap justify-center items-start gap-8">
                            {allTickets.map((ticket, index) => (
                                <Ticket key={index} ticket={ticket} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto my-12 border border-slate-800">
                            <div className="w-16 h-16 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-3xl">confirmation_number</span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">{msg || "No Tickets Found"}</h2>
                            <p className="text-slate-400 text-sm mb-6">
                                You haven't booked any Jatra show tickets yet. Explore upcoming shows in your city!
                            </p>
                            <Link href="/">
                                <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30">
                                    Explore & Book Shows
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