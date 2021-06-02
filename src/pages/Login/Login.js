import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { login } from "../../utils/auth";
import { user } from "../../config/user";
import classes from "./Login.module.scss";

import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (user.email === email && user.password === password) {
      login();
      history.push("/investigation/moruroa-files");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <section className={classes["form-container"]}>
        <h1 className={classes.title}>Login</h1>
        <form onSubmit={handleLogin} className={classes.form}>
          <TextField
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
          <TextField
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
          <Button type="submit">Login</Button>
        </form>
      </section>
    </div>
  );
}

export default Login;
