import React from 'react'
import { Link } from 'react-router-dom'

function HomePage () {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to My App!</p>
      <Link to='/about'>About</Link>
    </div>
  )
}

export default HomePage
