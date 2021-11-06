import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid, Backdrop, Fade, Modal } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import PlayersList from "./components/PlayersList/PlayersList";
import Form from "./components/Form/Form";

import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h4" align="right">
         LeaderBoard
        </Typography>
       
        <button type="button" className={classes.addPlayer} onClick={handleOpen}>
          Add Player
        </button>
      </AppBar>

      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={12}>
              <PlayersList setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} setOpen={setOpen} />
          </Grid>
        </Fade>
      </Modal>
    </Container>
  );
};

export default App;
