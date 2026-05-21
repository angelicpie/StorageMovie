import { MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import type { ReviewsResponse } from '@/core';
import { useTmdb } from '@/hooks';
import { useParams, useLocation } from 'react-router-dom';

export const ReviewsView = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const isTv = pathname.startsWith('/tv/show/');
  const endpoint = isTv ? TV_ENDPOINT : MOVIE_ENDPOINT;

  const { data } = useTmdb<ReviewsResponse>(`${endpoint}/${id}/reviews`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="px-2 space-y-4">
      <h2 className="text-2xl font-bold">Reviews</h2>

      {data.results.length ? (
        data.results.slice(0, 5).map((review) => (
          <div key={review.id} className="bg-gray-800 p-5 rounded-xl shadow">
            <p className="text-sm text-gray-400 mb-2">By {review.author}</p>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{review.content}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No reviews available.</p>
      )}
    </section>
  );
};