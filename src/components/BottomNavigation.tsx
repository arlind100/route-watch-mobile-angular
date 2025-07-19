import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, List, Info } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { to: '/', icon: Map, label: 'Map' },
    { to: '/buses', icon: List, label: 'Buses' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;