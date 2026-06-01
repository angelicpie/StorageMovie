import { ImageGrid, Pagination } from '@/components';
import { type ImageCell, type SearchResponse, getImageUrl, RATE_LIMIT_DELAY, SEARCH_ENDPOINT, ICON_SIZE } from '@/core';
import { useDebounce, useTmdb, useUserContext } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);
  const mediaType = searchParams.get('mediaType') || 'movie';
  const { favorites, toggleFavorite } = useUserContext();
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<SearchResponse>(`${SEARCH_ENDPOINT}/${mediaType}`, { query: debouncedQuery, page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path ?? result.profile_path ?? ''),
    primaryText: result.original_title ?? result.name ?? '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const isMovie = mediaType === 'movie';

  const handleClick = (image: ImageCell) => {
    if (mediaType === 'movie') {
      navigate(`/movie/${image.id}/credits`);
    } else if (mediaType === 'tv') {
      navigate(`/tv/show/${image.id}/seasons`);
    } else {
      navigate(`/person/${image.id}/career`);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search for: {query}</h1>

      <ImageGrid images={gridData} onClick={handleClick}>
        {(image) =>
          isMovie && (
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
          )
        }
      </ImageGrid>

      {data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};