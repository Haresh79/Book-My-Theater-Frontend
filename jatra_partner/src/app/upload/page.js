'use client'
import Upload from "@/component/Upload";
import { useEffect, useState } from "react";
import Signin from "@/component/Signin";

export default function upload() {
  const [pId, setPId] = useState('')
  useEffect(() => {
    setPId(localStorage.getItem('partyId'))
  }, [])
  if (pId == "") {
    return (
      <section className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </section>
    )
  } else {
    return (<>
      <Upload />
    </>)
  }

}