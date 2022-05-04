import React from "react";

const ZOOM_IN = "view/ZOOM_IN";
const ZOOM_OUT = "view/ZOOM_OUT";
const SET_CENTER = "view/SET_CENTER";

const initialState = {
  center: [0, 0],
  zoom: 2
};

const reducer = (state, action) => {
  switch (action.type) {
    case ZOOM_IN:
      return { ...state, zoom: state.zoom + 1 };
    case ZOOM_OUT:
      return { ...state, zoom: state.zoom - 1 };
    case SET_CENTER:
      return { ...state, center: state.center };
    default:
      throw new Error();
  }
};

const Context = React.createContext();

export { initialState, reducer, ZOOM_IN, ZOOM_OUT, Context };
