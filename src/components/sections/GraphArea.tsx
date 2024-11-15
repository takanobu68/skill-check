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

// `SelectionPanel`で選択された「種類」を、JSONの`type`に対応する数値にマッピング
const typeMapping: Record<string, number> = {
  住宅地: 1,
  商業地: 2,
};

const GraphArea = ({ location, year, type }: GraphAreaProps) => {
  // typedDataとしてJSONを型付きで扱う
  const typedData = data as DataItem[];

  // 選択された都道府県名に対応する都道府県コードを取得
  const prefectureCode = useMemo(() => {
    // typedDataから、`location`に対応する`prefectureCode`を取得
    const locationItem = typedData.find(
      (item) => item.data.result.prefectureName === location
    );
    return locationItem
      ? parseInt(locationItem.data.result.prefectureCode, 10)
      : null;
  }, [location, typedData]);

  // 選択された`場所（prefectureCode）`と`年度（year）`と`種類`に対応するデータを取得
  const selectedValue = useMemo(() => {
    if (!prefectureCode) return 0;
    const numericType = typeMapping[type] || 1; // '住宅地'の場合は1、'商業地'の場合は2
    // JSONデータから該当する`DataItem`を探す
    const dataItem = typedData.find(
      (item) =>
        parseInt(item.data.result.prefectureCode, 10) === prefectureCode &&
        item.year === year &&
        parseInt(item.data.result.type, 10) === numericType
    );
    // 該当する`DataItem`が見つからなければ0を返す
    return dataItem && dataItem.data.result.years.length > 0
      ? dataItem.data.result.years[0].value
      : 0;
  }, [prefectureCode, year, type, typedData]);

  // グラフに表示するデータ
  const chartData = [
    { name: location, value: selectedValue },
    { name: '関東平均', value: 35000 }, // 例として固定値を使用
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
              {/* 東京都のバー用グラデーション */}
              <linearGradient
                id='gradientTokyo'
                x1='0'
                y1='0'
                x2='1'
                y2='1'
                gradientTransform='rotate(136.95)'
              >
                <stop offset='24.03%' stopColor='#009984' />
                <stop offset='75.73%' stopColor='#97BF4A' />
              </linearGradient>

              {/* 関東平均のバー用グラデーション */}
              <linearGradient
                id='gradientKanto'
                x1='0'
                y1='0'
                x2='1'
                y2='1'
                gradientTransform='rotate(156.04)'
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
                      ? 'url(#gradientTokyo)'
                      : 'url(#gradientKanto)'
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
