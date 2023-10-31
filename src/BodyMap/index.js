import React, { useCallback, useMemo, useState } from "react"
import { getBodyPart } from "./bodyParts"
import style from "./index.module.css"

const BodyContainer = ({ children }) => (
    <div style={{
        width: "207px",
        height: "500px",
        margin: "30px auto"
    }}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 375.42 832.97"
        >
            <g>
                {children}
            </g>
        </svg>
    </div>
)

const BodyPart = ({ bodyPart, fill, onClick }) => {
    const handleClick = () => {
        onClick({ id: bodyPart.id, name: bodyPart.name })
    }

    return (
        <path
            d={bodyPart.d}
            id={bodyPart.id}
            onClick={handleClick}
            style={Object.assign({}, {
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer"
            }, { fill })}
        />
    )
}

const txt = {
    fr: {
        0: "Cliquez sur une partie du corps",
        1: "Face antérieure",
        2: "Face postérieure",
    },
    en: {
        0: "Click on the body!",
        1: "Anterior side",
        2: "Posterior side"
    }
}

const BodyMap = () => {
    const [lang, setLang] = useState("en")
    const [selected, setSelected] = useState({})

    const antBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "ant")
    }, [lang]) 

    const postBodyPart = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "post")
    }, [lang]) 

    const selectedName = useMemo(() => {
        return getBodyPart(lang).find(d => selected.id === d.id)?.name || ""
    }, [lang, selected.id])

    const getFill = useCallback((bodyPartId) => {
        if (selected.id === bodyPartId) return "rgb(255, 59, 48)"
        return "rgb(96, 96, 96)"
    }, [selected.id])

    const handleClick = (newValue) => {
        setSelected(newValue)
    }

    const handleChangeLang = (e) => {
        setLang(e.target.value)
    }

    return (
        <>
            <div className={style.header}>
                <p>{selectedName || txt[lang][0]}</p>
                <select value={lang} onChange={handleChangeLang}>
                    <option value="fr">FR</option>
                    <option value="en">EN</option>
                </select>
            </div>
            <div className={style.bodies}>
                <div>
                    <p style={{ textAlign: "center" }}>{txt[lang][1]}</p>
                    <BodyContainer>
                        {antBodyParts.map((bodyPart, index) => 
                            <BodyPart
                                key={index}
                                bodyPart={bodyPart}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick} 
                            />
                        )}
                    </BodyContainer>
                </div>
                <div>
                    <p style={{ textAlign: "center" }}>{txt[lang][2]}</p>
                    <BodyContainer>
                        {postBodyPart.map((bodyPart, index) => 
                            <BodyPart
                                key={index}
                                bodyPart={bodyPart}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick} 
                            />
                        )}
                    </BodyContainer>
                </div>
            </div>
        </>
    )
}

export default BodyMap