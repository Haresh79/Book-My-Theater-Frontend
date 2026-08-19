'use client'
import Link from 'next/link';
import { useEffect, useState } from "react"
export default function Sidebar(){
    const [pId, setPId]= useState('')
      useEffect(()=>{
        setPId(localStorage.getItem('partyId'))
      },[])

    return(
        <aside id='sideBar' className=' bg-white w-[150px] font-nunito h-[100vh] border-r-2 border-gray-400'>
            <nav className='w-fit flex flex-col text-black p-4 flex-wrap gap-4'>
                <Link href={'/'} className='flex-1/2'>Home</Link><hr/>
                <Link href={'/upload'} className='flex-1/2' >Upload Jatra</Link><hr/>
                <Link href={'/myJatra'} className='flex-1/2' >My Jatra</Link><hr/>
                { pId ? (
                    <Link href={'/signout'} className='flex-1/2' >Sign-Out</Link>
                ):(
                    <Link href={'/signup'} className='flex-1/2' >Sign-Up</Link>
                )}
            </nav>
        </aside>
    )
}