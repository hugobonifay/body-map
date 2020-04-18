import React from "react"
import style from "../index.module.css"

const Header = ({ douleur }) => {

    return (
        <div className={style.text}>
            {douleur || "Sélectionnez une partie du corps"}
        </div>
    )
}

export default Header