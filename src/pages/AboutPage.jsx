import React from 'react'
import { Link } from 'react-router-dom'

function AboutPage () {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default AboutPage
