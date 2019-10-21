import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { purple } from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';

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

        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    toggleDrawer(){
        this.state = {leftDrawer: !this.state.leftDrawer}
        console.log(this.state.leftDrawer);
        this.setState(this.state);  
    }

    
    handleClose(){
        this.setState({open: false})
    }

    render(){
        return(
            <div className="NavBar">
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer} edge="start" aria-label="menu" color="inherit">
                        <MenuIcon />
                        <Drawer open={this.state.leftDrawer} onClose={this.handleClose}>
                        <MenuItem linkbutton={'true'} href="https://google.com">Menu Item 1</MenuItem>
                        </Drawer>
                    </IconButton>
                    <Typography variant="h6"  color="inherit">
                        Map
                    </Typography>
                </Toolbar>
            </AppBar>
            </div>
        );

    }

}