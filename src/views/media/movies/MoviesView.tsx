import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { calculatePrice, getImageUrl, ICON_SIZE, MOVIE_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { filterType = 'now_playing' } = useParams();

  const { favorites, toggleFavorite } = useUserContext();

  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${filterType}`, { page });

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
    secondaryText: `$${calculatePrice(result).toFixed(2)}`,
    mediaType: 'movie' as const,
    price: calculatePrice(result),
  }));

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <ButtonGroup
        value={filterType}
        options={[
          { label: 'Now Playing', value: 'now_playing' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
          { label: 'Upcoming', value: 'upcoming' },
        ]}
        onClick={(value) => {
          navigate(`/movies/category/${value}`);
          setPage(1);
        }}
      />

      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)}>
        {(image) => (
          <button
            className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-2 transition hover:bg-black/70"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(image);
            }}
          >
            {favorites.has(image.id) ? (
              <FaHeart className="text-blue-500" size={ICON_SIZE} />
            ) : (
              <FaRegHeart className="text-white" size={ICON_SIZE} />
            )}
          </button>
        )}
      </ImageGrid>

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
