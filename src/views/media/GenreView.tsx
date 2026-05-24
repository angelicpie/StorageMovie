import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type MovieResponse, type ImageCell, MOVIE_GENRES_ENDPOINT, TV_GENRES_ENDPOINT } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE } from "@/core";


export const GENRES = {
  movies: [
    { label: 'Action', value: 'action', id: '28' },
    { label: 'Adventure', value: 'adventure', id: '12' },
    { label: 'Animation', value: 'animation', id: '16' },
    { label: 'Crime', value: 'crime', id: '80' },
    { label: 'Family', value: 'family', id: '10751' },
    { label: 'Fantasy', value: 'fantasy', id: '14' },
    { label: 'History', value: 'history', id: '36' },
    { label: 'Horror', value: 'horror', id: '27' },
    { label: 'Mystery', value: 'mystery', id: '9648' },
    { label: 'Sci-Fi', value: 'sci-fi', id: '878' },
  ],
  tv: [
    { label: 'Action & Adventure', value: 'action-adventure', id: '10759' },
    { label: 'Animation', value: 'animation', id: '16' },
    { label: 'Comedy', value: 'comedy', id: '35' },
    { label: 'Crime', value: 'crime', id: '80' },
    { label: 'Drama', value: 'drama', id: '18' },
    { label: 'Family', value: 'family', id: '10751' },
    { label: 'Kids', value: 'kids', id: '10762' },
    { label: 'Mystery', value: 'mystery', id: '9648' },
    { label: 'Sci-Fi', value: 'sci-fi', id: '10765' },
  ],
};

export const GenreView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { mediaType = 'movies', genre = 'action' } = useParams();
  const { favorites, toggleFavorite } = useUserContext();

  const isMovie = mediaType === 'movies';
  const genres = GENRES[mediaType as keyof typeof GENRES] ?? GENRES.movies;
  const genreId = genres.find((g) => g.value === genre)?.id ?? genres[0].id;
  const endpoint = isMovie ? MOVIE_GENRES_ENDPOINT : TV_GENRES_ENDPOINT;

  const { data } = useTmdb<MovieResponse>(endpoint, { page, with_genres: genreId });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name,
  }));

  const handleMediaTypeSwitch = (value: string) => {
    const newGenres = GENRES[value as keyof typeof GENRES] ?? GENRES.movies;
    navigate(`/genre/${value}/${newGenres[0].value}`);
    setPage(1);
  };

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex justify-between">
        <div className="flex flex-col items-start gap-3">
          <ButtonGroup
            value={mediaType}
            options={[
              { label: 'Movies', value: 'movies' },
              { label: 'TV Shows', value: 'tv' },
            ]}
            onClick={handleMediaTypeSwitch}
          />
          <ButtonGroup
            value={genre}
            options={genres}
            onClick={(value) => {
              navigate(`/genre/${mediaType}/${value}`);
              setPage(1);
            }}
          />
        </div>
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) =>
          navigate(isMovie ? `/movie/${image.id}/credits` : `/tv/show/${image.id}/credits`)
        }
      >
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