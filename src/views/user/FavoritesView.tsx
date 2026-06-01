import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGrid, ImageOverlay, ButtonGroup } from "@/components";
import { favoriteAction, type ImageCell } from "@/core";
import { useUserContext } from "@/hooks";

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, clearFavorites } = useUserContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const mediaType = searchParams.get('mediaType') || 'movie';
  const isMovie = mediaType === 'movie';
  const filteredFavorites = Array.from(favorites.values()).filter((item) =>
    isMovie ? item.mediaType === 'movie' : item.mediaType === 'tv'
  );

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Favorites</h1>
        {filteredFavorites.length > 0 && (
          <button
            className="rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/40"
            onClick={clearFavorites}
          >
            Clear All
          </button>
        )}
      </div>
      <ButtonGroup
        value={mediaType}
        options={[
          { label: 'Movies', value: 'movie' },
          { label: 'TV Shows', value: 'tv' },
        ]}
        onClick={(value) => setSearchParams({ mediaType: value })}
      />
      {filteredFavorites.length === 0 ? (
        <p className="mt-10 text-gray-400">No {isMovie ? 'movie' : 'TV'} favorites yet.</p>
      ) : (
        <ImageGrid
          images={filteredFavorites}
          onClick={(image) =>
            isMovie
              ? navigate(`/movie/${image.id}/credits`)
              : navigate(`/tv/show/${image.secondaryID}/seasons`)
          }
        >
          {(image) => (
            <ImageOverlay
              actions={[favoriteAction((image: ImageCell) => favorites.has(image.id), toggleFavorite)]}
              image={image}
            />
          )}
        </ImageGrid>
      )}
    </section>
  );
};