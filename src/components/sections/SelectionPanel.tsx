import React, { useState, useEffect } from 'react';
import locationIcon from '../../assets/location-icon.png';
import calendarIcon from '../../assets/calendar-Icon.png';
import typeIcon from '../../assets/type-icon.png';
import data from '../../data/estate_transactions.json';
import { DataItem } from '../../types/EstateData';
import { SelectionPanelProps } from '../../types/Props';
import {
  getDistinctLocations,
  getDistinctYears,
} from '../../utils/selectionDataProcessors';

const SelectionPanel = ({ onSelectionSubmit }: SelectionPanelProps) => {
  // ユーザーが選択した場所・年度・種類を管理するステート
  const [selectedLocation, setSelectedLocation] = useState<string>('東京都');
  const [selectedYear, setSelectedYear] = useState<number>(2018);
  const [selectedType, setSelectedType] = useState<string>('住宅地');

  // 都道府県と年度のステートを定義
  const [locations, setLocations] = useState<{ code: string; name: string }[]>(
    []
  );
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    // データを正しい型にキャスト
    const typedData = data as DataItem[];

    // ユーティリティ関数で都道府県データと年度データを取得
    const distinctLocations = getDistinctLocations(typedData);
    setLocations(distinctLocations);

    const distinctYears = getDistinctYears(typedData);
    setYears(distinctYears);
  }, []);

  const handleSubmit = () => {
    // 親コンポーネント(App)に選択内容を渡す
    onSelectionSubmit(selectedLocation, selectedYear, selectedType);
  };

  return (
    <div className='flex flex-col justify-between bg-gray-100  p-6 rounded-lg w-[359px] h-[780px]'>
      <div>
        <h2 className='text-lg font-semibold mb-4'>表示内容を選択</h2>

        {/* 都道府県セレクトボックス */}
        <div className='flex items-center py-6 border-t border-b border-gray-300'>
          <div className='w-14 flex items-center space-x-1.5'>
            <img
              src={locationIcon}
              alt='Location Icon'
              className='w-4 h-5 text-gray-600'
            />
            <span className='text-gray-700 text-md'>場所</span>
          </div>
          <select
            className='flex-grow ml-6 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 text-sm p-2 bg-white'
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {/* locationsステートを用いてオプションを生成 */}
            {locations.map((location) => (
              <option key={location.code} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        {/* 年度セレクトボックス */}
        <div className='flex items-center py-6 border-b border-gray-300'>
          <div className='flex items-center space-x-1.5'>
            <img
              src={calendarIcon}
              alt='Calendar Icon'
              className='w-4.5 h-5 text-gray-600'
            />
            <span className='text-gray-700 text-md'>年度</span>
          </div>
          <select
            className='flex-grow ml-6 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 text-sm p-2 bg-white'
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {/* yearsステートを用いてオプションを生成 */}
            {years.map((year) => (
              <option key={year} value={year}>
                {year}年
              </option>
            ))}
          </select>
        </div>

        {/* 種類選択ラジオボタン */}
        <div className='py-6 flex'>
          <div className='flex space-x-1.5'>
            <img
              src={typeIcon}
              alt='Type Icon'
              className='w-4.5 h-5 text-gray-600'
            />
            <span className='text-gray-700 text-md'>種類</span>
          </div>
          <div className='flex flex-col space-y-2 ml-6'>
            <label className='flex items-center'>
              <input
                type='radio'
                name='type'
                className='form-radio text-blue-600'
                value='住宅地'
                checked={selectedType === '住宅地'}
                onChange={(e) => setSelectedType(e.target.value)}
              />
              <span className='ml-2 text-gray-700'>住宅地</span>
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                name='type'
                className='form-radio text-blue-600'
                value='商業地'
                checked={selectedType === '商業地'}
                onChange={(e) => setSelectedType(e.target.value)}
              />
              <span className='ml-2 text-gray-700'>商業地</span>
            </label>
          </div>
        </div>
      </div>

      <button
        className='w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600'
        onClick={handleSubmit}
      >
        表示する
      </button>
    </div>
  );
};

export default SelectionPanel;
