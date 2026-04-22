import React from 'react';

const SidebarLink = ({ id, label, icon: Icon, active, onClick, collapsed }) => (
  <button 
    onClick={() => onClick(id)}
    className={`sidebar-link ${active ? 'sidebar-link-active' : ''} ${collapsed ? 'justify-center w-full' : 'w-full'}`}
  >
    <Icon size={collapsed ? 24 : 20} strokeWidth={active ? 2.5 : 2} />
    {!collapsed && <span className="font-bold">{label}</span>}
  </button>
);

export default SidebarLink;
