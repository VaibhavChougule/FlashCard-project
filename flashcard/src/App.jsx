import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Link, NavLink } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {


  return (
    <>
      <Link to={'/admin'}><button className='block absolute right-8 top-5 bg-white p-4 rounded-md hover:bg-slate-300 font-semibold'>Admin Dashboard</button></Link>
      <Card />
    </>
  )
}

export default App
