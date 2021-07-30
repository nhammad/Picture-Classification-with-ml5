/*---------------------------------------------------------------------------------
 *
 *	This page contains contact info and some references.
 *
 * --------------------------------------------------------------------------------
 */

import React from "react";
import PermanentDrawerLeft from "../components/PermanentDrawerLeft";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingLeft: "280px",
    paddingTop: "100px",
    textAlign: "center",
  },
  img: {
    width: "60%",
  },
}));

function ContactPage() {
  const classes = useStyles();
  return (
    <div>
      <PermanentDrawerLeft></PermanentDrawerLeft>
      <main className={classes.content}>
        <Typography paragraph>
          This project was developed by Neeha Hammad
          <br />
          <br />
          neeha.hammad@hotmail.com
          <br />
        </Typography>
      </main>
    </div>
  );
}

export default ContactPage;