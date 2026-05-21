import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { getImageUrl, TV_ENDPOINT, type ImageCell, type MovieResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { filterType = 'airing_today' } = useParams();

  const { data } = useTmdb<MovieResponse>(`${TV_ENDPOINT}/${filterType}`, { page });

  const gridData: ImageCell[] = (data?.results ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    // primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto space-y-5 p-5">
      <h1 className="text-3xl font-bold mb-4">TV</h1>
      <ButtonGroup
        value={filterType}
        options={[
          { label: 'Airing Today', value: 'airing_today' },
          { label: 'On The Air', value: 'on_the_air' },
          { label: 'Popular', value: 'popular' },
          { label: 'Top Rated', value: 'top_rated' },
        ]}
        onClick={(value) => {
          navigate(`/tv/category/${value}`);
          setPage(1);
        }}
      />
      <ImageGrid images={gridData} onClick={(image) => navigate(`/tv/show/${image.id}/credits`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};