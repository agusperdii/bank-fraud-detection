import React from 'react';
import { Shield, LayoutDashboard, CreditCard, BarChart3, Layers, ChevronRight, X } from 'lucide-react';
import SidebarLink from '../molecules/SidebarLink';

const Sidebar = ({ currentTab, setCurrentTab, collapsed, setCollapsed, isOpen, setIsOpen }) => {
  const links = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'predictor', label: 'Fraud Predictor', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'methodology', label: 'Methodology', icon: Layers },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-[70] bg-brand-surface border-r border-brand-surfaceLight flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-20' : 'lg:w-72'}
          w-72
        `}
      >
        <div className="h-20 lg:h-24 px-6 flex items-center justify-between border-b border-brand-surfaceLight/50">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-brand-primary fill-brand-primary/10 shrink-0" />
            {(!collapsed || isOpen) && (
              <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Group 2
              </span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 p-2">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          {links.map(link => (
            <SidebarLink 
              key={link.id}
              {...link}
              active={currentTab === link.id}
              onClick={(id) => {
                setCurrentTab(id);
                setIsOpen(false);
              }}
              collapsed={collapsed && !isOpen}
            />
          ))}
        </nav>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex m-4 p-3 bg-brand-surfaceLight hover:bg-brand-surfaceLight/80 rounded-xl text-slate-400 hover:text-brand-primary transition-all justify-center items-center shadow-lg"
        >
          {collapsed ? <ChevronRight size={20} /> : <X size={20} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
