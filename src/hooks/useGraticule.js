import { useEffect, useState, useContext } from "react";
import { Context } from "../reducers/graticule";
import { Graticule } from "ol";
import { generateUUID } from "../services/utils";
import Stroke from "ol/style/Stroke";

const useGraticule = () => {
  const { stateGraticule } = useContext(Context);

  const [graticule] = useState(
    new Graticule({
      id: generateUUID(),
      visible: false,
      zIndex: 1,
      strokeStyle: new Stroke({}),
      showLabels: true,
      wrapX: false
    })
  );

  useEffect(() => {
    if (graticule && stateGraticule) {
      graticule.setProperties({ ...stateGraticule });
    }
  }, [graticule, stateGraticule]);

  return [graticule];
};

export default useGraticule;
