import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import ThemeToggle from '../ui/ThemeToggle';

function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="layout">
      <nav className="topbar">
        <NavLink to="/" end className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}>
          Дашборд
        </NavLink>
        <ThemeToggle />
      </nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
