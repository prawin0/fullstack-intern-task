import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../api/axios';

// Shared form for Login and Register
export default function AuthForm({ title, fields, submitLabel, onSubmit, footer }) {
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {error && <div className="mb-4 p-3 rounded-md bg-red-50 text-red-700 text-sm">{error}</div>}
        {fields.map((f) => (
          <div key={f.name} className="mb-4">
            <label htmlFor={f.name} className="block text-sm font-medium mb-1">{f.label}</label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              minLength={f.minLength}
              value={values[f.name]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? 'Please wait...' : submitLabel}
        </button>
        <p className="mt-4 text-sm text-center text-slate-600">
          {footer.text} <Link to={footer.to} className="text-indigo-600 font-medium">{footer.link}</Link>
        </p>
      </form>
    </div>
  );
}
