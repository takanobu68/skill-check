import React, { useMemo } from 'react';
import locationIcon from '../../assets/location-icon-white.png';
import calendarIcon from '../../assets/calendar-icon-white.png';
import typeIcon from '../../assets/type-icon-white.png';
import data from '../../data/estate_transactions.json';
import { GraphAreaProps } from '../../types/Props';
import { DataItem } from '../../types/EstateData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  getPrefectureCode,
  getSelectedValue,
  getAverageValue,
} from '../../utils/dataProcessor';

const GraphArea = ({ location, year, type }: GraphAreaProps) => {
  // typedDataとしてJSONを型付きで扱う
  const typedData = data as DataItem[];

  // 選択された都道府県名に対応する都道府県コードを取得
  const prefectureCode = useMemo(
    () => getPrefectureCode(typedData, location),
    [location, typedData]
  );

  // 選択された`場所（prefectureCode）`と`年度（year）`と`種類`に対応するデータを取得
  const selectedValue = useMemo(
    () => getSelectedValue(typedData, prefectureCode, year, type),
    [prefectureCode, year, type, typedData]
  );

  // 選択された`年度`と`種類`に対応する都道府県すべての平均値を計算
  const averageValue = useMemo(
    () => getAverageValue(typedData, year, type),
    [year, type, typedData]
  );

  // グラフに表示するデータ
  const chartData = [
    { name: location, value: selectedValue },
    { name: '関東平均', value: averageValue },
  ];

  return (
    <div className='flex flex-col items-center justify-center h-[780px]'>
      {/* 上部情報表示エリア */}
      <div className='flex items-center space-x-12 mb-12 px-4 py-2 '>
        {/* 場所 */}
        <div className='flex items-center space-x-2'>
          <img src={locationIcon} alt='Location Icon' className='w-4 h-4' />
          <span className='text-white text-2xl'>{location}</span>
        </div>
        {/* 年度 */}
        <div className='flex items-center space-x-2'>
          <img src={calendarIcon} alt='Calendar Icon' className='w-4 h-4' />
          <span className='text-white text-2xl'>{year}年</span>
        </div>
        {/* 種類 */}
        <div className='flex items-center space-x-2'>
          <img src={typeIcon} alt='Type Icon' className='w-4 h-4' />
          <span className='text-white text-2xl'>{type}</span>
        </div>
      </div>

      {/* グラフエリア */}
      <div className='w-[713px] h-[446px] flex justify-center items-center'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={chartData}
            margin={{ top: 40, right: 50, left: 50, bottom: 20 }}
          >
            {/* グラデーションの定義 */}
            <defs>
              {/* 選択された場所のバー用グラデーション */}
              <linearGradient
                id='gradientSelected'
                gradientUnits='userSpaceOnUse'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='24.03%' stopColor='#009984' />
                <stop offset='75.73%' stopColor='#97BF4A' />
              </linearGradient>

              {/* 関東平均のバー用グラデーション */}
              <linearGradient
                id='gradientAverage'
                gradientUnits='userSpaceOnUse'
                x1='0%'
                y1='0%'
                x2='100%'
                y2='100%'
              >
                <stop offset='-0.08%' stopColor='#706D65' />
                <stop offset='99.92%' stopColor='#57544C' />
              </linearGradient>
            </defs>

            {/* X 軸 */}
            <XAxis dataKey='name' tick={{ fill: '#ffffff' }} />

            {/* Y 軸 */}
            <YAxis
              tick={{ fill: '#ffffff' }}
              tickCount={13}
              interval={0}
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: '(円/㎡)',
                angle: 0,
                position: 'top',
                fill: '#ffffff',
                offset: 20,
              }}
            />

            {/* ツールチップ */}
            <Tooltip
              formatter={(value: number) => `${value.toLocaleString()}円/m²`}
            />

            {/* バーチャートのバー */}
            <Bar dataKey='value' barSize={200}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === location
                      ? 'url(#gradientSelected)'
                      : 'url(#gradientAverage)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraphArea;
