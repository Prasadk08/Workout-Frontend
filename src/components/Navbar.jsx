import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='bg-fuchsia-400 text-center top-0 h-15 flex items-center justify-between shadow-md'>
      <div className='text-black font-bold text-2xl mx-8'>Start Today</div>
      <div className='text-black text-lg font-bold hover:text-blue-600'><Link href="/about">About</Link></div>
      <div className='text-white text-base mx-8'>
      <button className='py-1 px-5 bg-blue-600 rounded-2xl'><Link href="/login">Login</Link></button>
      </div>
    </div>
  )
}

export default Navbar