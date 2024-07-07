import React, { useEffect, useState } from 'react';
import TabBar from './components/TabBar';
import Calculator from './pages/Calculator';
import Insights from './pages/Insights';
import Footer from './components/Footer';
import Header from './components/Header';

type tabs = 'Calculator' | 'Insights';

const Popup = () => {
  const [currentTab, setCurrentTab] = useState<tabs>('Calculator');
  return (
    <div className="container">
      <Header />
      {currentTab === 'Calculator' && <Calculator />}
      {currentTab === 'Insights' && <Insights />}
      <TabBar CurrentTab={currentTab} setCurrentTab={setCurrentTab} />
      {/* <Footer /> */}
    </div>
  );
};

export default Popup;
