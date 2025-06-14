import React from 'react'
import Logo from '../image/Logo-white.png'


function Header() {
  return (
    <header className="flex justify-between items-center md:px-10 z-40 relative h-40">
        <img src={Logo} alt="COBENFY" className='h-24 w-80'/>
    </header>
  )
}

export default Header