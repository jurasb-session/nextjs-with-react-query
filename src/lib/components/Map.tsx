import { Box } from "@chakra-ui/react";
import type { Map, Marker } from "leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import * as ReactDOMServer from "react-dom/server";
import "leaflet/dist/leaflet.css";

import type { CityMapData } from "lib/types/general";

import WeatherMarker from "./WeatherMarker";

interface MapLayoutProps {
  weatherCity?: CityMapData;
}

const MapLayout = ({ weatherCity }: MapLayoutProps) => {
  const currentMap = useRef<Map>();
  const mapMarkers = useRef<Marker>();

  useEffect(() => {
    if (currentMap.current) {
      currentMap.current?.remove();
    }

    const map = L.map("map", {
      center: [0, 0],
      zoom: 11,
    });

    if (map) {
      currentMap.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(currentMap.current);
    }
  });

  useEffect(() => {
    if (currentMap.current && weatherCity) {
      if (mapMarkers?.current) {
        mapMarkers.current.removeFrom(currentMap.current);
      }

      const latlng = L.latLng(weatherCity.lat, weatherCity.lon);

      const divIcon = L.divIcon({
        className: "marker-default",
        html: ReactDOMServer.renderToStaticMarkup(
          <WeatherMarker {...weatherCity} />
        ),
      });

      const marker = L.marker(latlng, {
        icon: divIcon,
      }).addTo(currentMap.current);
      currentMap.current.setView(latlng, 11);
      mapMarkers.current = marker;
    }
  }, [weatherCity, currentMap]);

  return (
    <Box h="500px" w="full">
      <Box id="map" w="full" h="full" />
    </Box>
  );
};

export default MapLayout;
