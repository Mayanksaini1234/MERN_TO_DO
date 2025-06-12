import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-50 to-yellow-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound