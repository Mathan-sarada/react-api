import React from "react";
import store from "store";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Divider, Menu, MenuItem } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowRight from "@material-ui/icons/ArrowRight";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { User_api } from "../api/user_api";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Notification_Api } from "../api/notification_api";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  title: {
    flexGrow: 1
  },
  appBar: {
    background: "#3f94b5f2",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function Mainbar({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorElNote, setAnchorElNote] = React.useState(null);
  const openNote = Boolean(anchorElNote);
  const history = useHistory();
  var currentLocation = window.location.pathname;

  const getData = async () => {
    const res = await Notification_Api.Get_Notification();
    if (res.code === 200) {
      setData(res.data.message);
    } else {
      return [];
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuNote = event => {
    setAnchorElNote(event.currentTarget);
  };

  const handleCloseNote = () => {
    setAnchorElNote(null);
  };

  const clickNote = async id => {
    if (id) {
      const res1 = await Notification_Api.Update_Notification(id);
      if (res1.code === 200) {
        getData();
      }
    }
  };

  const logout = async () => {
    history.push(`/`);
    store.remove("secretKey");
    store.remove("apiKey");
    store.remove("adminKey");
    await User_api.SignOut();
  };

  const handleClick = text => {
    history.push(`/${text}`);
  };

  React.useEffect(() => {
    if (currentLocation !== "/" || currentLocation !== "/login") {
      if (!store.get("apiKey")) {
        history.push(`/login`);
      }
    }
  }, []);

  React.useEffect(() => {
    getData();
  }, []);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {["Category", "Vehicle", "Service", "Vendor", "Orders", "Location"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => handleClick(text)}>
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      {currentLocation !== "/login" && (
        <React.Fragment>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap className={classes.title}>
                Vehicle App
              </Typography>
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleMenuNote}
                >
                  <Badge badgeContent={data.length} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNote}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={openNote}
                  onClose={handleCloseNote}
                >
                  {data &&
                    data.length > 0 &&
                    data.map(res => {
                      return (
                        <MenuItem
                          key={res._id}
                          onClick={id => clickNote(res._id)}
                        >
                          {res.message}
                        </MenuItem>
                      );
                    })}
                </Menu>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
              </div>
              {/* {
                <div>
                  <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={11} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <p>Notifications</p>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => logout()}>Logout</MenuItem>
                  </Menu>
                </div>
              } */}
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </React.Fragment>
      )}

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{children}</div>
      </main>
    </div>
  );
}

Mainbar.propTypes = {
  window: PropTypes.func
};

export default Mainbar;
