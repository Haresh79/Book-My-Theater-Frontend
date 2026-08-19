'use client'
import { useRouter } from "next/navigation";

export default function DashBoard(){
    const router = useRouter()
    return(
        <section className="flex w-full h-[100vh] justify-center items-center">
            <h1 className="font-nunito text-3xl">Welcome Admin Welcome...</h1>
        </section>
    )
}