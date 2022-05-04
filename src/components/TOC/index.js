import React, { useContext } from "react";
import { Context } from "../../reducers/layers";
import Layer from "./Layer";
import "./style.css";
import Header from "./Header";

const TOC = () => {
  const { stateLayers } = useContext(Context);

  const layersToShowed = stateLayers.layers.filter(
    layer => layer.state !== "REMOVE"
  );

  return (
    <div id="TOC">
      <Header />
      {layersToShowed.map(layer => (
        <Layer key={layer.id} layer={layer} />
      ))}
    </div>
  );
};

export default TOC;
