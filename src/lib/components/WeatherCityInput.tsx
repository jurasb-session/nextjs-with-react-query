import { Search2Icon } from "@chakra-ui/icons";
import type { InputProps } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useState } from "react";

import type { CityWeather } from "lib/types/general";

const API_DATA = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_ID}&q={cityName}`;

export interface WeatherCityInputProps extends InputProps {
  setWeatherCity: (data: CityWeather | undefined) => void;
}

const WeatherCityInput = ({ setWeatherCity }: WeatherCityInputProps) => {
  const [inp, setInp] = useState("Kaunas");
  const [isInvalid, setIsInvalid] = useState(false);

  const getWeather = async (search: string) =>
    fetch(API_DATA.replace("{cityName}", search)).then((res) => res.json());

  const debauncedSet = debounce((val) => {
    setInp(val.target.value);
  }, 500);

  useQuery({
    queryKey: ["cityweather", inp],
    queryFn: () => getWeather(inp),
    enabled: !!inp,
    onSettled: (data?: CityWeather, error?) => {
      if (error || data?.cod === "404") {
        setIsInvalid(true);
        return;
      }

      setWeatherCity(data);
    },
  });

  return (
    <FormControl isInvalid={isInvalid} pb={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Enter city name"
          isInvalid={isInvalid}
          errorBorderColor="red.500"
          onInput={debauncedSet}
        />
      </InputGroup>
      {isInvalid && <FormErrorMessage>City not found</FormErrorMessage>}
    </FormControl>
  );
};

export default WeatherCityInput;
