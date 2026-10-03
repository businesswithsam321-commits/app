import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { WeatherView } from './components/weather/WeatherView';
import { AlertsView } from './components/alerts/AlertsView';
import { CropAdviceView } from './components/crops/CropAdviceView';
import { MarketView } from './components/market/MarketView';
import { AiChatView } from './components/chat/AiChatView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'weather' && <WeatherView />}
      {activeTab === 'alerts' && <AlertsView />}
      {activeTab === 'crops' && <CropAdviceView />}
      {activeTab === 'market' && <MarketView />}
      {activeTab === 'aichat' && <AiChatView />}
    </main>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#F8F6F0] text-stone-900 font-sans flex flex-col antialiased">
        <Header />
        <div className="flex-1 flex flex-col md:flex-row pb-20 md:pb-0">
          <Sidebar />
          <MainContent />
        </div>
        <MobileNav />
      </div>
    </AppProvider>
  );
}

export default App;
