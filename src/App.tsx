import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TitleSection from './components/TitleSection';

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
