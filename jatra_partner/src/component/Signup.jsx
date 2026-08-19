'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
export default function Signup() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [party, setParty] = useState('')
    const [phone, setPhone] = useState('')
    const [msg, setMsg] = useState('')
    const [load, setLoad] = useState(false)
    function signup(e) {
        setLoad(true)
        e.preventDefault();
        if (phone.length != 10) {
            setMsg("Please enter a valid Phone Number.")
            setLoad(false)
        }
        else if (email == '' && password == '' && party == '' && phone == '') {
            setMsg("Please give all details correctly.")
            setLoad(false)
        } else {
            setMsg('')
            axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/party/resgister`, {
                'email': email,
                'mobile_no': phone,
                'password': password,
                'party_name': party,
            }).then((res) => {
                console.log(res)
                setMsg(res.data.message)
                if (res.data.userid) {
                    router.push('/signin')
                    setEmail('')
                    setParty('')
                    setPhone('')
                    setPassword('')
                }
            }).catch((err) => {
                console.error(err)
                setMsg(err.message)
            }).finally(() => {
                setLoad(false)
            })
        }
    }
    return (
        <section className="flex h-[100vh] flex-col items-center justify-center gap-8">
            <h1 className="text-3xl font-bold font-nunito">Register</h1>
            <form onSubmit={signup} className="flex flex-col justify-center items-center gap-6 bg-[#6750A4] p-8 w-[25vw] min-w-[300px] rounded-xl">
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="E-mail" required className="bg-[#D9D9D9] font-lato px-4 py-2 outline-none rounded-lg text-black" />
                <input onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Phone" required className="bg-[#D9D9D9] font-lato px-4 py-2 outline-none rounded-lg text-black" />
                <input onChange={(e) => setParty(e.target.value)} value={party} type="text" placeholder="Party Name" required className="bg-[#D9D9D9] font-lato px-4 py-2 outline-none rounded-lg text-black" />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Create Password" required className="bg-[#D9D9D9] font-lato px-4 py-2 outline-none rounded-lg text-black" />
                {load ? (<button className="bg-[#1E1E1E] py-2 px-4 rounded-full font-medium text-white">
                    <div className="bouncing-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </button>) : (<button className="bg-[#1E1E1E] py-2 px-4 rounded-full font-medium text-white font-lato">Sign Up</button>)}
                <p className="text-sm font-mono text-center text-[#6750A4]">{msg}</p>
            </form>
            <Link href="/signin"><span className="font-extralight text-sm font-lato hover:text-[#6750A4]">Go to Sign-In</span></Link>
        </section>
    )
}