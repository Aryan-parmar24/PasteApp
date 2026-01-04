import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 p-4 bg-gray-200'>
    
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/pastes">
        Pastes
      </NavLink>
      <div className='flex flex-row mt-2 self-start gap-3'>
        <span className='w-[10px] h-[10px] rounded-full bg-red-500'></span>
        <span className='w-[10px] h-[10px] rounded-full bg-blue-500'></span>
        <span className='w-[10px] h-[10px] rounded-full bg-green-500'></span>
      </div>
    </div>
  )
}
// h-12 px-4 flex items-center bg-gray-900
export default Navbar
