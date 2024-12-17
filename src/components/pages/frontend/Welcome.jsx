import React from 'react'
import { imgPath } from '../../helpers/functions-general'
import { Link } from 'react-router-dom'
import {  CircleCheck, Pointer } from 'lucide-react'


const Welcome = () => {
  return (
    <>
    <main className="w-full h-screen relative">
        <h2 className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-white">Order and Pay Here</h2>
        <img src={`${imgPath}/welcomeBanner.jpg`} alt="" className="h-full w-full block object-cover"/>

        <div className="absolute w-full bottom-0 left-0">
            <div className="bg-myRed text-white text-center p-4">
                <Link to="/order" className="text-4xl font-bold flex gap-5 justify-center items-center"><Pointer size={30} className="rotate-[-30deg]"/>Tap Here to Start</Link>
            </div>
        

        <div className="bg-white p-4 flex justify-between items-center">
            
            <div className="flex gap-2 items-center">
                <CircleCheck size={40} fill="red" stroke="white"/>
                <h4 className="mb-0 leading-[1.1]">Pay with Cash <br /> or Card</h4>
            </div>

            <div className="pl-4 border-l-4 border-myRed basis-[300px]">
                <h5 className="text-myRed mb-1">For other Payments</h5>
                <p className="text-xs text-black opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed corrupti tempore </p>
            </div>

        </div>
        </div>  
    </main>
    </>
  )
}

export default Welcome
