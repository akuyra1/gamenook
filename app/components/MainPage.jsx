'use client'
import React from 'react'
import Image from 'next/image'
import heroBg from '@/public/image (2).jpg'; // put your image in /public
import '@/app/styles/mainPage.css'
import GameSearch from '@/app/components/GameSearch';

export default function mainPage() {
  return (
    <div>
        <div className="hero-section">
           <section className="relative min-h-screen w-screen overflow-hidden hero-image">
            {/* Background image – covers everything, no gaps */}
            <Image
              src={heroBg}
              alt="42 Games Later galaxy"
              
              fill
              priority
              quality={75}
              className="object-cover object-center fixed inset-0 "  // ← critical line
              placeholder="blur"
            />

            {/* dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Your content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white">
              {/* hero text, search bar, etc */}
            </div>
          </section>
          <section className='search-section'>
            <form
              className="search-form"
              onSubmit={(e) => {
                e.preventDefault()
                const q = new FormData(e.currentTarget).get('q')
                console.log('Search:', q)
                // TODO: perform search / navigate to results
              }}
            >
              <input
                name="q"
                type="text"
                placeholder="Search the galaxy of games"
                className="search-bar"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <Image src="/search.svg" alt="Search" width={35} height={35} className='search-image'/>
              </button>
            </form>
            <GameSearch />          
          </section>
        </div>
        <div className='intro-section'>
          <div className='intro-container'>
            <h1 className='intro-header'>{`Don't Panic`}</h1>
            <p className='intro-text'>{`42 Games Later – the ultimate video game galaxy. Mostly harmless database of every title in existence (bugs included, no refunds).
               Too many games, too little life span. We catalogued them all while you were busy adulting. Search the void, rate 1–42, or slam the red button for a random disasterpiece.
               You're welcome. Don't get eaten by a Grue.`}</p>
          </div>          
        </div>

        {/* <div className='search-section'>

        </div> */}
    </div>
  )
}
