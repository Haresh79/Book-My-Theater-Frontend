'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function Signin(){
    const router = useRouter()
    const [uid, setUid]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(false)

    function signin(e){
        setLoad(true)
        e.preventDefault()
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/login`,{'email':email,'password':password})
        .then((res)=>{
            console.log(res.data)
            if (res.data.u_id) {
                localStorage.setItem('partyId',res.data.u_id)
                setMsg(res.data.message)
                router.push('/')
            }
        })
        .catch((err)=>{
            console.error(err)
            setMsg(err.message)
        })
        .finally(()=>{
            setLoad(false)
        })
    }

    return(
        <section className="flex h-[70vh] flex-col items-center justify-center gap-8">
            <h1 className="text-3xl font-nunito font-bold">Sign In</h1>
            <form onSubmit={signin} className="flex flex-col justify-center items-center gap-5">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="E-mail" required className="bg-[#323131] px-4 py-2 outline-none rounded-lg w-[20vw] min-w-[300px] font-lato" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" required className="bg-[#323131] px-4 py-2 outline-none rounded-lg w-[20vw] min-w-[300px] font-lato" />
                {load ? (<button className="bg-[#1E1E1E] py-2 px-4 rounded-full font-medium text-white">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>) : (<button className="bg-[#1E1E1E] py-2 px-4 rounded-full font-medium text-white font-lato">Sign In</button>)}
                <p className="text-sm font-mono text-center text-[#6750A4]">{msg}</p>
            </form>
            <Link href="/signup"><span className="font-extralight text-sm font-lato hover:text-[#6750A4]">To Sign-Up Now</span></Link>
        </section>
    )
}