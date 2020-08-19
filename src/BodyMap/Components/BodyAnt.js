import React from "react"
import style from "../index.module.css"
import { bodyAnt } from "./bodySVG"
import { Tooltip } from "@material-ui/core"

const BodyAnt = ({
    selected,
    selectionItems,
    handleClickBody,
    tooltip
}) => {

    return (
        <div className={style.human_try}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97">

                <g id="Calque_2" data-name="Calque 2">
                    <g id="body_face">
                        {bodyAnt.map((membre, index) => 
                            <Tooltip
                                key={`${membre}__${index}`}
                                title={tooltip ? membre.name : ""}
                            >
                                <path
                                    className={
                                        (selectionItems.some(item => item.name === membre.name) || selected === membre.name) 
                                            ? style.partSelected
                                            : style.part
                                    }
                                    onClick={() => handleClickBody(membre.name)} 
                                    id={membre.id}
                                    d={membre.d}
                                    //fill={"#b3b3b3"}
                                />
                            </Tooltip>
                        )}
                    </g>
                </g>

            </svg>
        </div> 
    )
}

export default BodyAnt