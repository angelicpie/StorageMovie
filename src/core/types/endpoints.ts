export type MovieResponse = {
  id: number;
  title: string;
  name?: string; 
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  first_air_date?: string;
  results: Array<{
    name: string;
    id: number;
    original_title: string;
    original_name?: string;  
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
  }>;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  total_pages: number;
};

export type PriceInput = {
  release_date?: string;
  air_date?: string;
}

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string | null;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type SeasonsResponse = {
  poster_path(poster_path: any): string | undefined;
  seasons: Array<{
    id: number;
    name: string;
    air_date: string;
    episode_count: number;
    poster_path: string;
    season_number: number;

  }>;
};

export type EpisodeResponse = {
  name: string;
  overview: string;
  air_date: string;
  poster_path: string;
  episodes: Array<{
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    still_path: string;
  }>;
};

export type PersonResponse = {
  id: number;
  profile_path: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  name: string;
};

export type CareerResponse = {
  cast: Array<{
    id: number;
    poster_path: string;
    title: string;
    character: string;
    credit_id: string;
    name: string;
    first_air_date?: string;
    media_type?: string;
  }>
};

export type SearchResponse = {
  total_pages: number;
  results: Array<{
    id: number;
    title?: string;
    name?: string;
    original_title?: string;
    poster_path?: string;
    profile_path?: string;
    media_type?: string;
    release_date?: string;
    first_air_date?: string;
  }>;
};