'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function allBookings() {

    const [allBookings, setAllBookings] = useState([])
    const [msg, setMsg] = useState('')

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/all_booking`).then((res) => {
            if (res.data.data) {
                setAllBookings(res.data.data.reverse())
            } else {
                setMsg('No booking is available.')
            }
        }).catch((err) => {
            console.log(err)
        })
    })



    return (<>
        <h1 className="text-3xl font-bold w-full text-center mt-15 font-nunito">Booking Details</h1>
        <section className="h-[80vh] mt-5 overflow-y-scroll flex flex-col gap-2 justify-start ">

            {allBookings.length > 0 ? (
                <table>
                    <thead className="sticky text-sm font-nunito text-center top-0 left-0 w-full bg-white text-black">
                        <tr>
                            <th>Booking Id</th><th>seats</th><th>amount</th><th>jatra_id</th>
                        </tr>
                    </thead>
                    <tbody className="font-lato">
                        {allBookings.map((item, index) => (
                            <tr key={index} className="p-2 text-sm bg-[#3f3f3f] border-b-black border-2 w-full text-center">
                                <td className="text-green-400">{item.id}</td><td className="text-blue-400">{item.seats}</td><td >{item.amount}</td><td className="text-orange-500">{item.jatra_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    {msg != '' ? (
                        <h1>{msg}</h1>
                    ) : (
                        <section className="flex justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                            </div>
                        </section>
                    )}
                </div>
            )}
        </section>

    </>)
}