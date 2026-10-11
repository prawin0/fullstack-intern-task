import { Link } from 'react-router-dom';
import TemplateCard from '../components/TemplateCard';
import { useFavorites } from '../context/FavoritesContext';

export default function Favorites() {
  const { favorites, loading } = useFavorites();

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">My Favorites</h1>

      {loading && <p className="mt-10 text-center text-slate-500">Loading favorites...</p>}

      {!loading && favorites.length === 0 && (
        <div className="mt-10 text-center text-slate-500">
          <p>You haven't favorited any templates yet.</p>
          <Link to="/templates" className="text-indigo-600 font-medium">Browse templates →</Link>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </main>
  );
}
