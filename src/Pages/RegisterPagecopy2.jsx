import "../style/registerPage.css"
import React, { useState } from "react";

const PasswordChecker = (props) => {
  const [formval, setFormval] = useState({
    email: "",
    pwd: "",
  });
  const [errors, setErrors] = useState({
    charlength: false,
    specialchar: false,
    UpperLowerchar: false,
    numeric: false,
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormval({ ...formval, [name]: value });
    if (name === "pwd") {
      setErrors({
        charlength: !(value.length > 8),
        specialchar: !/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value),
        UpperLowerchar: !/^(?=.*[a-z])(?=.*[A-Z])/.test(value),
        numeric: !/^(?=.*\d)/.test(value),
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidForm(errors)) {
      console.log("form is valid");
      console.log(formval);
    } else {
      console.log("form is invalid");
    }
  };
  const ValidForm = (val) => {
    let formvalid = true;
    Object.values(val).forEach((item) => item && (formvalid = false));
    return formvalid;
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Sign-In</legend>
          <input
            type="email"
            placeholder="email"
            name="email"
            required
            autoComplete="off"
            onChange={handleChange}
            value={formval.email}
          />
          <div className="password">
            <input
              type="password"
              name="pwd"
              placeholder="password"
              value={formval.pwd}
              onChange={handleChange}
              required
            />
            {formval.pwd !== "" && !ValidForm(errors) && (
              <div className="box check">
                <div
                  className="errorquotes"
                  style={errors.charlength ? null : { color: "#2cfd03" }}
                >
                  <i
                    className={
                      errors.charlength
                        ? "fa fa-times-circle"
                        : "fa fa-check-circle"
                    }
                  />
                  <p>must contain altleast 8 characters</p>
                </div>
                <div
                  className="errorquotes"
                  style={errors.UpperLowerchar ? null : { color: "#2cfd03" }}
                >
                  <i
                    className={
                      errors.charlength
                        ? "fa fa-times-circle"
                        : "fa fa-check-circle"
                    }
                  />
                  <p>must contain atleast 1 Upper & lower case character</p>
                </div>
                <div
                  className="errorquotes"
                  style={errors.specialchar ? null : { color: "#2cfd03" }}
                >
                  <i
                    className={
                      errors.charlength
                        ? "fa fa-times-circle"
                        : "fa fa-check-circle"
                    }
                  />
                  <p>must contain altleast 1 special characters</p>
                </div>
                <div
                  className="errorquotes"
                  style={errors.numeric ? null : { color: "#2cfd03" }}
                >
                  <i
                    className={
                      errors.charlength
                        ? "fa fa-times-circle"
                        : "fa fa-check-circle"
                    }
                  />
                  <p>must contain altleast 1 numeric characters</p>
                </div>
              </div>
            )}
          </div>
          <input type="submit" disabled={!ValidForm(errors)} />
        </fieldset>
      </form>
    </div>
  );
};
export default PasswordChecker;