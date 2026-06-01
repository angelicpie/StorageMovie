import { getImageUrl, TV_ENDPOINT, type EpisodeResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();
  const { data } = useTmdb<EpisodeResponse>(`${TV_ENDPOINT}/${id}/season/${seasonNumber}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-7xl mx-auto p-5 space-y-8">
      <div className="flex gap-6">
        <img className="w-40 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.name} />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-400 text-sm">{data.air_date}</p>
          <p className="text-gray-300 leading-relaxed">{data.overview}</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Episodes</h2>
        {data.episodes.map((episode) => (
          <div key={episode.id} className="bg-gray-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm">E{episode.episode_number}</span>
              <h3 className="text-lg font-semibold">{episode.name}</h3>
              <span className="text-gray-400 text-sm ml-auto">{episode.air_date}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{episode.overview}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
