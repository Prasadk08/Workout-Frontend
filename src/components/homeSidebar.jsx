import Link from 'next/link'
import React from 'react'

const HomeSidebar = () => {
  return (
    <div className='h-screen w-xs  bg-gray-800 text-white'>
      <div className='sideprofile text-2xl py-4 px-4 h-20'><Link href={"/home/profile"}>This is Profile</Link></div>
      <div className='sidebarhomelinks w-full flex flex-col justify-center items-center mt-4'>
        <Link href="/home" className='w-[90%] h-12 hover:bg-gray-700 py-3 text-center transition rounded-xl'>Home</Link>
        <Link href="/members" className='w-[90%] h-12 hover:bg-gray-700 py-3 text-center transition rounded-xl'>Members</Link>
        <Link href="/plans" className='w-[90%] h-12 hover:bg-gray-700 py-3 text-center transition rounded-xl'>Plans</Link>
        <Link href="/status" className='w-[90%] h-12 hover:bg-gray-700 py-3 text-center transition rounded-xl'>Check Status</Link>
        <Link href="/logout" className='w-[90%] h-12 hover:bg-gray-700 py-3 text-center transition rounded-xl'>Logout</Link>
      </div>
    </div>
  )
}

export default HomeSidebar