import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { purple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));


export class NavBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            leftDrawer: false,
        }
    }


    render(){
        return(
            <div className="NavBar">
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" color="inherit">
                    <MenuIcon />
                    </IconButton>
                    <Typography className={useStyles.title} variant="h6"  color="inherit">
                        Map
                    </Typography>
                </Toolbar>
            </AppBar>
            </div>
        );

    }

}