'use client'
import Link from 'next/link'
import React from 'react'
import '@/app/styles/header.css'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function Header() {

  const handleHover = (e) => {
    e.target.classList.add('hovered');
    console.log('hovered')
  };

  const handleMouseOut = (e) => {
    e.target.classList.remove('hovered');
  };

  return (
    <div>
        <nav className="header-nav">
            <ul className='header-container'>
                 <SignedIn>
                  <UserButton/>
                </SignedIn> 
                <Link href="/" className='header-logo'></Link>
                <Link href="/" className='header-link' onMouseOver={handleHover} onMouseOut={handleMouseOut}><span className='myAccountSpan' onMouseOver={handleHover} onMouseOut={handleMouseOut}>My</span> Account</Link>
                <Link href="/" className='header-link' onMouseOver={handleHover} onMouseOut={handleMouseOut}>Discover</Link>
                <Link href="/" className='header-link' onMouseOver={handleHover} onMouseOut={handleMouseOut}>Genres</Link>
                <Link href="/" className='header-link' onMouseOver={handleHover} onMouseOut={handleMouseOut}>Platforms</Link>
                <Link href="/" className='header-link' onMouseOver={handleHover} onMouseOut={handleMouseOut}><span className='myTopRated ' onMouseOver={handleHover} onMouseOut={handleMouseOut}>Top</span> Rated</Link>    
                 <SignedOut className='signedOutLinks'>
                  <SignInButton className='header-signin-button'/>
                    <SignUpButton>
                      <button className="header-signup-button">
                        Register
                      </button>
                    </SignUpButton>
                  </SignedOut>           
            </ul>
        </nav>
    </div>
  )
}
