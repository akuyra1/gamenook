import Link from 'next/link'
import React from 'react'
import '@/app/styles/footer.css'

export default function Footer() {
  return (
    <div className='footer-container'>
      <h1 className='footer-header'>Links</h1>
        <ul className='footer-links'>
            <Link href="/about" className='about-us links'>About Us</Link>
            <Link href="/contact" className='contact links'>Contact</Link>
            <Link href="/privacy" className='privacy-policy links'>Privacy Policy</Link>
            <Link href="/terms" className='terms-of-service links'>Terms of Service</Link>
            <Link href="/api-docs" className='api-documentation links'>API Documentation</Link>
            <p className='footer-copyright'>Copyright © 2025, 42 Games Later, All rights reserved.</p>
        </ul>
    </div>
  )
}
