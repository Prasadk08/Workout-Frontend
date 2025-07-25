import React from 'react'

const Footer = () => {
  return (
    <div className='text-center h-50 flex items-center justify-center w-full grid grid-cols-3 text-lg text-white' style={{ backgroundColor: '#7954b7'}}>
      <div className='p-2'>Workout</div>
      <div>
        <div className=''>Login</div>
        <div className=''>Register Now</div>
        <div className=''>About</div>
        <div className=''>Contact</div>
      </div>
      <div className='p-2'>Connect With Us</div>
    </div>
  )
}

export default Footer
