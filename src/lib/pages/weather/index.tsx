import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useState } from "react";

import WeatherCityInput from "lib/components/WeatherCityInput";
import type { CityMapData, CityWeather } from "lib/types/general";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

const Weather = () => {
  const [cityWeather, setWeatherCity] = useState<CityMapData | undefined>();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <Tabs width="full">
        <TabList>
          <Tab>City based weather</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex flexDirection="column">
              <WeatherCityInput
                my={4}
                width="full"
                setWeatherCity={(data: CityWeather | undefined) => {
                  if (data) {
                    setWeatherCity({
                      lat: data.coord.lat,
                      lon: data.coord.lon,
                      title: data.name,
                      temp: Math.floor(data.main.temp),
                      tempUnit: "ºC",
                    });
                  }
                }}
              />
              <Map weatherCity={cityWeather} />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Weather;
