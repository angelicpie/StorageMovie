import type { ReactNode } from "react";
import { UserContext, type GenrePrefs } from "@/context/UserContext";
import { CART_KEY, FAVORITES_KEY, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";
import { GENRES } from "@/views";

const allMovieLabels = GENRES.movies.map((g) => g.label);
const allTvLabels = GENRES.tv.map((g) => g.label);

const GENRE_PREFS_KEY = "genre_prefs";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries.map(([k, v]) => [Number(k), { ...v, id: Number(v.id) }])),
    serialize: (map) => Array.from(map.entries()),
  });
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries.map(([k, v]) => [Number(k), { ...v, id: Number(v.id) }])),
    serialize: (map) => Array.from(map.entries()),
  });
  const [genrePrefs, setGenrePrefs] = useLocalStorage<GenrePrefs>(GENRE_PREFS_KEY, {
    movies: allMovieLabels,
    tv: allTvLabels,
  });

  const toggleFavorite = (image: ImageCell) => {
    setFavorites((prev) => {
      const cloned = new Map(prev);
      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
        setCart((prev) => {
          const cloned = new Map(prev);
          cloned.delete(image.id);
          return cloned;
        });
      }
      return cloned;
    });
  };

  const toggleCart = (image: ImageCell) => {
    setCart((prev) => {
      const cloned = new Map(prev);
      if (cloned.has(image.id)) {
        cloned.delete(image.id);
      } else {
        cloned.set(image.id, image);
        setFavorites((prev) => {
          const cloned = new Map(prev);
          cloned.delete(image.id);
          return cloned;
        });
      }
      return cloned;
    });
  };

  const clearFavorites = () => setFavorites(new Map());
  const clearCart = () => setCart(new Map());

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        favorites,
        toggleFavorite,
        clearFavorites,
        cart,
        toggleCart,
        clearCart,
        genrePrefs,
        setGenrePrefs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};