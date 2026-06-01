import { ImageGrid } from '@/components';
import { getImageUrl, PERSON_ENDPOINT, type CareerResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<CareerResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.title ?? result.name ?? '',
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-5 space-y-8">
      <h1 className="text-3xl font-bold">Career</h1>
      <ImageGrid
        images={gridData}
        onClick={(image) => {
          const item = data.cast.find((c) => c.id === image.id);
          const isTv = item?.media_type === 'tv' || !!item?.first_air_date;
          if (isTv) {
            navigate(`/tv/show/${image.id}/credits`);
          } else {
            navigate(`/movie/${image.id}/credits`);
          }
        }}
      />
    </section>
  );
};
