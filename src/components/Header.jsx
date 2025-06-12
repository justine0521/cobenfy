import React from 'react'
import Logo from '../image/Logo.png'

function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-14 md:px-24 z-40 relative ">
        <img src={Logo} alt="COBENFY" className='h-20'/>
    </header>
  )
}

export default Header