import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-bold text-amber-400 mb-4 drop-shadow-[0_0_35px_rgba(251,191,36,0.4)]">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-4">
          Page not found
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-950 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound