'use client'

import axios from "axios";
import { useEffect, useState } from "react";

export default function SeatSelection({ jatraID, avilableSeatsA, avilableSeatsB, avilableSeatsC, selectedSeats, onSeatSelect }) {
    const [booked, setBooked] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (jatraID) {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/seats/jatra_id`, {
                'jatra_id': jatraID
            }).then((res) => {
                if (res.data && res.data.data && res.data.data.length > 0 && res.data.data[0].booked) {
                    setBooked(res.data.data[0].booked);
                } else {
                    setBooked([]);
                }
                setLoading(false);
            }).catch((err) => {
                console.error('Error fetching booked seats:', err);
                setBooked([]);
                setLoading(false);
            });
        }
    }, [jatraID]);

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-6 px-4">
            {/* Curved Theater Screen */}
            <div className="w-full mb-12 flex flex-col items-center">
                <div className="screen-visual mb-3"></div>
                <span className="text-xs uppercase tracking-[0.3em] font-semibold text-purple-400/80 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">tv</span>
                    STAGE / SCREEN THIS WAY
                </span>
            </div>

            {/* Seating Layout Grid */}
            <div className="w-full flex flex-col items-center gap-8 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-purple-500/20 backdrop-blur-xl shadow-2xl">
                
                {/* Main Balcony Rows (B & C Left/Right Wings) */}
                <div className="flex flex-wrap justify-center items-start gap-8 sm:gap-14 w-full">
                    
                    {/* Left Wing - Row B */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span> Row B (Left Wing)
                        </span>
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3 shadow-inner">
                            {avilableSeatsB.map((seat, index) => {
                                const seatNo = 'B' + (index + 11);
                                const isBooked = booked.includes(seatNo);
                                const isSelected = selectedSeats.includes(seatNo);

                                return (
                                    <button
                                        key={'B' + index}
                                        disabled={isBooked}
                                        onClick={() => !isBooked && onSeatSelect(seatNo)}
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold seat-item transition-all duration-200 ${
                                            isBooked
                                                ? 'seat-taken text-slate-500 border border-slate-800'
                                                : isSelected
                                                ? 'seat-selected text-white'
                                                : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-purple-600/30 hover:border-purple-500/50 hover:text-white'
                                        }`}
                                        title={isBooked ? `Seat ${seatNo} (Taken)` : `Select Seat ${seatNo}`}
                                    >
                                        {seatNo}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Wing - Row C */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Row C (Right Wing)
                        </span>
                        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3 shadow-inner">
                            {avilableSeatsC.map((seat, index) => {
                                const seatNo = 'C' + (index + 21);
                                const isBooked = booked.includes(seatNo);
                                const isSelected = selectedSeats.includes(seatNo);

                                return (
                                    <button
                                        key={'C' + index}
                                        disabled={isBooked}
                                        onClick={() => !isBooked && onSeatSelect(seatNo)}
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold seat-item transition-all duration-200 ${
                                            isBooked
                                                ? 'seat-taken text-slate-500 border border-slate-800'
                                                : isSelected
                                                ? 'seat-selected text-white'
                                                : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-purple-600/30 hover:border-purple-500/50 hover:text-white'
                                        }`}
                                        title={isBooked ? `Seat ${seatNo} (Taken)` : `Select Seat ${seatNo}`}
                                    >
                                        {seatNo}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Front Row A (V.I.P / Front Stage) */}
                <div className="flex flex-col items-center gap-3 pt-4 border-t border-slate-800/80 w-full">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">star</span>
                        Row A (VIP Front Stage)
                    </span>
                    <div className="bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 grid grid-cols-5 sm:grid-cols-10 gap-2.5 sm:gap-3 shadow-inner max-w-full overflow-x-auto">
                        {avilableSeatsA.map((seat, index) => {
                            const seatNo = 'A' + (index + 1);
                            const isBooked = booked.includes(seatNo);
                            const isSelected = selectedSeats.includes(seatNo);

                            return (
                                <button
                                    key={'A' + index}
                                    disabled={isBooked}
                                    onClick={() => !isBooked && onSeatSelect(seatNo)}
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold seat-item transition-all duration-200 ${
                                        isBooked
                                            ? 'seat-taken text-slate-500 border border-slate-800'
                                            : isSelected
                                            ? 'seat-selected text-white'
                                            : 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-purple-600/30 hover:border-purple-500/50 hover:text-white'
                                    }`}
                                    title={isBooked ? `Seat ${seatNo} (Taken)` : `Select Seat ${seatNo}`}
                                >
                                    {seatNo}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}