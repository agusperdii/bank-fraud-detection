import React from 'react';
import { Menu } from 'lucide-react';
import Badge from '../atoms/Badge';

const Header = ({ title, onMenuClick }) => {
  return (
    <header className="h-20 px-6 lg:px-10 flex items-center justify-between border-b border-brand-surfaceLight/30 bg-brand-bg/80 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-base lg:text-xl font-black tracking-tighter text-white uppercase truncate max-w-[150px] lg:max-w-none">
            {title}
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-brand-primary" />
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Group 2</p>
          </div>
        </div>
      </div>
      
      <Badge variant="success" animate className="scale-90 lg:scale-100 origin-right">
        <span className="hidden sm:inline">Live System Active</span>
        <span className="sm:hidden">Live</span>
      </Badge>
    </header>
  );
};

export default Header;
