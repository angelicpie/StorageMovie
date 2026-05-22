import { useNavigate } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, clearFavorites } = useUserContext();

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        {favorites.size > 0 && (
          <button
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/40"
            onClick={clearFavorites}
          >
            Clear All
          </button>
        )}
      </div>
      {favorites.size === 0 ? (
        <p className="mt-10 text-gray-400">You have no favorites yet.</p>
      ) : (
        <ImageGrid images={Array.from(favorites.values())} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};