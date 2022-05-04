import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import "./style.css";

const Infos = ({ legend }) => {
  const [show, setShow] = useState(undefined);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    let timer;
    show
      ? setShowContent(true)
      : (timer = setTimeout(() => setShowContent(false), 1000));
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      <IoIosArrowBack
        className={show ? "icon-start" : show !== undefined ? "icon-end" : ""}
        onClick={() => setShow(!show)}
      />
      <div
        id="Infos"
        className={
          show ? "slide-in" : show !== undefined ? "slide-out" : "hide"
        }
      >
        {showContent && legend && legend.show && legend.url ? (
          <>
            <p>Légende : </p>
            <img
              src={legend.url}
              alt="Légende"
              className={
                show ? "fade-in" : show !== undefined ? "fade-out" : "hide"
              }
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Infos;
