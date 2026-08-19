'use client'
import axios from "axios"
import { useEffect, useState } from "react"

export default function allJatras(){
    const [allJatra, setAllJatra] = useState([])
    const [msg, setMsg] = useState('')
    const [load, setload] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/all`).then((res) => {
            if (res.data.message) {
                setAllJatra(res.data.message.reverse())
            } else {
                setMsg('No jatra is available.')
            }
        }).catch((err) => {
            console.log(err)
        })
    })

    async function deleteJatra(id) {
        setload(true)
        console.log(id)
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete`, { 'jatra_id': id })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            }).finally(()=>{
                setload(false)
            })
    }

    return(<>
    <h1 className="text-3xl font-bold w-full text-center mt-10">All Jatra</h1>
        <section className=" h-[80vh] overflow-y-scroll mt-4 flex flex-col gap-2 justify-start items-center">
            {allJatra.length > 0 ? (
                allJatra.map((jatra, index) => (
                    <div key={index} className=" flex w-[80vw] gap-3 bg-[#30303032] py-2 px-4 items-center">
                        <img className="w-[200px] h-[250px] bg-cover bg-center" src={`${jatra.poster}`} />
                        <div className="flex flex-col gap-2 font-nunito">
                            <h1 className="text-2xl font-sans">{jatra.title} ( {jatra.party_name} )</h1>
                            <p>{jatra.description}</p>
                            <p>Release on : {jatra.date} | {jatra.time} at {jatra.place}</p>
                            <button onClick={() => deleteJatra(jatra.id)} className="bg-[#f72121] w-fit py-1 px-3 rounded-2xl">{load?('.......'):('😔 Delete')}</button>
                        </div>
                    </div>
                ))
            ) : (
                <section className="flex justify-center items-center">
                    {msg!=''?(
                        <h1>{msg}</h1>
                    ):(
                        <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                    </div>
                    )}
                </section>
            )}
        </section>
        </>)
}