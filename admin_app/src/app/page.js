'use client'
import axios from "axios"
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [uName, setUName] = useState('')
  const [pass, setPass] = useState('')
  const [msg, setmsg] = useState('')
  const router=useRouter()

  function gotoDesh(e) {
    e.preventDefault()
    if (uName && pass) {
      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
        'user_name': uName,
        'password': pass
      }).then((res) => {
        if(res.data.message=='found'){
           router.push('/dashBoard')
        }
      }).catch((err) => {
        console.log(err)
      })
    } else {
      setmsg("Please Give admin User Name and Password")
    }
  }
    return (<section className="w-[100vw] h-[100vh] flex flex-col gap-5 items-center justify-center">
      <h1 className="text-3xl font-mono font-bold font-nunito">Admin Login</h1>
      <form onSubmit={gotoDesh} className="flex flex-col gap-3">
        <input onChange={(e) => setUName(e.target.value)} value={uName} className="bg-[#1f1f1f67] px-4 py-1 rounded-sm font-lato" type="text" placeholder="User name" />
        <input onChange={(e) => setPass(e.target.value)} value={pass} className="bg-[#1f1f1f67] px-4 py-1 rounded-sm font-lato" type="password" placeholder="Password" />
        <button className="bg-[#1f1f1f67] mx-10 rounded-3xl py-1 border-2 border-[#6b6b6b5f] hover:scale-95 cursor-pointer font-nunito transition-all">Enter</button>
      </form>
      <p className=" text-sm font-mono text-center">{msg}</p>
    </section>)
}
