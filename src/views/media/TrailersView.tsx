import type { MovieResponse } from '@/core';
import { MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb } from '@/hooks';
import { useLocation, useParams } from 'react-router-dom';

export const TrailerView = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const isTv = pathname.startsWith('/tv/show/');
  const endpoint = isTv ? TV_ENDPOINT : MOVIE_ENDPOINT;

  const { data } = useTmdb<MovieResponse>(`${endpoint}/${id}`, { append_to_response: 'videos' });

  const trailerVideo =
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.name?.toLowerCase().includes('official')) ||
    data?.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="gap-8 flex-1 space-y-4">
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">Trailer</h1>
        {trailerVideo && (
          <div className="aspect-video">
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title="Movie Trailer"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
};
