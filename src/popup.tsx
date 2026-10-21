import React, { useEffect, useState } from 'react';
import TabBar, { tabs } from './components/TabBar';
import Calculator from './pages/Calculator';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Header from './components/Header';
import { loadAllSettingsFromLocalStorage } from './utils/calculator_methods';

const Popup = () => {
  const [currentTab, setCurrentTab] = useState<tabs>('Calculator');

  useEffect(() => {
    const settings = loadAllSettingsFromLocalStorage();
    chrome.storage.local.set(settings);
  }, []);

  return (
    <div className="container">
      <Header />
      {currentTab === 'Calculator' && <Calculator />}
      {currentTab === 'Insights' && <Insights />}
      {currentTab === 'Settings' && <Settings />}
      <TabBar CurrentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default Popup;
