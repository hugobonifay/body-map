import React, { useState } from "react"
import style from "./index.module.css"
import {
    Fab,
    makeStyles
} from "@material-ui/core"
import Create from "@material-ui/icons/Create"
import LocalHospital from "@material-ui/icons/LocalHospital"
import DialogSelection from "./Components/DialogSelection"
import DialogSlider from "./Components/DialogSlider"
import LinearGradient from "./Components/LinearGradient"
import BodyAnt from "./Components/BodyAnt"
import BodyPost from "./Components/BodyPost"
import Header from "./Components/Header"

const useStyles = makeStyles(theme => ({
    fabEdit: {
        position: 'fixed',
        zIndex:1000,
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fabDouleur: {
        position: 'fixed',
        zIndex:1000,
        bottom: theme.spacing(2),
        right: theme.spacing(11),
    }
}));

const BodyMap = () => {
    const classes = useStyles()
    const [state, setState] = useState([])
    const [value, setValue] = useState(5)
    const [name, setName] = useState("")
    const [mode, setMode] = useState("selection")

    const handleClickBody = newValue => {
        if (mode === "selection" && !state.some(item => item.name === newValue)) {
            setValue(5)
            setName(newValue)
        }
    }
    
    const handleChangeSlider = (e, newValue) => {
        setValue(newValue)
        setState(state => state.map((item, index) => {
            if (item.name === name) {
                return {
                    ...item,
                    val: newValue
                }
            } else {
                return item
            }
        }))
    }

    const handleClickSaisir = () => {
        setMode("saisie")
        //if (state.some(item => item.name === name)) {
            //return setState(state => state.filter(d => d.name !== name))
        //} else {
            return setState([...state, { name: name, val: 5 } ])
        //}
    }

    const handleCancel = () => {
        setMode("selection")
        setName("")
        setState(state => state.filter(d => d.name !== name))
    }

    const handleSubmit = () => {
        setMode("selection")
        setName("")
        setValue(5)
    }

    console.log(state)

    return (
        <div className={style.root}>
           <Header douleur={name} />
           <LinearGradient />
            <div className={style.container}>
                <BodyAnt
                    selected={name}
                    selectionItems={state}
                    handleClickBody={membre => handleClickBody(membre)}
                    tooltip={true}
                />
                <BodyPost 
                    selected={name}
                    selectionItems={state}
                    handleClickBody={membre => handleClickBody(membre)}
                    tooltip={true}
                />
            </div>

            <div>
                <Fab 
                    className={classes.fabEdit} 
                    onClick={handleClickSaisir} 
                    disabled={name === "" || mode === "saisie"}
                >
                    <Create />
                </Fab>

                <Fab 
                    className={classes.fabDouleur} 
                    onClick={() => setMode("check")} 
                    disabled={state.length === 0 || mode === "saisie"}
                >
                    <LocalHospital />
                </Fab>
            </div>

            <div>
                <DialogSelection open={mode === "check"} items={state} handleClose={() => setMode("selection")} />

                <DialogSlider 
                    open={mode === "saisie"}
                    handleClose={handleCancel}
                    douleur={name}
                    intensity={value} // donc ici on passe le state value dans la props intensity
                    handleChange={handleChangeSlider}
                    handleCancel={handleCancel}
                    handleSubmit={handleSubmit}
                />
            </div>

            <div style={{
                fontSize:"0.8rem", 
                color: "rgba(0,0,0,0.4)",
                textAlign:"center",
                width:"100%",
                height:"70px"
            }}>
                Copyright © 2020 Amine Chaigneau, Theo Bonifay, Hugo Bonifay
            </div>
        </div>
    )
}

export default BodyMap