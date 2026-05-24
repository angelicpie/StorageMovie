import { getImageUrl, TV_ENDPOINT, type SeasonsResponse } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { ICON_SIZE } from "@/core";

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {});
  const { favorites, toggleFavorite } = useUserContext();
  const { cart, toggleCart } = useUserContext();


  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2 space-y-4">
      <h2 className="text-2xl font-bold">Seasons</h2>

      {data.seasons?.length ? (
        data.seasons.slice(0, 5).map((season) => (
          <div
            key={season.id}
            className="flex gap-4 items-center bg-gray-800 hover:bg-gray-700 p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
            onClick={() => navigate(`/tv/show/${id}/season/${season.season_number}`)}
          >
            <img
              className="w-16 h-24 rounded-xl object-cover shrink-0 shadow-md"
              src={getImageUrl(season.poster_path)}
              alt={season.name}
            />

            <p className="text-white font-semibold flex-1">{season.name}</p>

            <button
              className="rounded-full p-2 transition hover:bg-white/10 active:scale-90 shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite({
                  id: season.id,
                  imageUrl: getImageUrl(season.poster_path),
                  primaryText: season.name,
                });
              }}
            >
              {favorites.has(season.id) ? (
                <FaHeart className="text-blue-500" size={ICON_SIZE} />
              ) : (
                <FaRegHeart className="text-gray-300" size={ICON_SIZE} />
              )}
            </button>

            <button
                className="rounded-full p-2 transition hover:bg-black/40"
                onClick={() =>
                  toggleCart({
                    id: season.id,
                    imageUrl: getImageUrl(season.poster_path),
                    primaryText: season.name,
                  })
                }
              >
                {cart.has(season.id) ? (
                  <FaShoppingCart className="text-blue-500" size={ICON_SIZE} />
                ) : (
                  <FaShoppingCart className="text-white" size={ICON_SIZE} />
                )}
              </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No Seasons Available.</p>
      )}
    </section>
  );
};