import { createContext } from "react";

const initialState = {
  controls: [
    {
      name: "ScaleLine",
      id: "ScaleLine",
      className: "scale-line",
      active: true
    }
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error();
  }
};

const Context = createContext();

export { initialState, reducer, Context };
