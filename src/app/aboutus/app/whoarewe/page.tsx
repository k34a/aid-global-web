import React from 'react';
import Image from 'next/image';
function Whoarewe() {
  return (
    <div className=" mt-4 lg:mt-20 font-times bg-blue-50 ">
    <div  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-[url('/background.webp')] bg-cover bg-center h-96 w-full flex flex-row justify-between">
    <div  className="p-4 sm:p-6 md:p-10 lg:p-16 xl:p-20">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl  font-bold text-blue-500 mb-8">
        Who Are We
      </h2>
        <p>
          <strong className="font-semibold">Aid Global Foundation</strong> is a not-for-profit organization registered in 2025, dedicated to bringing dignity, hope, and sustainable change to vulnerable communities across India and beyond. We focus on providing practical, compassionate solutions to life's most essential needs—<span className="font-medium text-blue-400">Education, Health, Food, and Shelter</span>.
        </p>
        </div>
         <Image className="pr-4 sm:pr-6  md:pr-10 lg:pr-16 xl:pr-24" src="/who_are_we.webp" alt="image" width={500} height={400}/>
    </div>
         <div className=" text-lg sm:text-lg pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-24 ">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mt-8 mb-2">About us</h2>
        <div className='flex flex-row justify-between mb-4 sm:mb-6 md:mb-10 lg:mb-16 xl:mb-20'>
        <p >
          Our grassroots work is powered by purpose and designed for long-term impact. We operate directly within communities through a range of focused, life-transforming initiatives:
        </p>
         <p className="pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-24 pr-4 sm:pr-6 md:pr-10 lg:pr-16 xl:pr-20">
          We are driven by compassion, accountability, and a deep respect for human dignity. Every program, clinic, and partnership is a step forward in our mission to create a world where aid is delivered with heart and impact is made with purpose.
        </p>
        </div>
        <ul className="list-disc space-y-2 pl-8 sm:pl-10 md:pl-12 lg:pl-16 xl:pl-24 ">
          <li><strong>ShikshaAid</strong> – Access to education for underprivileged children</li>
          <li><strong>EnableAid</strong> – Support and empowerment for differently-abled and disability elimination</li>
          <li><strong>CureAid</strong> – Primary healthcare and wellness services</li>
          <li><strong>VisionAid</strong> – Eye care and vision restoration</li>
          <li><strong>GharAid</strong> – Safe and secure shelter for homeless and orphaned people</li>
          <li><strong>SakhiAid</strong> – Women’s empowerment and hygiene protection initiatives</li>
        </ul>
         </div>
<div className="flex flex-col md:flex-row justify-between gap-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-4 sm:pt-6 md:pt-8 lg:pt-12 font-[Times New Roman]">

 
  <div className="relative flex-1 h-96 rounded-2xl overflow-hidden bg-cover bg-center shadow-md" style={{ backgroundImage: "url('/vision.webp')" }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-0 p-4 sm:p-6 md:p-8 text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Vision</h2>
      <p className="font-semibold">Aid with Heart. Impact with Purpose.</p>
    </div>
  </div>

  <div className="relative flex-1 h-96 rounded-2xl overflow-hidden bg-cover bg-center shadow-md" style={{ backgroundImage: "url('/mission.webp')" }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    <div className="absolute bottom-0 p-4 sm:p-6 md:p-8 text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Mission</h2>
      <p className="font-semibold">
        We deliver compassionate aid with heart and create lasting impact with clear purpose. Our commitment is to empower vulnerable communities by fostering hope, dignity, and sustainable change worldwide.
      </p>
    </div>
  </div>

</div>


       
        <div className=" text-lg sm:text-lg pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-24">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mt-8 mb-4">Core Values</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="text-lg font-bold text-green-400">GODLIKE</h3>
              <p >We serve with divine compassion, honoring the worth of every person.</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-green-400">CHILDLIKE</h3>
              <p >We live with wonder, humility, and a deep dependence on values greater than ourselves.</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-green-400">INTEGRITY</h3>
              <p >We uphold honesty and accountability in all that we do.</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-green-400">RESTORING THE BROKEN</h3>
              <p >We address the physical, emotional, and spiritual needs of those who are overlooked or suffering.</p>
            </li>
            <li>
              <h3 className="text-lg font-bold text-green-400">INTENTIONAL RELATIONSHIPS</h3>
              <p >We build authentic, trust-based partnerships to amplify our collective impact.</p>
            </li>
          </ul>
        </div>
      
    </div>
  );
}

export default Whoarewe;
