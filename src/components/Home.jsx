import React from "react";
import GPlogo from "../assets/gp.png";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  paperStyles: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "70%",
    height: "70vh",
    marginTop: "32px",
  },
  logo: {
    maxHeight: "200px",
    maxWidth: "200px",
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="lg">
      <Paper className={classes.paperStyles} elevation={3}>
        <h1>Welcome</h1>
        <div>
          <img className={classes.logo} src={GPlogo} alt="logo" />
        </div>
        <h4>The styrelse is happy to see you again</h4>
      </Paper>
    </Container>
  );
};

export default Home;
