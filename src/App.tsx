import { MainLayout } from '@/layouts/MainLayout';
import { ErrorView, GenreView, HomeView, ReviewsView, TrendingView, MoviesView, TelevisionView, CreditsView, TrailerView, SeasonsView, EpisodeView, PersonView, CareerView, ImagesView, SearchView, FavoritesView, SettingsView } from '@/views';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MovieView } from './views/media/movies/MovieView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />
      <Route element={<MainLayout />}>
        <Route path="/movies" element={<Navigate to="/movies/category/now_playing" replace />} />
        <Route path="/movies/category/:filterType" element={<MoviesView />} />

        <Route path="/trending/:mediaType" element={<TrendingView />} />
        <Route path="/genre/:mediaType/:genre" element={<GenreView />} />

        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailerView />} />
        </Route>

      <Route path="/tv" element={<Navigate to="/tv/category/airing_today" replace />} />
        <Route path="/tv/category/:filterType" element={<TelevisionView />} />
        <Route path="/tv/show/:id" element={<MovieView />}>
          <Route path="reviews" element={<ReviewsView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="trailers" element={<TrailerView />} />
          <Route path="seasons" element={<SeasonsView />} />
        </Route>

        <Route path="/tv/show/:id/season/:seasonNumber" element={<EpisodeView />} />

        <Route path="/person/:id" element={<PersonView />}>
          <Route path="career" element={<CareerView />} />
          <Route path="images" element={<ImagesView />} />
        </Route>

      <Route path="/search" element={<SearchView />}></Route>  
      <Route path="/favorites" element={<FavoritesView />}></Route>
      <Route path="/settings" element={<SettingsView />}></Route>
      </Route>
      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};