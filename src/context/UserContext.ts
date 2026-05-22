import { createContext } from "react";
import type { ImageCell } from "@/core";

export type UserContextType = {
  userName: string;
  favorites: Map<number, ImageCell>;
  setUserName: (userName: string) => void;
  toggleFavorite: (image: ImageCell) => void;
  clearFavorites: () => void;

  cart: Map<number, ImageCell>;
  toggleCart: (image: ImageCell) => void;
  clearCart: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);