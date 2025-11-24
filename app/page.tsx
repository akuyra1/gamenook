import Image from "next/image";
import React from "react";
import heroBg from '@/public/image (2).jpg'; // put your image in /public


export default function Home() {


  return (
    <div className="main-container ">
      <section className="relative min-h-screen w-screen overflow-hidden">
        {/* Background image – covers everything, no gaps */}
        <Image
          src={heroBg}
          alt="42 Games Later galaxy"
          
          fill
          priority
          quality={95}
          className="object-cover object-center fixed inset-0"  // ← critical line
          placeholder="blur"
        />

        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Your content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
          {/* hero text, search bar, etc */}
        </div>
      </section>
    </div>
  );
}
