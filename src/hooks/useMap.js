import { useState, useEffect, useContext } from "react";
import Map from "ol/Map";
import { useGraticule, useLayers, useView, useControls } from "./index";
import { Context as ContextLayers, ADDED_LAYERS } from "../reducers/layers";
import { defaults as defaultControls } from "ol/control";

const useMap = () => {
  const [map, setMap] = useState();
  const { dispatchLayers } = useContext(ContextLayers);
  const [graticule] = useGraticule();
  const [layers] = useLayers();
  const [controls] = useControls();
  const [view] = useView();

  useEffect(() => {
    setMap(
      new Map({
        target: "Map",
        layers: [],
        controls: defaultControls().extend([])
      })
    );
  }, []);

  // Modification de la vue
  useEffect(() => {
    if (map) {
      map.setView(view);
    }
  }, [map, view]);

  // Ajout de controls
  useEffect(() => {
    if (map) {
      controls.map(control => map.addControl(control));
    }
  }, [map, controls]);

  // Suppression de layers
  useEffect(() => {
    if (map && layers) {
      map
        .getLayers()
        .getArray()
        .filter(layer =>
          layers.find(
            l => l.get("id") === layer.get("id") && l.get("state") === "REMOVE"
          )
        )
        .map(l => map.removeLayer(l));
    }
  }, [map, layers]);

  // Ajout de Layer
  useEffect(() => {
    if (map && layers) {
      const layersToAdded = layers.filter(l => l.get("state") === "ADD");
      layersToAdded.map(l => map.addLayer(l));
      if (layersToAdded.length > 0) {
        dispatchLayers({
          type: ADDED_LAYERS,
          layers: [...layersToAdded.map(l => l.get("id"))]
        });
      }
    }
  }, [map, layers, dispatchLayers]);

  // Modification de layers
  useEffect(() => {
    if (map && layers) {
      const layersToSetted = layers.filter(
        layer => layer.get("state") === "SET"
      );
      layersToSetted.map(layer =>
        map
          .getLayers()
          .getArray()
          .find(l => l.get("id") === layer.get("id"))
          .setProperties({ ...layer.getProperties() })
      );
      if (layersToSetted.length > 0) {
        dispatchLayers({
          type: ADDED_LAYERS,
          layers: [...layersToSetted.map(l => l.get("id"))]
        });
      }
    }
  }, [map, layers, dispatchLayers]);

  // Ajout ou modification du Graticule
  useEffect(() => {
    if (map) {
      map.addLayer(graticule);
    }
  }, [map, graticule]);

  return [map];
};

export default useMap;
