import { useState, useEffect, useContext } from "react";
import { Context } from "../reducers/controls";
import ScaleLine from "ol/control/ScaleLine";

const useControls = () => {
  const [controls, setControls] = useState([]);
  const { stateControls } = useContext(Context);

  const createScaleLine = control =>
    new ScaleLine({
      className: control.className,
      target: document.getElementById(control.id),
      units: "metric",
      type: "scaleline"
    });

  useEffect(() => {
    setControls(
      stateControls.controls.map(control => {
        switch (control.name) {
          case "ScaleLine":
            return createScaleLine(control);
          default:
            return undefined;
        }
      })
    );
  }, [stateControls]);

  return [controls];
};

export default useControls;
