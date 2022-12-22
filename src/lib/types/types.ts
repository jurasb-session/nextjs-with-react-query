export enum URLS {
  FIND_MOVIES = "findMovies",
  MOVIE_DETAILS = "movieDetails",
}

export interface Image {
  id: string;
  url: string;
  height: number;
  width: number;
}

export type TitleType =
  | "movie"
  | "tvSeries"
  | "video"
  | "tvMovie"
  | "videoGame";

export interface Movie {
  id: string;
  title: string;
  titleType: TitleType;
  year?: number;
  image?: Image;
  proOnly?: boolean;
  disambiguation?: "I";
}

export interface Meta {
  operation: "AdvancedTitleSearch";
  requestId: string;
  serviceTimeMs: number;
}

export interface Query {
  "@meta": Meta;
  "@type": "imdb.api.search.advanced.response";
  paginationKey: string;
  results: Movie[];
  totalMatches: number;
}

type RankType = "topTv";

interface Rank {
  id: string;
  label: string;
  rank: number;
  rankType: RankType;
}

interface PlotOutline {
  id: string;
  text: string;
}

interface PlotSummary {
  author: string;
  id: string;
  text: string;
}

export interface MovieDetails {
  id: string;
  title: {
    id: string;
    image: Image;
    runningTimeInMinutes: number;
    nextEpisode: string;
    numberOfEpisodes: number;
    seriesEndYear: number;
    seriesStartYear: number;
    title: string;
    titleType: TitleType;
    year: number;
  };
  // certificates: { US: [{ certificate: "TV-MA"; country: "US" }] };
  ratings: {
    canRate: boolean;
    rating: number;
    ratingCount: number;
    otherRanks: Rank[];
  };
  genres: string[];
  releaseDate: string;
  plotOutline: PlotOutline;
  plotSummary?: PlotSummary;
}
