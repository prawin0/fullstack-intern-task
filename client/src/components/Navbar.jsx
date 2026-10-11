import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium transition ${
    isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`;

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/templates" className="text-xl font-bold text-indigo-600">
          TemplateStore
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/templates" className={linkClass}>Templates</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/favorites" className={linkClass}>My Favorites</NavLink>
              <span className="hidden md:inline text-sm text-slate-500 px-2">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              <NavLink to="/register" className={linkClass}>Register</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
