import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { Link, SearchBar, ButtonGroup } from '@/components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ICON_SIZE } from "@/core";
import { useUserContext } from "@/hooks";

export const Header = () => {
const navigate = useNavigate();
const { userName, favorites, cart } = useUserContext();
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get('q') ?? '';
const mediaType = searchParams.get('mediaType') || 'movie';

const handleSearch = (value: string) => {
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

const updateParam = (key: string, value: string) => {
    setSearchParams({ q: query, mediaType, page: '1', [key]: value });
  };

  return (
    <header>
      <nav className='flex justify-between bg-gray-800'>
        <div className='flex gap-4 p-4'>
          <h1 className="text-2xl font-bold text-white">TMDB Explorer</h1>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV</Link>
          <Link to="/trending/movie">Trending</Link>
          <Link to="/genre/movies/action">Genres</Link>
        </div>

        <div className="flex items-center">
          <h1 className="mr-4 text-gray-300 text-xl">Welcome, {userName}!</h1>
          <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/favorites")}>
            <FaRegHeart size={ICON_SIZE} />
            {favorites.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {favorites.size}
              </span>
            )}
          </button>

          <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/cart")}>
            <FaShoppingCart size={ICON_SIZE} />
            {cart.size > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
                {cart.size}
              </span>
            )}
          </button>

          <button className="relative rounded-full p-2 transition hover:bg-gray-700" onClick={() => navigate("/settings")}>
            <GoGear size={ICON_SIZE} />
          </button>
        </div>

        <div className='flex items-center gap-4 p-4'>
          <SearchBar value={query} onChange={handleSearch}/>
          <ButtonGroup 
            value={mediaType}
            options={[
              { label: 'Movies', value: 'movie' },
              { label: 'TV Shows', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            onClick={(value) => updateParam('mediaType', value)}
          />
        </div>
      </nav>
    </header>
  );
};