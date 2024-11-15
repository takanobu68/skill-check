import React from 'react';
import copyIcon from '../../assets/copy-icon.png';

const Footer = () => (
  <footer
    className='bg-gray-900 text-gray-300 text-sm py-4 px-8'
    style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}
  >
    <div className='flex justify-between items-center'>
      <div className='flex space-x-6'>
        <a
          href='#'
          className='flex items-center space-x-2 text-xs leading-5 text-gray-300 hover:underline'
        >
          <span>利用規約</span>
          <img src={copyIcon} alt='Copy Icon' className='w-4 h-4' />
        </a>

        <a
          href='#'
          className='flex items-center space-x-2 text-xs leading-5 text-gray-300 hover:underline'
        >
          <span>プライバシーポリシー</span>
          <img src={copyIcon} alt='Copy Icon' className='w-4 h-4' />
        </a>
      </div>

      <div className='text-xs leading-5 text-gray-300'>© 2023 Landit Inc.</div>
    </div>
  </footer>
);

export default Footer;
