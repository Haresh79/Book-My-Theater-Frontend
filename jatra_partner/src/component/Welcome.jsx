'use client'

import { useEffect, useState } from "react"

export default function Welcome(){
    const[pId, setPId]=useState('')
    useEffect(()=>{
        setPId(localStorage.getItem('partyId'))
    })
    return(
        <section className="flex flex-col h-[100vh] p-5 justify-center items-center gap-3">
            <h1 className="font-bold font-mono text-3xl flex justify-center items-center text-center">Welcome Jatra Party ID: {pId}</h1>
            <p className=" flex justify-center font-sans text-center">This website is only use for the Jatra Party to upload jatra, delete jatra and mennage jatra.</p>
        </section>
    )
}