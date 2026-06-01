import { calculatePrice, getImageUrl, ICON_SIZE, TV_ENDPOINT, type SeasonsResponse } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});
  const { favorites, toggleFavorite, cart, toggleCart } = useUserContext();

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2 space-y-4">
      {data.seasons?.length ? (
        <div className="grid grid-cols-3 gap-3">
          {data.seasons.slice(0, 5).map((season) => {
            const price = calculatePrice(season);
            const isFav = favorites.has(season.id);
            const inCart = cart.has(season.id);

            return (
              <div
                key={season.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer shadow-lg group"
                onClick={() => navigate(`/tv/show/${id}/season/${season.season_number}`)}
              >
                <img className="w-full aspect-[2/3] object-cover" src={getImageUrl(season.poster_path)} alt={season.name} />
                <button
                  className="absolute top-2 left-2 bg-blue-500 rounded-full p-1.5 shadow transition active:scale-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite({
                      id: season.id,
                      imageUrl: getImageUrl(season.poster_path),
                      primaryText: season.name,
                      secondaryID: id,
                      mediaType: 'tv' as const,
                      secondaryText: `$${calculatePrice(season).toFixed(2)}`,
                      price: calculatePrice(season),
                    });
                  }}
                >
                  {isFav ? <FaHeart className="text-white" size={ICON_SIZE} /> : <FaRegHeart className="text-white" size={ICON_SIZE} />}
                </button>

                <button
                  className="absolute top-2 right-2 bg-gray-700/80 rounded-full p-1.5 shadow transition active:scale-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCart({
                      id: season.id,
                      imageUrl: getImageUrl(season.poster_path),
                      primaryText: season.name,
                      secondaryID: id,
                      mediaType: 'tv' as const,
                      secondaryText: `$${calculatePrice(season).toFixed(2)}`,
                      price: calculatePrice(season),
                    });
                  }}
                >
                  <FaShoppingCart className={inCart ? 'text-blue-400' : 'text-white'} size={ICON_SIZE} />
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 pt-6 pb-2">
                  <p className="text-white text-xs font-semibold truncate">{season.name}</p>
                  <p className="text-blue-400 text-xs font-semibold">${price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No Seasons Available.</p>
      )}
    </section>
  );
};
