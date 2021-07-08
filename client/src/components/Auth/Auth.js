import "./auth.css";

import { useState, useEffect, useRef } from "react";
import { signIn, register } from "../../store/users";

import { useDispatch } from "react-redux";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  const initialState = {
    emailLogin: "",
    passwordLogin: "",
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
  };
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (isRegister) {
      ref.current.style.top = "290px";
      ref.current.style.right = "55px";
    } else {
      ref.current.style.top = "230px";
    }
  }, [isRegister]);

  const handleToggle = () => {
    setIsRegister(!isRegister);
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (isRegister) {
      dispatch(
        register({
          name: form.nameRegister,
          email: form.emailRegister,
          password: form.passwordRegister,
        })
      );
    } else {
      dispatch(
        signIn({
          email: form.emailLogin,
          password: form.passwordLogin,
        })
      );
    }
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <div className="form-box">
        <h4 className="title">Welcome to Rooms</h4>
        <form
          id="login"
          className="input-group"
          autoComplete="off"
          onSubmit={handleAuth}
        >
          {isRegister && (
            <input
              type="text"
              className="input-field"
              placeholder="Nickname"
              name="nameRegister"
              autoFocus
              required
              value={form.nameRegister}
              onChange={handleOnChange}
            />
          )}

          <input
            type="email"
            className="input-field"
            placeholder="Email"
            name={isRegister ? "emailRegister" : "emailLogin"}
            autoFocus
            required
            value={isRegister ? form.emailRegister : form.emailLogin}
            onChange={handleOnChange}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            name={isRegister ? "passwordRegister" : "passwordLogin"}
            required
            value={isRegister ? form.passwordRegister : form.passwordLogin}
            onChange={handleOnChange}
          />

          <button type="submit" className="go-button">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <button ref={ref} className="toggle-button" onClick={handleToggle}>
          {isRegister ? "Login" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
