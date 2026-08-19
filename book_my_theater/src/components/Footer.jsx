import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bg-slate-950 text-slate-300 border-t border-purple-500/20 pt-16 pb-12 mt-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/10 blur-3xl pointer-events-none rounded-full"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
                {/* Brand Info */}
                <div className="space-y-4 md:col-span-1">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                            <span className="material-symbols-outlined text-xl">theater_comedy</span>
                        </div>
                        <span className="font-extrabold text-lg text-white tracking-tight">
                            BOOK MY THEATER
                        </span>
                    </div>
                    <p className="text-sm text-slate-400 font-normal leading-relaxed">
                        Odisha's premier digital platform for booking Jatra & cultural show tickets instantly with interactive seat selection.
                    </p>
                    <div className="flex items-center gap-3 pt-2 text-slate-400">
                        <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-purple-400 hover:border-purple-500/40 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-lg">share</span>
                        </span>
                        <span className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-purple-400 hover:border-purple-500/40 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-lg">verified</span>
                        </span>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-4 border-b border-purple-500/20 pb-2">
                        Quick Links
                    </h3>
                    <ul className="space-y-2.5 text-sm">
                        <li><Link href="/" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-xs text-purple-400">chevron_right</span>Home Catalog</Link></li>
                        <li><Link href="/bookings" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-xs text-purple-400">chevron_right</span>My Tickets</Link></li>
                        <li><Link href="/login" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-xs text-purple-400">chevron_right</span>User Login</Link></li>
                        <li><Link href="/register" className="hover:text-purple-400 transition-colors flex items-center gap-1.5"><span className="material-symbols-outlined text-xs text-purple-400">chevron_right</span>Create Account</Link></li>
                    </ul>
                </div>

                {/* Popular Cities */}
                <div>
                    <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-4 border-b border-purple-500/20 pb-2">
                        Top Show Locations
                    </h3>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                        <li><Link href="/searchby/bhubaneswar" className="hover:text-purple-400 transition-colors">Bhubaneswar</Link></li>
                        <li><Link href="/searchby/cuttack" className="hover:text-purple-400 transition-colors">Cuttack</Link></li>
                        <li><Link href="/searchby/puri" className="hover:text-purple-400 transition-colors">Puri</Link></li>
                        <li><Link href="/searchby/balasore" className="hover:text-purple-400 transition-colors">Balasore</Link></li>
                        <li><Link href="/searchby/rourkela" className="hover:text-purple-400 transition-colors">Rourkela</Link></li>
                        <li><Link href="/searchby/dhenkanal" className="hover:text-purple-400 transition-colors">Dhenkanal</Link></li>
                    </ul>
                </div>

                {/* Contact & Support */}
                <div>
                    <h3 className="text-white text-base font-semibold tracking-wider uppercase mb-4 border-b border-purple-500/20 pb-2">
                        Customer Support
                    </h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-purple-400 text-lg">mail</span>
                            <a href="mailto:support@bookmytheater.com" className="hover:text-purple-400 transition-colors">support@bookmytheater.com</a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-purple-400 text-lg">call</span>
                            <a href="tel:+919876543210" className="hover:text-purple-400 transition-colors">+91 98765 43210</a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <span className="material-symbols-outlined text-purple-400 text-lg">location_on</span>
                            <span>Odisha, India</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>&copy; {new Date().getFullYear()} Book My Theater. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
                    <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
                    <span className="hover:text-slate-400 transition-colors cursor-pointer">Razorpay Secured Payments</span>
                </div>
            </div>
        </footer>
    );
}