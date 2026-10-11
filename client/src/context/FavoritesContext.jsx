import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]); // full template objects
  const [loading, setLoading] = useState(false);

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) return setFavorites([]);
    setLoading(true);
    try {
      const { data } = await api.get('/favorites');
      setFavorites(data);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const isFavorite = (id) => favorites.some((t) => t.id === id);

  const addFavorite = async (template) => {
    await api.post(`/favorites/${template.id}`);
    setFavorites((prev) => (prev.some((t) => t.id === template.id) ? prev : [...prev, template]));
  };

  const removeFavorite = async (id) => {
    await api.delete(`/favorites/${id}`);
    setFavorites((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (template) =>
    isFavorite(template.id) ? removeFavorite(template.id) : addFavorite(template);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
