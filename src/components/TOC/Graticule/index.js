import React, { useContext } from "react";
import { Context, TOGGLE } from "../../../reducers/graticule";
import { MdGridOn, MdGridOff } from "react-icons/md";

const Graticule = () => {
  const { stateGraticule, dispatchGraticule } = useContext(Context);

  return stateGraticule.visible ? (
    <MdGridOn
      className="graticule-button"
      onClick={() => dispatchGraticule({ type: TOGGLE })}
    />
  ) : (
    <MdGridOff
      className="graticule-button"
      onClick={() => dispatchGraticule({ type: TOGGLE })}
    />
  );
};
export default Graticule;
