import Link from 'next/link'
import React from 'react'

const Showallgym = ({data}) => {

  return (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((gym) => (
          <div
            key={gym._id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-xl font-bold text-blue-700">{gym.gymName}</h2>
            <p className="text-sm text-gray-600 mt-1">{gym.gymLocation}</p>
            <p className="text-sm text-gray-600 mt-1">
              Total Members {gym.members.count || 0}
            </p>
            <p className="text-gray-700 mt-3">{gym.phone}</p>
            <h5 className="font-bold text-blue-700">Ownwer Name {gym.name}</h5>
            <Link
              href={`/exploregym/${gym._id}`}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold inline-block"
            >
              Join Now
            </Link>
          </div>
        ))}
      </div>
  )
}

export default Showallgym