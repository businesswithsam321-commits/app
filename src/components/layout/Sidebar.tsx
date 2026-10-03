import React from 'react';
import { LayoutDashboard, CloudSun, AlertTriangle, Sprout, Store, MessageSquare } from 'lucide-react';
import { useApp, ActiveTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, farmContext, weatherRisks } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'weather', label: 'Weather', icon: <CloudSun className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4 text-amber-600" />, badge: weatherRisks.length },
    { id: 'crops', label: 'Crop Advice', icon: <Sprout className="w-4 h-4" /> },
    { id: 'market', label: 'Market', icon: <Store className="w-4 h-4" /> },
    { id: 'aichat', label: 'AI Chat', icon: <MessageSquare className="w-4 h-4 text-emerald-700" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-[#F8F6F0] border-r border-stone-300 p-4 shrink-0">
      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider px-3 mb-2">
        Core Application
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-700 hover:bg-stone-200/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-white' : 'text-stone-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`font-bold text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="p-3.5 bg-white border border-stone-300 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider">
              Farm Context
            </span>
            <span className="text-[9px] bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-semibold">Active</span>
          </div>
          <div className="space-y-1.5 text-xs text-stone-700">
            <div className="flex justify-between">
              <span className="text-stone-500">Crop:</span>
              <span className="font-bold text-emerald-900">{farmContext.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Season:</span>
              <span className="font-medium">{farmContext.season}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Soil:</span>
              <span className="font-medium">{farmContext.soil.split('/')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Water:</span>
              <span className="font-medium">{farmContext.water.split('/')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Stage:</span>
              <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">{farmContext.stage.split('/')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
