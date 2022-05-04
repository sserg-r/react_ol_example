import React, { useContext } from "react";
import { Context, REMOVE_LAYER, SET_LAYER } from "../../../reducers/layers";
import { MdDelete } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./style.css";
import Infos from "./Infos";

const Layer = ({ layer }) => {
  const { dispatchLayers } = useContext(Context);

  const _showHideLayer = () =>
    dispatchLayers({
      type: SET_LAYER,
      layer: {
        ...layer,
        visible: layer.visible === undefined ? false : !layer.visible
      }
    });

  return (
    <div id="Layer">
      <p>{layer.title}</p>
      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="1"
        step="0.1"
        defaultValue={layer.opacity || 1}
        onChange={e => {
          dispatchLayers({
            type: SET_LAYER,
            layer: { ...layer, opacity: Number.parseFloat(e.target.value, 10) }
          });
        }}
      />
      <MdDelete
        onClick={() =>
          dispatchLayers({ type: REMOVE_LAYER, layer: { id: layer.id } })
        }
      />
      {!layer.visible ? (
        <IoMdEyeOff onClick={_showHideLayer} />
      ) : (
        <IoMdEye onClick={_showHideLayer} />
      )}
      <Infos legend={layer.legend} />
    </div>
  );
};

export default Layer;
