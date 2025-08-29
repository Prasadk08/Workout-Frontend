import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-gray-400 py-10 px-6 md:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Workout</h3>
            <p>Smart Gym Management Platform for Owners & Members.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link href="/ownersign" className="hover:text-white">Owner Sign Up</Link>
              </li>
              <li>
                <Link href="/traineesign" className="hover:text-white">Trainee Sign Up</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold text-white mb-3">Contact</h4>
            <p>Email: support@workout.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-500">
          © {new Date().getFullYear()} Workout. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer
