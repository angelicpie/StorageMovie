import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, MOVIE_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { filterType = 'now_playing' } = useParams();

  const { data } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${filterType}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

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
      <ImageGrid images={gridData} onClick={(image) => navigate(`/movie/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};