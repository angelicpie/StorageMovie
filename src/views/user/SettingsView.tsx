import { Button } from '@/components';
import { useLocalStorage, useUserContext } from '@/hooks';
import { GENRES } from '@/views';
import { useState } from 'react';

const movieGenreList = GENRES.movies.map((g) => g.label);
const tvGenreList = GENRES.tv.map((g) => g.label);

export const SettingsView = () => {
  const { userName, setUserName } = useUserContext();
  const [value, setValue] = useState(userName);
  const [error, setError] = useState('');

  const [savedMovieGenres, setSavedMovieGenres] = useLocalStorage<string[]>('preferred_movie_genres', movieGenreList);
  const [savedTvGenres, setSavedTvGenres] = useLocalStorage<string[]>('preferred_tv_genres', tvGenreList);

  function handleMovieGenre(label: string) {
    if (savedMovieGenres.includes(label)) {
      setSavedMovieGenres(savedMovieGenres.filter((g) => g !== label));
    } else {
      setSavedMovieGenres([...savedMovieGenres, label]);
    }
  }

  function handleTvGenre(label: string) {
    if (savedTvGenres.includes(label)) {
      setSavedTvGenres(savedTvGenres.filter((g) => g !== label));
    } else {
      setSavedTvGenres([...savedTvGenres, label]);
    }
  }

  function handleSave() {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Username cannot be empty');
      return;
    }
    setUserName(trimmed);
    setError('');
  }

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="grid grid-cols-2 gap-6 items-start">
        <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <div>
            <h2 className="font-semibold text-lg">Profile</h2>
            <p className="text-gray-400 text-sm">Update your display profile</p>
          </div>
          <div className="space-y-2">
            <label className="text-gray-300 text-sm">Username</label>
            <input
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                setValue(e.target.value);
                setError('');
              }}
              placeholder="Enter your name"
              type="text"
              value={value}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setValue(userName)} variant="grey">
              Reset
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <div>
            <h2 className="font-semibold text-lg">Preferences</h2>
            <p className="text-gray-400 text-sm">Choose genres you like</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-base">Movies</h3>
            <div className="grid grid-cols-3 gap-2">
              {movieGenreList.map((label) => {
                const isSelected = savedMovieGenres.includes(label);
                return (
                  <button key={label} onClick={() => handleMovieGenre(label)} className="flex items-center gap-2 text-sm text-left">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${isSelected ? 'bg-pink-500' : 'bg-gray-700'}`}
                    >
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </span>
                    <span className="text-gray-300">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-base">TV</h3>
            <div className="grid grid-cols-3 gap-2">
              {tvGenreList.map((label) => {
                const isSelected = savedTvGenres.includes(label);
                return (
                  <button key={label} onClick={() => handleTvGenre(label)} className="flex items-center gap-2 text-sm text-left">
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${isSelected ? 'bg-pink-500' : 'bg-gray-700'}`}
                    >
                      {isSelected && <span className="text-white text-xs">✓</span>}
                    </span>
                    <span className="text-gray-300">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
