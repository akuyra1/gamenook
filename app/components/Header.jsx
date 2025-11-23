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
  return (
    <div>
        <nav className="header-nav">
            <ul className='header-container'>
                 <SignedIn>
                  <UserButton/>
                </SignedIn> 
                <Link href="/" className='header-logo'></Link>
                <Link href="/" className='header-link'><span className='myAccountSpan'>My</span> Account</Link>
                <Link href="/" className='header-link'>Discover</Link>
                <Link href="/" className='header-link'>Genres</Link>
                <Link href="/" className='header-link'>Platforms</Link>
                <Link href="/" className='header-link'><span className='myTopRated '>Top</span> Rated</Link>    
                 <SignedOut>
                  <SignInButton  className='header-signin-button'/>
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
