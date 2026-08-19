'use client'
import SeatSelection from "@/component/SeatSelection";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function offlineBooking(){
    const params = useParams()
    const jId=  params.j_id

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [availableSeatsA, setAvailableSeatsA] = useState([]);
    const [availableSeatsB, setAvailableSeatsB] = useState([]);
    const [availableSeatsC, setAvailableSeatsC] = useState([]);

    const [msg, setMsg]= useState('')

    useEffect(()=>{
        setAvailableSeatsA(generateSeats(10))
        setAvailableSeatsB(generateSeats(10))
        setAvailableSeatsC(generateSeats(10))
    }, [jId[0]])

    const generateSeats = (numSeats) => {
        let seats = [];
        for (let i = 0; i < numSeats; i++) {
          seats.push({ isAvailable: true });
        }
        return seats;
      };

      // chumeswary handel i loved it uuummmaa ummaaa
      const handleSeatSelect = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
          setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
        } else {
          setSelectedSeats([...selectedSeats, seatNumber]);
        }
      }

      function booking(){
        const pId=localStorage.getItem('partyId')
        console.log(selectedSeats, pId, jId)
        if (selectedSeats!=[]) {
          axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/offline_booking`,{
            'party_id':pId,
            'jatra_id':jId,
            'seats':selectedSeats,
          }).then((res)=>{
            console.log(res.data)
            setMsg(res.data.message)
          }).catch((err)=>{
            console.log(err)
          })
        }
      }

    return(<>
        <section className=" flex justify-center items-center gap-5 px-3 py-5">
                <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#D9D9D9] rounded-lg"></div> <span>Available</span></div>
                <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#6750A4] rounded-lg"></div> <span>Selected</span></div>
                <div className="flex justify-center items-center gap-2 flex-wrap"> <div className="w-[40px] h-[40px] bg-[#6f6f6f] rounded-lg"></div> <span>Taken</span></div>
            </section>

            <section>
                <SeatSelection 
                avilableSeatsA={availableSeatsA} 
                avilableSeatsB={availableSeatsB} 
                avilableSeatsC={availableSeatsC} 
                selectedSeats={selectedSeats} 
                onSeatSelect={handleSeatSelect}
                jatraId={jId} />
            </section>

            <section className="w-full flex flex-col justify-center items-center gap-3 p-2">
                <button onClick={booking} className="bg-[#6750A4] rounded-lg px-4 text-lg font-semibold py-0.5">Book</button>
                <p className=" font-mono text-sm text-center">{msg}</p>
            </section>
    </>)
}