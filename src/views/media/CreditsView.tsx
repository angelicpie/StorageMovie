import { ImageGrid } from '@/components';
import { getImageUrl, MOVIE_ENDPOINT, TV_ENDPOINT, type CreditsResponse, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const CreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isTv = pathname.startsWith('/tv/show/');
  const endpoint = isTv ? TV_ENDPOINT : MOVIE_ENDPOINT;

  const { data } = useTmdb<CreditsResponse>(isTv ? `${endpoint}/${id}/aggregate_credits` : `${endpoint}/${id}/credits`, {});

  const gridData: ImageCell[] = (data?.cast ?? []).map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.profile_path ?? ''),
    primaryText: result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-5 p-5">
      <h2 className="text-2xl font-bold mb-6">Credits</h2>
      {data.cast.length ? (
        <ImageGrid images={gridData} onClick={(image) => navigate(`/person/${image.id}`)} />
      ) : (
        <p className="text-gray-400 text-center">No credits available.</p>
      )}
    </section>
  );
};
