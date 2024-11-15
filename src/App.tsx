import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import TitleSection from './components/sections/TitleSection';

function App() {
  return (
    <div>
      <Header />
      <main className='flex-grow bg-gray-900 p-10'>
        <TitleSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
