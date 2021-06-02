import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import ReactMapGL, { NavigationControl, FlyToInterpolator } from "react-map-gl";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import { accessToken, mapboxPrefix } from "../../config/mapbox";

mapboxgl.workerClass = MapboxWorker;

const Mapbox = ({
  zoom,
  center,
  bearing = 0,
  pitch = 0,
  mapStyle,
  toggleLayer,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: center[1],
    longitude: center[0],
    zoom: zoom,
    bearing: bearing,
    pitch: pitch,
    position: "sticky",
    top: 0,
  });
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setViewport((viewport) => ({
        ...viewport,
        transitionDuration: 500,
        transitionInterpolator: new FlyToInterpolator(),
        zoom: zoom,
        bearing: bearing,
        pitch: pitch,
        latitude: center[1],
        longitude: center[0],
      }));

      if (
        typeof toggleLayer !== "undefined" &&
        toggleLayer.layer &&
        toggleLayer.layer !== ""
      ) {
        const { layer, visibility } = toggleLayer;
        map.setLayoutProperty(layer, "visibility", visibility);
      }
    }
  }, [toggleLayer, zoom, bearing, pitch, center, map]);

  useLayoutEffect(() => {
    function resizeMap() {
      map && map.resize();
      console.log(mapContainer);
    }
    window.addEventListener("resize", resizeMap);
    resizeMap();
    return () => window.removeEventListener("resize", resizeMap);
  }, []);

  const registerMap = () => {
    if (mapContainer.current) {
      const map = mapContainer.current.getMap();
      console.log(map);
      setMap(map);
      map.resize();
      map._trackResize = true;
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      ref={(el) => (mapContainer.current = el)}
      onLoad={() => registerMap()}
      onViewportChange={(nextViewport) =>
        setViewport({ ...nextViewport, width: "fit", height: "fit" })
      }
      mapboxApiAccessToken={accessToken}
      mapStyle={mapboxPrefix + mapStyle}
      reuseMaps={true}
      dragRotate={true}
      scrollZoom={false}
      dragPan={false}
      trackResize={true}
      style={{
        position: "sticky",
        top: "0",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      <NavigationControl
        style={{
          right: 15,
          bottom: 30,
        }}
      />
    </ReactMapGL>
  );
};

export default Mapbox;
