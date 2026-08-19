'use client'
import Link from "next/link"

export default function Header(){
    return(<header className="bg-[#cbcbcb45] backdrop-blur-md p-2 mx-4 sticky top-4 rounded-2xl">
        <nav className="flex justify-center gap-5">
            <Link href={`/dashBoard`}><li className="list-none font-nunito border-2 p-2 rounded-lg hover:bg-[#6750A4] active:bg-[#6750A4]">Dash Board</li></Link>
            <Link href={`/dashBoard/allBookings`}><li className="list-none font-nunito border-2 p-2 rounded-lg hover:bg-[#6750A4] active:bg-[#6750A4]">All Booking Details</li></Link>
            <Link href={`/dashBoard/allJatras`}><li className="list-none font-nunito border-2 p-2 rounded-lg hover:bg-[#6750A4] active:bg-[#6750A4]">All Jatra Details</li></Link>
        </nav>
    </header>)
}