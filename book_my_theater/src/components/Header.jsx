'use client'
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
    const pathname = usePathname();
    const [sideNav, setSideNav] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('UID')) {
            setIsLoggedIn(true);
        }
    }, []);

    const navLinks = [
        { name: "Home", href: "/", icon: "home" },
        { name: "My Tickets", href: "/bookings", icon: "confirmation_number" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 glass-header transition-all duration-300">
                <nav className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6 md:px-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform duration-300">
                            <span className="material-symbols-outlined text-white text-2xl">theater_comedy</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                                BOOK MY THEATER
                            </span>
                            <span className="text-[10px] font-medium text-purple-300/70 tracking-widest uppercase -mt-1">
                                Premier Jatra Booking
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-full border border-purple-500/20 backdrop-blur-md shadow-lg shadow-black/40">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={link.name} href={link.href}>
                                    <span className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30 font-semibold"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                                    }`}>
                                        <span className="material-symbols-outlined text-lg">{link.icon}</span>
                                        {link.name}
                                    </span>
                                </Link>
                            );
                        })}

                        {isLoggedIn ? (
                            <Link href="/bookings">
                                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold hover:bg-purple-500/20 transition-all">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    Account Active
                                </span>
                            </Link>
                        ) : (
                            <Link href="/login">
                                <span className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all">
                                    <span className="material-symbols-outlined text-lg">login</span>
                                    Login
                                </span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden w-10 h-10 rounded-xl bg-slate-800/80 border border-purple-500/30 flex items-center justify-center text-slate-200 hover:text-white active:scale-90 transition-all"
                        onClick={() => setSideNav(true)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className="material-symbols-outlined text-2xl">menu</span>
                    </button>
                </nav>
            </header>

            {/* Mobile Drawer */}
            {sideNav && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-4/5 max-w-sm h-full bg-slate-900 border-l border-purple-500/30 p-6 flex flex-col justify-between shadow-2xl">
                        <div>
                            <div className="flex justify-between items-center pb-6 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-lg">theater_comedy</span>
                                    </div>
                                    <span className="font-bold text-lg text-white">BookMyTheater</span>
                                </div>
                                <button
                                    onClick={() => setSideNav(false)}
                                    className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
                                >
                                    <span className="material-symbols-outlined text-xl">close</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-3 mt-6">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link key={link.name} href={link.href} onClick={() => setSideNav(false)}>
                                            <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                                                isActive
                                                    ? "bg-purple-600 text-white font-semibold shadow-lg shadow-purple-600/30"
                                                    : "text-slate-300 hover:bg-slate-800"
                                            }`}>
                                                <span className="material-symbols-outlined">{link.icon}</span>
                                                {link.name}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800">
                            {isLoggedIn ? (
                                <Link href="/bookings" onClick={() => setSideNav(false)}>
                                    <div className="w-full py-3 px-4 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 font-semibold text-center flex items-center justify-center gap-2">
                                        <span className="material-symbols-outlined">account_circle</span>
                                        View My Account
                                    </div>
                                </Link>
                            ) : (
                                <Link href="/login" onClick={() => setSideNav(false)}>
                                    <div className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30">
                                        <span className="material-symbols-outlined">login</span>
                                        Sign In / Register
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}