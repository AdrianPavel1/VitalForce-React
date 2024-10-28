import React, { useState } from "react";
import LoginCSS from "./LoginPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import fitnessBackground from "../../images/logIn.png";
import MainMenu from "../MainMenu/MainMenu";
import axios from "axios"; //biblioteca ce ma ajuta sa fac cereri http

function LoginPage() {
  // State pentru a controla formularul activ
  const [isLoginForm, setIsLoginForm] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [Loginvalues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoginChanges = (e) => {
    setLoginValues({ ...Loginvalues, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        values
      );
      if (response.status === 201) {
        navigate("/AboutMe");
        localStorage.setItem("username", response.data.username);

        setValues({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      setErrorMessage("Something went wrong with registration.");
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        Loginvalues
      );
      if (response.status === 200) {
        // Salvează token și username în localStorage
        localStorage.setItem("token", response.data.token); // Dacă folosești token
        localStorage.setItem("username", response.data.user.username); // Salvează username
  
        navigate("/MainMenu");
  
        setLoginValues({
          email: "",
          password: "",
        });
      }
    } catch (err) {
      setErrorMessage("Wrong email or password!");
    }
  };

  return (
    <>
      <div
        className={LoginCSS.firstDiv}
        style={{
          backgroundImage: `url(${fitnessBackground})`,
        }}
      >
        <div className={LoginCSS.content}>
          <div className={LoginCSS.buttonsContainer}>
            <div className={LoginCSS.overlay}>
              {/* Butoane care schimbă formularul afișat */}
              <button
                className={LoginCSS.actionButton}
                onClick={() => setIsLoginForm(true)}
              >
                Log In
              </button>
              <button
                className={LoginCSS.actionButton}
                onClick={() => setIsLoginForm(false)}
              >
                Sign Up
              </button>
            </div>
          </div>

          <section className={LoginCSS.formContainer}>
            <h1>VitalForce</h1>
            <p>
              Founded in 2010, Vital Force has been at the forefront of the
              fitness industry, continually innovating to provide the best
              solutions for our clients' health and wellness needs.
            </p>

            {/* Afișăm formularul corect în funcție de starea isLoginForm */}
            {isLoginForm ? (
              // Formular Log In
              <form onSubmit={handleSubmitLogin}>
                <h3>Log In</h3>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={handleLoginChanges}
                />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={handleLoginChanges}
                />
                {errorMessage && (
                  <p className={LoginCSS.errorMessage}>{errorMessage}</p>
                )}
                {/* Link către pagina principală */}
                <button className={LoginCSS.submitButton}>Log In</button>
              </form>
            ) : (
              // Formular Sign Up
              <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <input
                  type="text"
                  name="username"
                  required
                  placeholder="Username"
                  onChange={handleChanges}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  onChange={handleChanges}
                />

                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  onChange={handleChanges}
                />
                {errorMessage && (
                  <p className={LoginCSS.errorMessage}>{errorMessage}</p>
                )}
                {/* Link către pagina principală */}
                <button className={LoginCSS.submitButton}>Sign Up</button>
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
