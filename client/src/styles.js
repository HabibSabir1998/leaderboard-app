import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding:10,
    backgroundColor:'transparnet'
  },
  heading: {
    color: "black",
    padding:2,
    fontWeight:'bold'
  },
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlayer: {
    color:"white",
    backgroundColor: "rgb(96, 93, 158)",
    textTransform: 'capitalize',
    width: 150,
    borderRadius: 7,
    height:40,
  },
  [theme.breakpoints.down("sm")]: {
    mainContainer: {
      flexDirection: "column-reverse",
    },
  },
}));
