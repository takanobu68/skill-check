import React from 'react';
import locationIcon from '../../assets/location-icon.png';
import calendarIcon from '../../assets/calendar-Icon.png';
import typeIcon from '../../assets/type-icon.png';

const SelectionPanel = () => (
  <div className='flex flex-col justify-between bg-gray-100  p-6 rounded-lg w-[359px] h-[780px]'>
    <div>
      <h2 className='text-lg font-semibold mb-4'>表示内容を選択</h2>

      <div className='flex items-center py-6 border-t border-b border-gray-300'>
        <div className='w-14 flex items-center space-x-1.5'>
          <img
            src={locationIcon}
            alt='Location Icon'
            className='w-4 h-5 text-gray-600'
          />
          <span className='text-gray-700 text-md'>場所</span>
        </div>
        <select className='flex-grow ml-6 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 text-sm p-2 bg-white'>
          <option>東京都</option>
          <option>大阪府</option>
        </select>
      </div>

      <div className='flex items-center py-6 border-b border-gray-300'>
        <div className='flex items-center space-x-1.5'>
          <img
            src={calendarIcon}
            alt='Calendar Icon'
            className='w-4.5 h-5 text-gray-600'
          />
          <span className='text-gray-700 text-md'>年度</span>
        </div>
        <select className='flex-grow ml-6 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 text-sm p-2 bg-white'>
          <option>2018年</option>
          <option>2019年</option>
        </select>
      </div>

      <div className='py-6 flex'>
        <div className='flex space-x-1.5 pt-1'>
          <img
            src={typeIcon}
            alt='Type Icon'
            className='w-4.5 h-5 text-gray-600'
          />
          <span className='text-gray-700 text-sm'>種類</span>
        </div>
        <div className='flex flex-col space-y-2 ml-6'>
          <label className='flex items-center'>
            <input
              type='radio'
              name='type'
              className='form-radio text-blue-600'
            />
            <span className='ml-2 text-gray-700'>住宅地</span>
          </label>
          <label className='flex items-center'>
            <input
              type='radio'
              name='type'
              className='form-radio text-blue-600'
            />
            <span className='ml-2 text-gray-700'>商業地</span>
          </label>
        </div>
      </div>
    </div>

    <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600'>
      表示する
    </button>
  </div>
);

export default SelectionPanel;
