import { useCallback, useMemo, useState } from "react"
import { getBodyPart } from "./bodyParts"
import style from "./BodyMap.module.css"

// eslint-disable-next-line
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

// eslint-disable-next-line
const BodyPart = ({ id, d, fill, onClick, onMouseEnter, onMouseLeave }) => {
    const handleClick = () => {
        onClick(id)
    }

    const handleMouseEnter = () => {
        onMouseEnter(id)
    }

    const handleMouseLeave = () => {
        onMouseLeave(id)
    }

    return (
        <path
            d={d}
            id={id}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={Object.assign({}, {
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer"
            }, { fill })}
        />
    )
}

export const BodyMap = () => {
    const [lang, setLang] = useState("en")
    const [clicked, setClicked] = useState(null)
    const [hovered, setHovered] = useState(null)

    const antBodyParts = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "ant")
    }, [lang]) 

    const postBodyPart = useMemo(() => {
        return getBodyPart(lang).filter(({ face }) => face === "post")
    }, [lang]) 

    const clickedName = useMemo(() => {
        if (!clicked) return ""
        return getBodyPart(lang).find(d => clicked === d.id)?.name || ""
    }, [lang, clicked])

    const getFill = useCallback((bodyPartId) => {
        if (clicked === bodyPartId) return "rgb(255, 59, 48)"
        if (hovered === bodyPartId) return "rgb(85, 85, 87)"
        return "rgb(75, 75, 77)"
    }, [clicked, hovered])

    const handleChangeLang = (e) => {
        setLang(e.target.value)
    }

    const handleClick = (id) => {
        setClicked(id)
    }

    const handleMouseEnter = (id) => {
        if ("ontouchstart" in window) return
        setHovered(id)
    }

    const handleMouseLeave = () => {
        if ("ontouchstart" in window) return
        setHovered(null)
    }

    return (
        <>
            <div className={style.header}>
                <p>{clickedName || txt[lang][0]}</p>
                <select value={lang} onChange={handleChangeLang} className={style.select}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div className={style.bodies}>
                <div>
                    <p>{txt[lang][1]}</p>
                    <BodyContainer>
                        {antBodyParts.map((bodyPart, index) => 
                            <BodyPart
                                key={index}
                                id={bodyPart.id}
                                d={bodyPart.d}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick} 
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        )}
                    </BodyContainer>
                </div>
                <div>
                    <p>{txt[lang][2]}</p>
                    <BodyContainer>
                        {postBodyPart.map((bodyPart, index) => 
                            <BodyPart
                                key={index}
                                id={bodyPart.id}
                                d={bodyPart.d}
                                fill={getFill(bodyPart.id)}
                                onClick={handleClick} 
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        )}
                    </BodyContainer>
                </div>
            </div>
        </>
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