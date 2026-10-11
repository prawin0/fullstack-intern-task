import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getErrorMessage } from '../api/axios';

export default function TemplateCard({ template }) {
  const { isAuthenticated } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const favorited = isFavorite(template.id);

  const handleClick = async () => {
    if (!isAuthenticated) return navigate('/login');
    setBusy(true);
    try {
      await toggleFavorite(template);
    } catch (err) {
      alert(getErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition">
      <img
        src={template.thumbnail_url}
        alt={template.name}
        loading="lazy"
        className="h-44 w-full object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          {template.category}
        </span>
        <h3 className="mt-1 text-lg font-semibold">{template.name}</h3>
        <p className="mt-1 text-sm text-slate-600 flex-1">{template.description}</p>
        <button
          onClick={handleClick}
          disabled={busy}
          className={`mt-4 w-full py-2 rounded-lg text-sm font-medium transition disabled:opacity-60 ${
            favorited
              ? 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {favorited ? '♥ Favorited (click to remove)' : '♡ Favorite'}
        </button>
      </div>
    </div>
  );
}
