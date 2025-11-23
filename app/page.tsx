// import Image from "next/image";
import React from "react";



export default function Home() {


  return (
    <div className="">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/vid1.mp4" type="video/mp4" />
      </video>
      <h1 className="text-4xl font-bold">Welcome to Game Nook</h1>
      <p className="mt-4 text-lg">
        Your ultimate online database for all video games. Explore, discover,
        and dive into the world of gaming with us!
      </p>
    </div>
  );
}
