import React, { useState } from "react";
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
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { register } from "./actions/auth";
import { setAlert } from "./actions/alert";

const Signup = ({ setAlert, register, isAuthenticated }) => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = userData;

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  const paperStyle = {
    padding: 20,
    height: "75vh",
    width: 370,
    margin: "30px auto",
    backgroundColor: "transparent",
  };

  const avatarStyle = {
    backgroundColor: "#078573",
  };
  const btnStyle = {
    margin: "18px 0",
  };
  const typoStyle = {
    fontSize: 15,
    marginLeft: "7rem",
    marginTop: "10px",
  };

  const textStyle = {
    display: "flex",
    displayDirection: "row",
  };
  const field = {
    marginRight: "10px",
  };
  const textField = {
    marginBottom: "30px",
  };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <form>
        <Grid style={textField}>
          <Grid style={textStyle}>
            <TextField
              style={field}
              name="name"
              label="First Name"
              placeholder="first Name"
              type="text"
              value={name}
              onChange={(e) => onChange(e)}
              required
            ></TextField>
            <TextField
              name="name"
              label="Last Name"
              placeholder="last Name"
              type="text"
            ></TextField>
          </Grid>
          <TextField
            name="email"
            label="Email"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => onChange(e)}
            fullWidth
            required
          ></TextField>
          <TextField
            name="password"
            label="Password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
            fullWidth
            required
          ></TextField>
          <TextField
            name="password2"
            label="Confirm Password"
            placeholder="confirm password"
            value={password2}
            onChange={(e) => onChange(e)}
            type="password"
            fullWidth
            required
          ></TextField>
        </Grid>
        </form>
        <FormControlLabel
          control={<Checkbox name="checked" color="primary" />}
          label="I want to receive inspiration, marketing promotions and updates via email."
        />
        <Button
          style={btnStyle}
          type="submit"
          color="primary"
          variant="contained"
          onSubmit={e => onSubmit(e)}
          fullWidth
        >
          SignUp
        </Button>
        <Grid>
          <Typography style={typoStyle}>
            {" "}
            Already have an account ? <Link to="/">Sign in</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

Signup.propTypes = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Signup);
