'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function SeatSelection({ avilableSeatsA, avilableSeatsB, avilableSeatsC, selectedSeats, onSeatSelect, jatraId }){
    const [booked, setBooked]=useState([]);

    useEffect(()=>{
        if (!jatraId) return;
        const formattedJId = Array.isArray(jatraId) ? jatraId[0] : jatraId;
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/jatra_id`,{'jatra_id':formattedJId})
        .then((res)=>{
            if(res.data && res.data.data && res.data.data[0] && res.data.data[0].booked != null){
                setBooked(res.data.data[0].booked)
            }else{
                setBooked(['0'])
            }
        }).catch((err)=>{
            console.error(err)
        })
    }, [jatraId])
    return(
        <div className="flex flex-col gap-2 justify-center items-center py-5">
            <div className="flex justify-center items-center gap-2 h-[280px]">
                <div className="bg-[#303030] w-[100px] h-full grid grid-cols-2 items-center px-3 gap-2">
                {avilableSeatsB.map((seat, index) =>{
                    let seatNo='B'+(index+10+1)
                    if (booked.includes(seatNo)) {
                        seat.isAvailable=false
                    }
                    return(
                        <div key={index+10}
                        style={{ width:'30px', height:'30px', display:'flex', justifyContent:'center', alignItems:'center',fontSize:'12px', 
                            backgroundColor: seat.isAvailable?(selectedSeats.includes('B'+(index+10+1))?'#6750A4':'#D9D9D9'):'#6f6f6f',
                            borderRadius:'0 8px 8px 0',
                        }}
                        onClick={()=>{  seat.isAvailable && onSeatSelect(seatNo) } }
                        >
                            {seatNo}
                        </div>
                    )
                })}
                </div>
                <div className="bg-[#D9D9D9] w-[100px] h-full"></div>
                <div className="bg-[#303030] w-[100px] h-full grid grid-cols-2 items-center px-3 gap-2">
                {avilableSeatsC.map((seat, index) =>{
                    let seatNo='C'+(index+20+1)
                    if (booked.includes(seatNo)) {
                        seat.isAvailable=false
                    }
                    return(
                        <div key={index+20}
                        style={{ width:'30px', height:'30px', display:'flex', justifyContent:'center', alignItems:'center',fontSize:'12px', 
                            backgroundColor: seat.isAvailable?(selectedSeats.includes('C'+(index+20+1))?'#6750A4':'#D9D9D9'):'#6f6f6f',
                            borderRadius:'8px 0 0 8px',
                        }}
                        onClick={()=>{  seat.isAvailable && onSeatSelect(seatNo) } }
                        >
                            {seatNo}
                        </div>
                    )
                })}
                </div>
            </div>
            <div className="bg-[#303030] w-[315px] h-[100px] grid grid-cols-5 items-center px-6 gap-4 py-4">
                {avilableSeatsA.map((seat, index) =>{
                    let seatNo='A'+(index+1)
                    if (booked.includes(seatNo)) {
                        seat.isAvailable=false
                    }
                    return(
                        <div key={index}
                        style={{ width:'30px', height:'30px', display:'flex', justifyContent:'center', alignItems:'center',fontSize:'12px', 
                            backgroundColor: seat.isAvailable?(selectedSeats.includes('A'+(index+1))?'#6750A4':'#D9D9D9'):'#6f6f6f',
                            borderRadius:'8px 8px 0 0',
                        }}
                        onClick={()=>{  seat.isAvailable && onSeatSelect(seatNo) } }
                        >
                            {seatNo}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}