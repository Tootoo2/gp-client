import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signout } from "../../actions";
import PersonIcon from "@material-ui/icons/Person";
import { Menu, MenuItem } from "@material-ui/core";
import GPlogo from "../../assets/gp.png";

const useStyles = makeStyles((theme) => ({
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  centerHeadline: {
    textAlign: "center",
  },
  logo: {
    height: "64px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const MyAppBar = ({ toggleDrawer }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Home");
    } else {
      const formattedTitle = location.pathname.replace(/[^\w\s]/gi, "");
      const capitalizedTitle =
        formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
      setTitle(capitalizedTitle);
    }
  }, [location]);

  const handleClose = () => {
    setMenuAnchor(null);
  };

  const handleClick = (e) => {
    setMenuAnchor(e.currentTarget);
  };

  const handleSignOut = () => {
    dispatch(signout());
    handleClose();
  };

  return (
    <div>
      <AppBar className={classes.centerHeadline} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <img src={GPlogo} alt="logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button
            aria-controls="profile-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={handleClick}
          >
            <PersonIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Menu
        id="profile-menu"
        anchorEl={menuAnchor}
        keepMounted
        open={!!menuAnchor}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MyAppBar;
