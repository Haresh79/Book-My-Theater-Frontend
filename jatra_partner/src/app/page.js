'use client'
import Sidebar from "@/component/Sidebar";
import Signin from "@/component/Signin";
import Welcome from "@/component/Welcome";
import Image from "next/image";
import { useEffect, useState } from "react";



export default function Home() {
  
  const [pId, setPId]= useState('')
  useEffect(()=>{
    console.log(localStorage.getItem('partyId'))
    if (localStorage.getItem('partyId')) {
      setPId(localStorage.getItem('partyId'))
    }
    
  })
  
  if (pId=='') {
    return(
      <>
        <Signin/>
      </>
    )
  }else{
    return(
        <Welcome/>
    )
  }
}
