import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import passwordValidator from "password-validator";

export default function Login() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  let schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .has()
    .symbols(1)
    .has()
    .digits(1)
    .has()
    .uppercase(1)
    .letters(1);

  // validation
  const valodate = (value) => {
    if (schema.validate(value)) {
      setErrorMsg("");
      let data = { ...userData, ["password"]: value };
      setUserData(data);
    } else {
      setErrorMsg(
        "Password should contain atleast one symbol one number and should be 8 digits long!"
      );
    }
  };

  // change handler for email
  const handleChange = (event) => {
    let data = { ...userData, ["email"]: event.target.value };
    setUserData(data);
  };

  // login button function
  const clickHandle = (e) => {
    e.preventDefault();

    if (userData.email === "") {
      alert("Please Insert Email");
    } else if (userData.password === "") {
      alert("Please Insert Password");
    } else {
      if (userData.email === "sntuser" && userData.password === "Snt@1234") {
        localStorage.setItem("email", userData.email);
        localStorage.setItem("password", userData.password);
        navigate("/landingPage");
      } else {
        alert("Worng Email or Password!");
      }
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <label htmlFor="email">Email :</label>
        <input onChange={handleChange} type="text" id="email" name="email" />
      </div>

      <div className="container">
        <label htmlFor="password">Password :</label>
        <input
          onChange={(e) => valodate(e.target.value)}
          type="text"
          id="password"
          name="password"
        />
        {errorMsg === "" ? null : <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>

      <div className="container">
        <button onClick={clickHandle} className="btn">
          Login
        </button>
      </div>
    </div>
  );
}
