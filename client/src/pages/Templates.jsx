import { useEffect, useState } from 'react';
import api, { getErrorMessage } from '../api/axios';
import TemplateCard from '../components/TemplateCard';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/templates/categories').then(({ data }) => setCategories(data)).catch(() => {});
  }, []);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setLoading(true);
    setError('');
    api
      .get('/templates', { params: { search: debouncedSearch, category } })
      .then(({ data }) => setTemplates(data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, [debouncedSearch, category]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Templates</h1>
      <p className="text-slate-600 mt-1">Browse templates and favorite the ones you love.</p>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          type="search"
          placeholder="Search templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg bg-white"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <p className="mt-10 text-center text-slate-500">Loading templates...</p>}
      {error && <p className="mt-10 text-center text-red-600">{error}</p>}
      {!loading && !error && templates.length === 0 && (
        <p className="mt-10 text-center text-slate-500">No templates found.</p>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>
    </main>
  );
}
