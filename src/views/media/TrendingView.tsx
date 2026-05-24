import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, type ImageCell, type MovieResponse, TRENDING_ENDPOINT } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ICON_SIZE } from "@/core";


export const TrendingView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const { mediaType = 'movie' } = useParams();
  const interval = searchParams.get('interval') ?? 'day';
  const { favorites, toggleFavorite } = useUserContext();
  const isMovie = mediaType === 'movie';

  const { data } = useTmdb<MovieResponse>(`${TRENDING_ENDPOINT}/${mediaType}/${interval}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name,
    mediaType: isMovie ? 'movie' : 'tv' as const,
  }));

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <div className="flex items-center justify-between mb-4">
        <ButtonGroup
          value={mediaType}
          options={[
            { label: 'Movies', value: 'movie' },
            { label: 'TV Shows', value: 'tv' },
          ]}
          onClick={(value) => {
            navigate(`/trending/${value}?interval=${interval}`);
            setPage(1);
          }}
        />
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => {
            setSearchParams({ interval: value });
            setPage(1);
          }}
        />
      </div>
      <ImageGrid
        images={gridData}
        onClick={(image) =>
          navigate(mediaType === 'movie' ? `/movie/${image.id}/credits` : `/tv/show/${image.id}/credits`)
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