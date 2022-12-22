import { Box } from "@chakra-ui/react";

import type { CityMapData } from "lib/types/general";

const WeatherMarker = ({ title, temp }: CityMapData) => {
  return (
    <Box>
      <span className="city-bullet" />
      <Box className="city-data">
        <Box className="row city-main-info">
          <span className="city-weather">{temp} </span>
          <span className="city-name weather-very-cold">{title}</span>
        </Box>
      </Box>
    </Box>
  );
};
export default WeatherMarker;
