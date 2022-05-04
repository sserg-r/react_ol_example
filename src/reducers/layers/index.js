import { createContext } from "react";
import { generateUUID } from "../../services/utils";

const ADD_LAYER = "layer/ADD_LAYER";
const REMOVE_LAYER = "layer/REMOVE_LAYER";
const SET_LAYER = "layer/SET_LAYER";
const ADDED_LAYERS = "layer/ADDED_LAYERS";

const initialState = {
  layers: [
    {
      id: generateUUID(),
      title: "Background",
      type: "XYZ",
      url: "https://{a-c}.tile.openstreetmap.de/{z}/{x}/{y}.png",
      visible: true,
      state: "ADD"
    },
    {
      id: generateUUID(),
      title: "States",
      type: "WMS",
      extent: [-13884991, 2870341, -7455066, 6338219],
      url: "https://ahocevar.com/geoserver/wms",
      params: { LAYERS: "topp:states", TILED: true },
      serverType: "geoserver",
      transition: 0,
      visible: true,
      state: "ADD",
      legend: {
        show: true,
        url:
          "https://ahocevar.com/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=topp%3Astates"
      }
    },
    {
      id: generateUUID(),
      title: "Emissions_GES_OREGES",
      type: "WMS",
      url: "https://geobretagne.fr/geoserver/bretagneenvironnement/wms",
      params: {
        LAYERS: "Emissions_GES_OREGES",
        TILED: true
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
      transition: 5,
      visible: true,
      state: "ADD",
      legend: {
        show: true,
        url:
          "https://geobretagne.fr/geoserver/bretagneenvironnement/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&LAYER=Emissions_GES_OREGES"
      }
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_LAYER:
      return {
        ...state,
        layers: [
          ...state.layers,
          { ...action.layer, id: generateUUID(), state: "ADD" }
        ]
      };
    case REMOVE_LAYER:
      const layerToRemoved = state.layers.find((l) => l.id === action.layer.id);
      return {
        ...state,
        layers: state.layers.map((layer) =>
          layer.id === layerToRemoved.id
            ? { ...layerToRemoved, state: "REMOVE" }
            : layer
        )
      };
    case SET_LAYER:
      const index = state.layers.findIndex((l) => l.id === action.layer.id);
      const layerSetted = {
        ...state.layers[index],
        ...action.layer,
        state: "SET"
      };
      return {
        ...state,
        layers: state.layers.map((layer, i) =>
          i === index ? layerSetted : layer
        )
      };
    case ADDED_LAYERS:
      return {
        ...state,
        layers: state.layers.map((layer, i) =>
          action.layers.includes(layer.id)
            ? { ...layer, state: "ADDED" }
            : layer
        )
      };
    default:
      throw new Error();
  }
};

const Context = createContext();

export {
  initialState,
  reducer,
  ADD_LAYER,
  REMOVE_LAYER,
  SET_LAYER,
  ADDED_LAYERS,
  Context
};
