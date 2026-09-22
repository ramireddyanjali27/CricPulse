import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Shield, User, Trophy, Radio, Menu, X } from 'lucide-react';
import './Admin.css';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/teams', icon: Shield, label: 'Teams' },
  { path: '/admin/players', icon: User, label: 'Players' },
  { path: '/admin/matches', icon: Trophy, label: 'Matches' },
  { path: '/admin/scores', icon: Radio, label: 'Scores' },
];

export default function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div className="admin-sidebar__title">Admin Panel</div>
          <button className="navbar__hamburger" onClick={() => setSidebarOpen(false)} style={{ display: 'flex' }}>
            <X size={20} />
          </button>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-nav__link ${location.pathname === item.path || (item.exact === false && location.pathname.startsWith(item.path)) ? 'admin-nav__link--active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <button className="admin-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={20} />
        </button>
        <Outlet />
      </main>
    </div>
  );
}
