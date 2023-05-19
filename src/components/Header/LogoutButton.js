import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch } from "react-redux";
import { useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    '&:hover': {
      backgroundColor: '#ffcc00',
    },
  },
}));



const LogoutButton = () => {
 const dispatch = useDispatch();
 const history = useHistory();
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      endIcon={<SendIcon />}
      className={classes.button}
      onClick={() => {
        localStorage.clear("user");
        localStorage.clear("auth_token");
        dispatch({ type: "CLEAR__USER" });
        history.push("/login");
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
