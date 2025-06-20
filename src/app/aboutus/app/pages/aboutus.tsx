import Link from 'next/link'
import React from 'react'


function Aboutus() {
  return (
    <div>
      <h1 className='mt-5 sm:mt-3 lg:mt-7 font-bold text-blue-800 text-center text-3xl sm:text-2xl lg:text-4xl font-[Times New Roman]'>ABOUT US</h1>
      <div className='p-8 sm:p-6 lg:p-10  bg-amber-50 rounded-2xl  mt-10 sm:mt-5 lg:mt-10'>
        <h2 className='text-xl sm:text-lg lg:text-3xl font-semibold text-center '>Who are we</h2>
        <p className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg  mt-5 sm:mt-3 lg:mt-7">
          <strong className="font-semibold">Aid Global Foundation</strong> is a not-for-profit organization registered in 2025, dedicated to bringing dignity, hope, and sustainable change to vulnerable communities across India and beyond. We focus on providing practical, compassionate solutions to life's most essential needs—<span className="font-medium text-red-700">Education, Health, Food, and Shelter</span>.
        </p>
      <Link href="whoarewe"><button className='border rounded-2xl px-5 sm:px-3 lg:px-7 font-bold bg-blue-500 text-xl   mt-3 sm:text-lg lgtext-2xl text-amber-50 mx-auto block'>READ MORE</button></Link> 
      </div>
      <div className='p-8 sm:p-6 lg:p-10 flex flex-col items-center justify-center bg-amber-50 rounded-2xl  mt-10 sm:mt-5 lg:mt-15'>
        <h2 className='text-xl sm:text-lg lg:text-3xl font-semibold text-center '>Our team</h2>
        <div className="max-w-4xl   text-base sm:text-lg  mt-5 sm:mt-3 lg:mt-7">
          <ul>
          <li>
            <p className="font-semibold">Mr. Shivam Pathak</p>
            <p className="text-red-800 font-semibold">Director</p>
          </li>
          <li>
            <p className="font-semibold ">Mrs. Pooja Pathak</p>
            <p className="text-red-800 font-semibold">Director</p>
          </li>
          <li>
            <p className="font-semibold ">Mr. Nilesh Pal</p>
            <p className="text-red-800 font-semibold">Director</p>
          </li>
          <li>
            <p className="font-semibold ">Mr. Zeel Mangukiya</p>
            <p className="text-red-800 font-semibold">COO</p>
          </li>
        </ul>
        </div>
       <Link href="ourteam"> <button className='border rounded-2xl px-5 sm:px-3 lg:px-7 font-bold bg-blue-500 text-xl   mt-3 sm:text-lg lgtext-2xl text-amber-50'>READ MORE</button></Link>
      </div>
    </div>
  )
}

export default Aboutus
