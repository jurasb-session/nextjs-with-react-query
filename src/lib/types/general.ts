export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type Stations = "stations";

export interface MainTemperature {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface SystemClock {
  type: number;
  id: number;
  country: string;
  sunrise: EpochTimeStamp;
  sunset: EpochTimeStamp;
}

export interface CityWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: Stations;
  main: MainTemperature;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  dt: number;
  sys: SystemClock;
  timezone: number;
  id: number;
  name: string;
  cod: number | string;
}

export type CityMapData = {
  lat: number;
  lon: number;
  title: string;
  temp: number;
  tempUnit: string;
};
