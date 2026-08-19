'use client'
import { QRCodeSVG } from "qrcode.react";

export default function Ticket({ ticket, index }) {
    function formatSeats(seatsArray) {
        if (!seatsArray || !Array.isArray(seatsArray) || seatsArray.length === 0) {
            return "General Admission";
        }
        return seatsArray.join(', ');
    }

    function formatTime(timeString) {
        if (!timeString) return "7:30 PM";
        const parts = timeString.split(':');
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1] || '00';
        let period = 'AM';
        if (hours >= 12) {
            period = 'PM';
            if (hours > 12) {
                hours -= 12;
            }
        }
        if (hours === 0) {
            hours = 12;
        }
        return `${hours}:${minutes} ${period}`;
    }

    const currentDate = new Date();
    const ticketDate = ticket.date ? new Date(`${ticket.date}T${ticket.time || '20:00:00'}`) : currentDate;
    const isPastEvent = ticketDate < currentDate;

    return (
        <div key={index} className="relative w-full max-w-[320px] ticket-container rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-purple-900/40">
            {/* Notch Cutouts */}
            <div className="ticket-notch-left"></div>
            <div className="ticket-notch-right"></div>

            {/* Ticket Poster Header */}
            <div className="relative h-[220px] w-full overflow-hidden bg-slate-950">
                <img
                    src={ticket.poster || '/banner1.jpg'}
                    alt={ticket.title || 'Jatra Show'}
                    className={`w-full h-full object-cover transition-all ${isPastEvent ? 'grayscale opacity-60' : 'opacity-90'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Status Pill */}
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        isPastEvent
                            ? 'bg-slate-800/90 text-slate-400 border border-slate-700'
                            : 'bg-emerald-500/90 text-white shadow-md shadow-emerald-500/30'
                    }`}>
                        {isPastEvent ? 'Completed' : 'Confirmed Ticket'}
                    </span>
                </div>

                {/* Show Title & Party Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider block">
                        {ticket.party_name || "Official Jatra Party"}
                    </span>
                    <h3 className="text-lg font-bold text-white line-clamp-1">
                        {ticket.title || 'Jatra Performance'}
                    </h3>
                </div>
            </div>

            {/* Perforated Line Divider */}
            <div className="relative border-b-2 border-dashed border-purple-500/30 my-0"></div>

            {/* Ticket Details & QR Code Bottom Section */}
            <div className={`p-5 bg-slate-900/95 flex flex-col gap-4 ${isPastEvent ? 'opacity-70' : ''}`}>
                <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                        <span className="text-[10px] font-semibold uppercase text-slate-400 block">Date</span>
                        <span className="font-bold text-slate-100">{ticket.date || "2026-08-25"}</span>
                    </div>

                    <div>
                        <span className="text-[10px] font-semibold uppercase text-slate-400 block">Show Time</span>
                        <span className="font-bold text-slate-100">{formatTime(ticket.time)}</span>
                    </div>

                    <div>
                        <span className="text-[10px] font-semibold uppercase text-slate-400 block">Total Amount</span>
                        <span className="font-bold text-purple-300">₹{ticket.amount}</span>
                    </div>

                    <div>
                        <span className="text-[10px] font-semibold uppercase text-slate-400 block">Seats Booked</span>
                        <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 inline-block">
                            {formatSeats(ticket.seats)}
                        </span>
                    </div>
                </div>

                {/* QR Code Scan Area */}
                <div className="mt-2 pt-3 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-2xl border">
                    <div className="bg-white p-2 rounded-xl shadow-md">
                        <QRCodeSVG value={ticket.pay_id || ticket.id || 'JATRA_TICKET'} size={65} />
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Ticket ID</span>
                        <span className="text-[11px] font-mono font-bold text-purple-300 truncate max-w-[130px]">
                            {ticket.pay_id ? ticket.pay_id.slice(-10) : (ticket.id ? ticket.id.slice(0, 8) : 'TCK-2026')}
                        </span>
                        <span className="text-[9px] text-slate-500 mt-1">Show at Entry</span>
                    </div>
                </div>
            </div>
        </div>
    );
}