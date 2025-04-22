import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'favorites-posts';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Инициализация из localStorage при монтировании
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Сохраняем изменения в localStorage
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Добавление поста в избранное
  const addToFavorites = useCallback((postId: number) => {
    setFavorites((prev) => {
      if (!prev.includes(postId)) {
        return [...prev, postId];
      }
      return prev;
    });
  }, []);

  // Удаление поста из избранного
  const removeFromFavorites = useCallback((postId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== postId));
  }, []);

  // Проверка, находится ли пост в избранном
  const isFavorite = useCallback(
    (postId: number) => {
      return favorites.includes(postId);
    },
    [favorites]
  );

  // Переключение статуса избранного
  const toggleFavorite = useCallback(
    (postId: number) => {
      if (isFavorite(postId)) {
        removeFromFavorites(postId);
      } else {
        addToFavorites(postId);
      }
    },
    [isFavorite, removeFromFavorites, addToFavorites]
  );

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };
}
