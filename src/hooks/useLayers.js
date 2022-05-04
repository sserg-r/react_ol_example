import { useEffect, useState, useContext } from "react";
import { Context } from "../reducers/layers";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import XYZ from "ol/source/XYZ";

const useLayers = () => {
  const { stateLayers } = useContext(Context);
  const [layers, setLayers] = useState([]);

  const toWMS = layer => {
    return new TileWMS({
      url: layer.url,
      params: layer.params,
      serverType: layer.serverType,
      transition: layer.transition
    });
  };

  const toXYZ = layer => {
    return new XYZ({
      url: layer.url,
      transition: 0.1
    });
  };

  const toTileLayer = ({ layer, source }) => {
    return new TileLayer({
      id: layer.id,
      state: layer.state,
      opacity: layer.opacity,
      visible: layer.visible,
      source: source(layer)
    });
  };

  useEffect(() => {
    const newLayers = stateLayers.layers
      .filter(layer => layer.state !== "ADDED")
      .map(layer => {
        switch (layer.type) {
          case "WMS":
            const tile = toTileLayer({ layer: layer, source: toWMS });
            return tile;
          case "XYZ":
            return toTileLayer({ layer: layer, source: toXYZ });
          default:
            return undefined;
        }
      });
    if (newLayers.length > 0) {
      setLayers(newLayers);
    }
  }, [stateLayers, setLayers]);

  return [layers];
};

export default useLayers;
