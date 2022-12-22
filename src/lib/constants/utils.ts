export const getUrl = (path: string) => `https://imdb8.p.rapidapi.com${path}`;

export const idToPageLink = (id: string) => id.replace("title", "imdb");

export const idToAPI = (id: string) => getUrl(`/title/${id}/`);

export const getMovieDetailsUrl = (id: string) =>
  getUrl(`/title/get-overview-details?tconst=${id}&currentCountry=US`);
