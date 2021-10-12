import React,{useState} from "react";
import {
  Avatar,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PropTypes from "prop-types"

//redux
import { connect } from "react-redux";
import { login } from "./actions/auth";


const Login = ({ login, isAuthenticated}) => {

  const [userData, setUserData] = useState({

    email: "",
    password: ""

  });
  const { email, password } = userData;

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("clicked")
      login( email, password );

  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 350,
    margin: "20px auto",
  };

  const avatarStyle = {
    backgroundColor: "#078573",
  };

  const textStyle = {
    margin: '10px 0'
  }

  const btnStyle = {
    margin: "8px 0",
  };
  const typoStyle = {
    margin: "5px auto",
    fontSize: 15,
  };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2> Sign in </h2>
        </Grid>
        <form onSubmit= {e => onSubmit(e)}>
        <Grid style={textStyle}>
          <TextField
            name='email'
            label="Username"
            placeholder="Username"
            type="text"
            value={email}
            onChange={(e) => onChange(e)}
            fullWidth
            required
          />
          <TextField
            name='password'
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            fullWidth
            required
          />
        </Grid>

        <FormControlLabel
          control={<Checkbox name="checked" color="primary" />}
          label="Remember me"
        />
        <Button
          style={btnStyle}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
        >
          Signin
        </Button>
        </form>
        <Grid>
          <Typography style={typoStyle}>
            <Link href="#">Forgot password</Link>
          </Typography>
          <Typography style={typoStyle}>
            {" "}
            Do you have an account ? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

