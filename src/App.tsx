import React, { useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TitleSection from './components/sections/TitleSection';
import GraphArea from './components/sections/GraphArea';
import SelectionPanel from './components/sections/SelectionPanel';

const App = () => {
  // 選択された場所・年度・種類を管理するステートを定義
  const [selectedLocation, setSelectedLocation] = useState<string>('東京都');
  const [selectedYear, setSelectedYear] = useState<number>(2018);
  const [selectedType, setSelectedType] = useState<string>('住宅地');

  // `SelectionPanel`コンポーネントがボタンクリック時に呼び出す関数
  const handleSelectionSubmit = (
    location: string,
    year: number,
    type: string
  ) => {
    setSelectedLocation(location);
    setSelectedYear(year);
    setSelectedType(type);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow bg-gray-900 p-10'>
        <TitleSection />
        <div className='flex mt-10 space-x-6'>
          <div className='flex-grow'>
            <GraphArea />
          </div>
          {/* SelectionPanelにコールバック関数を渡す */}
          <SelectionPanel onSelectionSubmit={handleSelectionSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
