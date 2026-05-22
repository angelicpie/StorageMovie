import type { ReactNode } from "react";
import { UserContext } from "@/context/UserContext";
import { CART_KEY, FAVORITES_KEY, type ImageCell, USERNAME_KEY } from "@/core";
import { useLocalStorage } from "@/hooks";

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userName, setUserName] = useLocalStorage<string, string>(USERNAME_KEY, "User");
  const [favorites, setFavorites] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(FAVORITES_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
  });
  
  const [cart, setCart] = useLocalStorage<Map<number, ImageCell>, [number, ImageCell][]>(CART_KEY, new Map(), {
    deserialize: (entries) => new Map(entries),
    serialize: (map) => Array.from(map.entries()),
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
        favorites,
        setUserName,
        toggleFavorite,
        clearFavorites,
        userName,
        cart,
        toggleCart,
        clearCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};