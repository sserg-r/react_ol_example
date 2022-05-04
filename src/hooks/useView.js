import { useState, useEffect, useContext } from "react";
import View from "ol/View";
import { Context } from "../reducers/view";

const useView = () => {
  const { stateView } = useContext(Context);
  const [view, setView] = useState();

  useEffect(() => {
    setView(
      new View({
        ...stateView
      })
    );
  }, [stateView]);

  useEffect(() => {
    if (view && stateView) {
      view.setProperties({ ...stateView });
    }
  }, [view, stateView]);

  return [view];
};

export default useView;
