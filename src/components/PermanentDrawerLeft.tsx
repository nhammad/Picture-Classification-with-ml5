/**
 * ---------------------------------------------------------
 *
 * 	This component is the left side bar that appears on all screens.
 *  It shows icons and is used to navigate.
 *
 * ----------------------------------------------------------
 */

import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import VideocamIcon from "@material-ui/icons/Videocam";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      color: "white",
      display: "flex",
      justifyContent: "space-between",
    },
    panelheaderRight: {
      marginRight: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    toolbarClass: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
    },
  })
);

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarClass}>
          <Typography variant="h6" noWrap className={classes.title}>
            Picture Classification with ml5.js
          </Typography>
          <div className={classes.panelheaderRight}>
            <HelpIcon />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className="toolbar" />
        <Divider />
        <List>
          {[
            { text: "Home", url: "/", icon: <HomeIcon /> },
          ].map((item, index) => (
            <Link to={item.url} style={{ textDecoration: "none" }} key={index}>
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {[{ text: "Contact", url: "/contact", icon: <MailIcon /> }].map(
            (item, index) => (
              <Link
                to={item.url}
                style={{ textDecoration: "none" }}
                key={index}
              >
                <ListItem button key={item.text}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            )
          )}
        </List>
      </Drawer>
    </div>
  );
}
