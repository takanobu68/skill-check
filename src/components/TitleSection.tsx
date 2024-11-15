import React from 'react';
import graphIcon from '../assets/graph-icon.png';

const TitleSection = () => (
  <div className='p-4'>
    <div className='flex items-end space-x-4 border-b border-gray-700 pb-4'>
      <div className='flex items-center space-x-2'>
        <img src={graphIcon} alt='Graph Icon' className='w-6 h-6' />
        <h1 className='text-white text-2xl font-semibold'>取引価格</h1>
      </div>

      <p className='text-white text-xs'>※取引価格1㎡あたり</p>
    </div>
  </div>
);

export default TitleSection;
