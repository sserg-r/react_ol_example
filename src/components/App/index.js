import React, { useReducer } from "react";
import "./style.css";
import Map from "../Map";
import {
  reducer as GraticuleReducer,
  initialState as GraticuleInitialState,
  Context as GraticuleContext
} from "../../reducers/graticule";

import {
  reducer as LayersReducer,
  initialState as LayersInitialState,
  Context as LayersContext
} from "../../reducers/layers";

import {
  reducer as ViewReducer,
  initialState as ViewInitialState,
  Context as ViewContext
} from "../../reducers/view";

import {
  reducer as ControlsReducer,
  initialState as ControlsInitialState,
  Context as ControlsContext
} from "../../reducers/controls";

import TOC from "../TOC";

export default function App() {
  const [stateGraticule, dispatchGraticule] = useReducer(
    GraticuleReducer,
    GraticuleInitialState
  );
  const [stateLayers, dispatchLayers] = useReducer(
    LayersReducer,
    LayersInitialState
  );

  const [stateView, dispatchView] = useReducer(ViewReducer, ViewInitialState);

  const [stateControls, dispatchControls] = useReducer(
    ControlsReducer,
    ControlsInitialState
  );

  return (
    <div className="App">
      <ControlsContext.Provider value={{ stateControls, dispatchControls }}>
        <LayersContext.Provider value={{ stateLayers, dispatchLayers }}>
          <ViewContext.Provider value={{ stateView, dispatchView }}>
            <GraticuleContext.Provider
              value={{ stateGraticule, dispatchGraticule }}
            >
              <Map />
              <TOC />
            </GraticuleContext.Provider>
          </ViewContext.Provider>
        </LayersContext.Provider>
      </ControlsContext.Provider>
    </div>
  );
}
