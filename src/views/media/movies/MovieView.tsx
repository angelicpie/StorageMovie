import { DetailItem, LinkGroup, Modal } from '@/components';
import { calculatePrice, type MovieResponse, getBackdropUrl, getImageUrl, ICON_SIZE, MOVIE_ENDPOINT, TV_ENDPOINT } from '@/core';
import { useTmdb, useUserContext } from '@/hooks';
import { FaShoppingCart } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const navigate = useNavigate();
  const { cart, toggleCart } = useUserContext();
  const { id } = useParams();
  const { pathname } = useLocation();
  const isTvRoute = pathname.startsWith('/tv/show/');
  const endpoint = isTvRoute ? TV_ENDPOINT : MOVIE_ENDPOINT;
  const { data } = useTmdb<MovieResponse>(`${endpoint}/${id}`, { append_to_response: 'videos' });

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const isTv = !!data.first_air_date;

  const title = data.name ?? data.title;
  const releaseDate = data.first_air_date ?? data.release_date;

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img className="h-50 w-full rounded-2xl object-cover" src={getBackdropUrl(data.backdrop_path)} alt={data.title} />
        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img className="w-50 rounded-xl object-cover" src={getImageUrl(data.poster_path)} alt={data.title} />
          <div className="space-y-4 overflow-y-auto">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="leading-relaxed text-gray-300">{data.overview}</p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem label="Release" value={releaseDate} />
              <DetailItem label="Rating" value={data.vote_average} />
            </div>

            {!isTv && (
              <button
                className="rounded-full p-2 transition hover:bg-black/40"
                onClick={() =>
                  toggleCart({
                    id: data.id,
                    imageUrl: getImageUrl(data.poster_path),
                    primaryText: data.title,
                    mediaType: 'movie',
                    price: calculatePrice({
                      release_date: data.release_date,
                      air_date: data.first_air_date,
                    }),
                  })
                }
              >
                {cart.has(data.id) ? (
                  <FaShoppingCart className="text-blue-500" size={ICON_SIZE} />
                ) : (
                  <FaShoppingCart className="text-white" size={ICON_SIZE} />
                )}
              </button>
            )}

            <LinkGroup
              options={[
                ...(isTv ? [{ label: 'Seasons', to: 'seasons' }] : []),
                { label: 'Credits', to: 'credits' },
                { label: 'Reviews', to: 'reviews' },
                { label: 'Trailers', to: 'trailers' },
              ]}
            />
            <Outlet context={{ data }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
