import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
const Form = ({ currentId, setCurrentId,setOpen }) => {
  const [postData, setPostData] = useState({
    participant: "",
      location: "",
      units: 0,
      type: "",
      points: 0
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
    setOpen(false)
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      participant: "",
      location: "",
      units: 0,
      type: "",
      points: 0
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Leaderboard
        </Typography>

        <TextField
          name="participant"
          variant="outlined"
          label="Participant name"
          fullWidth
          value={postData.participant}
          onChange={(e) =>
            setPostData({ ...postData, participant: e.target.value })
          }
        />
        <TextField
          name="location"
          variant="outlined"
          label="Location"
          fullWidth
          value={postData.location}
          onChange={(e) => setPostData({ ...postData, location: e.target.value })}
        />
        <TextField
          name="units"
          variant="outlined"
          label="Units"
          type='number'
          fullWidth
          value={postData.units}
          onChange={(e) =>
            setPostData({ ...postData, units: e.target.value })
          }
        />
        <TextField
          name="type"
          variant="outlined"
          label="Type"
          fullWidth
          value={postData.type}
          onChange={(e) =>
            setPostData({ ...postData, type: e.target.value })
          }
        />
        <TextField
          name="points"
          type="number"
          variant="outlined"
          label="Points"
          fullWidth
          value={postData.points}
          onChange={(e) =>
            setPostData({ ...postData, points: e.target.value })
          }
        />
        
        
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
