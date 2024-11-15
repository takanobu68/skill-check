import React from 'react';
import logo from '../assets/logo-landit.svg';

const Header = () => (
  <header className='bg-white shadow' style={{ height: '74px' }}>
    <div className='flex items-center justify-between h-full'>
      <figure className='flex items-center'>
        <img src={logo} alt='Landit Logo' />
      </figure>
    </div>
  </header>
);

export default Header;
