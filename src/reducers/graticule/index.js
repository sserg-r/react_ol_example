import React from "react";

const HIDE = "graticule/HIDE";
const TOGGLE = "graticule/TOGGLE";
const SHOW = "graticule/SHOW";

const initialState = {
  visible: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case HIDE:
      return { visible: false };
    case SHOW:
      return { visible: true };
    case TOGGLE:
      return { visible: !state.visible };
    default:
      throw new Error();
  }
};

const Context = React.createContext(initialState);

export { initialState, reducer, Context, HIDE, SHOW, TOGGLE };
