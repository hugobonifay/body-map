import { useCallback, useMemo, useState } from "react";
import { getBodyParts } from "./bodyParts";
import style from "./BodyMap.module.css";
import { txt } from "./translations";

const BodyContainer = ({ children }) => (
  <div className={style.bodyContainer}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97">
      <g>{children}</g>
    </svg>
  </div>
);

const BodyPart = ({ part, fill, onClick, onMouseEnter, onMouseLeave }) => {
  const handleClick = () => {
    onClick(part.id);
  };

  const handleMouseEnter = () => {
    onMouseEnter(part.id);
  };

  const handleMouseLeave = () => {
    onMouseLeave(part.id);
  };

  return (
    <path
      id={part.id}
      d={part.d}
      fill={fill}
      className={style.bodyPart}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <title>{part.name}</title>
    </path>
  );
};

export const BodyMap = () => {
  const [lang, setLang] = useState("en");
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [hoveredPartId, setHoveredPartId] = useState(null);

  const data = useMemo(() => getBodyParts(lang), [lang]);

  const selectedPartName = useMemo(() => {
    if (selectedPartId === null) return null;
    return data.find((part) => part.id === selectedPartId).name;
  }, [data, selectedPartId]);

  const parts = useMemo(() => {
    const antParts = data.filter((part) => part.face === "ant");
    const postParts = data.filter((part) => part.face === "post");
    return [
      { name: txt[lang][1], parts: antParts },
      { name: txt[lang][2], parts: postParts },
    ];
  }, [data, lang]);

  const handleChangeLang = (e) => {
    setLang(e.target.value);
  };

  const handleClick = (id) => {
    setSelectedPartId(id);
  };

  const handleMouseEnter = (id) => {
    if ("ontouchstart" in window) return;
    setHoveredPartId(id);
  };

  const handleMouseLeave = () => {
    if ("ontouchstart" in window) return;
    setHoveredPartId(null);
  };

  const getPartColor = useCallback(
    (id) => {
      if (selectedPartId === id) return "rgb(255, 59, 48)";
      if (hoveredPartId === id) return "rgb(85, 85, 87)";
      return "rgb(75, 75, 77)";
    },
    [selectedPartId, hoveredPartId]
  );

  return (
    <>
      <div className={style.header}>
        <p>{selectedPartName || txt[lang][0]}</p>

        <select
          value={lang}
          onChange={handleChangeLang}
          className={style.select}
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="es">Español</option>
          <option value="it">Italiano</option>
          <option value="nl">Nederlands</option>
        </select>
      </div>

      <div className={style.bodies}>
        {parts.map((side) => (
          <div key={side.name}>
            <p>{side.name}</p>

            <BodyContainer>
              {side.parts.map((part) => (
                <BodyPart
                  key={part.id}
                  part={part}
                  fill={getPartColor(part.id)}
                  onClick={handleClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </BodyContainer>
          </div>
        ))}
      </div>
    </>
  );
};
