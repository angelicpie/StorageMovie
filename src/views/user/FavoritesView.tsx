import { useNavigate } from "react-router-dom";
import { ImageGrid, ImageOverlay } from "@/components";
import { favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";
import { useState } from "react"

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, clearFavorites } = useUserContext();
  const [filter, setFilter] = useState<"movie" | "tv">("movie");
  const allFavorites = Array.from(favorites.values());

  const movieFavorites = allFavorites.filter((f) => f.mediaType === 'movie');
  const tvFavorites = allFavorites.filter((f) => f.mediaType === 'tv');
  
  const filtered = filter === "movie" ? movieFavorites : tvFavorites;

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        {favorites.size > 0 && (
          <button className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-500" onClick={clearFavorites}>
            Clear All
          </button>
        )}
      </div>

      <div className="flex gap-5">
        <button
          className={`rounded px-4 py-2 text-white ${filter === "movie" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("movie")}
        >
          Movies
        </button>
        <button
          className={`rounded px-4 py-2 text-white ${filter === "tv" ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"}`}
          onClick={() => setFilter("tv")}
        >
          TV
        </button>
      </div>
      {filtered.length === 0 ? (
        <p className="mt-10 text-gray-400">{filter === "movie" ? "No movie favorites yet." : "No TV favorites yet."}</p>
      ) : (
        <ImageGrid
          images={filtered}
          onClick={(image) => (filter === "movie" ? navigate(`/movie/${image.id}/credits`) : navigate(`/tv/show/${image.secondaryID}/seasons`))}
        >
          {(image) => (
            <ImageOverlay actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]} image={image} />
          )}
        </ImageGrid>
      )}
    </section>
  );
};