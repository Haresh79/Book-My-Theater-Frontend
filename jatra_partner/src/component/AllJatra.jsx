'use client'
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
export default function AllJatra(props){
    const[data, setData]=useState([])
    const[msg, setMsg]=useState('')
    useEffect(()=>{
        const party_id=props.partyId
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/id`,{'party_id':party_id})
        .then((res)=>{
            if (res.data.data) {
                setData(res.data.data.reverse())
            }else{
                setMsg(res.data.message)
            }
            
        }).catch((err)=>{
            console.log(err)
        })
    })

    return(
        <section className="flex flex-col gap-2 justify-start h-[100vh] overflow-y-scroll p-4">
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className=" flex gap-3 bg-[#30303032] py-2 px-4 items-center">
                        <img className="w-[200px] h-[250px] bg-cover bg-center" src={`${item.poster}`} alt={`Poster for ${item.title}`}/>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-nunito font-semibold">{item.title} | <span className=" font-light text-lg">₹{item.ticket_price}</span></h1>
                            <p className="font-nunito">{`Release on : ${item.date} | ${item.time} at ${item.place}, ${item.city}`}</p>
                            <Link href={`/offlineBooking/${item.id}`}>
                                <button className="bg-[#6750A4] font-nunito py-1 px-3 rounded-2xl">Seat Booking</button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <section className="flex h-[60vh] flex-col gap-5 justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                    <div className="flex flex-col justify-center">{msg}
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    </div>
                </section>
            )}
        </section>
    )
}