import React from 'react';
import { LayoutDashboard, CloudSun, AlertTriangle, Sprout, Store, MessageSquare } from 'lucide-react';
import { useApp, ActiveTab } from '../../context/AppContext';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, weatherRisks } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-5 h-5" />, badge: weatherRisks.length },
    { id: 'crops', label: 'Crops', icon: <Sprout className="w-5 h-5" /> },
    { id: 'market', label: 'Market', icon: <Store className="w-5 h-5" /> },
    { id: 'aichat', label: 'AI Chat', icon: <MessageSquare className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-300 px-2 py-2 flex items-center justify-around z-40 shadow-lg">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg relative ${
              isActive ? 'text-emerald-900 font-bold' : 'text-stone-500 font-normal'
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
