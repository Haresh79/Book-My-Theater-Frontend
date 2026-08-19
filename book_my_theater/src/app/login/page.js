'use client'
import Header from "@/components/Header"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Login() {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [msg, setMsg] = useState('')

    const router = useRouter()

    function login(e) {
        setIsLoad(true)
        e.preventDefault()
        if (email != '' && pass != '') {
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                'email': email,
                'password': pass
            }).then((res) => {

                if (res.data.u_id) {
                    setMsg(res.data.message)
                    localStorage.setItem('UID', res.data.u_id)
                    setEmail('')
                    setPass('')
                    router.replace("/")
                } else {
                    setMsg(res.data.message)
                    console.log(res.data)
                }

            }).catch((err) => {
                console.log(err)

            }).finally(() => {
                setIsLoad(false)
            })
        } else {
            setMsg('Provide E-mail and Password.')
            setIsLoad(false)
        }
    }

    return (
        <>
            <Header />
            <section className="flex h-[70vh] flex-col items-center justify-center gap-8">
                <h1 className="text-3xl font-bold font-nunito">Log In</h1>
                <form onSubmit={login} className="flex flex-col justify-center items-center gap-5">
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required className="bg-[#323131] font-lato px-4 py-2 outline-none rounded-lg w-[20vw] min-w-[300px]" />
                    <input onChange={(e) => setPass(e.target.value)} value={pass} type="password" placeholder="Password" required className="bg-[#323131] font-lato px-4 py-2 outline-none rounded-lg w-[20vw] min-w-[300px]" />
                    <button className="bg-[#6750A4] py-2 px-4 rounded-full font-medium font-nunito">{isLoad ? (<div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>) : ('Sign In')}</button>
                    <p className="text-sm font-mono text-green-400 text-center">{msg}</p>
                </form>
                <Link href="/register"><span className="font-extralight text-sm font-lato">Create an new Account / Register</span></Link>
            </section>
        </>
    )
}