import React from "react"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    withStyles,
    Slider,
} from "@material-ui/core"

const StyledSlider = withStyles({
    root: {
      // color: ,
      height: 10,
    },
    thumb: {
      height: 25,
      width: 25,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 10,
      borderRadius: 5,
    },
    rail: {
      height: 10,
      borderRadius: 5,
      boxShadow: "0px 0px 5px 0px rgba(138, 138, 138, 0.8)",
    },
  })(Slider);

const DialogSlider = ({
    open,
    handleClose,
    douleur,
    intensity,
    handleChange,
    handleCancel,
    handleSubmit
}) => {

    // Lifting up state (faire remonter l'état) 
    // https://fr.reactjs.org/docs/lifting-state-up.html
    // intensity etait à la base le state de ce composant
    // Mais c'est maintenant son parent qui contient le state
    // intensity devient donc une props

    return (
        <Dialog open={open} fullWidth onClose={handleClose}>
            <DialogTitle>{douleur} - Intensité de la douleur</DialogTitle>

            <DialogContent dividers>
              <div>
                <div>
                  <StyledSlider 
                    name={douleur}
                    min={0}
                    step={0.01}
                    max={10}
                    value={intensity}
                    onChange={handleChange}
                  />
                </div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <div>Très faible</div>
                  <div>Très intense</div>
                </div>
              </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Annuler</Button>
                <Button onClick={handleSubmit}>Confirmer</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSlider