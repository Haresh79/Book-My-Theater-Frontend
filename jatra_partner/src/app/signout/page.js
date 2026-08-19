'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

 export default function signout(){
    const [pId, setPId]= useState('')
    useEffect(()=>{
        setPId(localStorage.getItem('partyId'))
        console.log(pId)
    })
    function signout(){
        localStorage.removeItem('partyId')
        useRouter().push('/signin')
    }
    return(<section className=" flex justify-center items-center h-[100vh]">
        {pId?(<Link href={'/signin'}><button onClick={signout} className="bg-[#6750A4] rounded-lg px-4 text-lg font-semibold py-0.5">Sign Out</button></Link>):(<></>)}
    </section>)
 }