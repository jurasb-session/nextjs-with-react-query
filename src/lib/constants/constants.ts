import { URLS } from "../types/types";

import { getUrl } from "./utils";

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
  } as HeadersInit,
};
export const API_PATHS = {
  [URLS.FIND_MOVIES]: getUrl("/title/v2/find"),
  [URLS.MOVIE_DETAILS]: getUrl(
    "/title/get-overview-details?tconst={id}&currentCountry={countryCode}"
  ),
};
