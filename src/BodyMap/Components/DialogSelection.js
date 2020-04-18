import React from "react"
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    makeStyles,
} from "@material-ui/core"
import LocalHospital from "@material-ui/icons/LocalHospital"
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    red: {
      backgroundColor: red[500]
    },
}));

const DialogSelection = ({
    open,
    handleClose,
    items
}) => {
    const classes = useStyles();

    return (
        <Dialog open={open} fullWidth onClose={handleClose}>
            <DialogTitle>Douleurs renseignées</DialogTitle>

            <DialogContent dividers>
                
                <List>
                    {items.length ? items.map((douleur, index) => 
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar className={classes.red}>
                                    <LocalHospital />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={douleur.name} secondary={`${douleur.val}/10`} />
                        </ListItem>
                    ) : "Aucune"}
                </List>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogSelection