
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import { SignInSchema, basicSchema } from '../../../schemas'
import css from '../../util/index'
import { useDispatch, useSelector } from 'react-redux'
import { gql, useMutation } from '@apollo/client'
import { setLoginResponse } from 'src/app/Redux/authSlice'
import CustomLoader from 'src/app/components/common/CustomLoader/CustomLoader'
const Log = require('src/app/assets/L1.png')





interface IProps {
  email: string;
  password: string;
}

const initialState: IProps = {
  email: "",
  password: "",
};

const SignIn = () => {
  const disptach = useDispatch();
  const { userRole, access_token } = useSelector((state: any) => state.auth);
  const [error, setError] = useState<IProps>(initialState);
  const [serverError, setServerError] = useState<string>("");
  const navigate = useNavigate();
  const LOGINMUTATION = gql`
      mutation LOGINMUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          access_token
          userRole
          userName
        }
      }
    `;

  const [login, { loading, error: loginError, data }] = useMutation(LOGINMUTATION);

  const ForgetPsw = () => {
    navigate("/forgetpsw")
  }

  // const validate = () => {
  //     let temp: IProps = {
  //         email: "",
  //         password: "",
  //     };
  //     temp.email = value.email === "" ? "Please Enter Email" : "";
  //     temp.password = value.password === "" ? "Please Enter Password" : "";

  //     setError({
  //         ...temp,
  //     });
  //     return Object.values(temp).every((x) => x === "");
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  //     const { name, value: dataValue } = e.target;

  //     setValue({ ...value, [name]: dataValue });
  // };

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
      checkbox: true,
    },
    validationSchema: SignInSchema,

    onSubmit
  });

  function onSubmit(e: any): void {

    setServerError("");
    console.log("formilk submirt", values)

    login({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        console.log(res)
        disptach(setLoginResponse(res.data.login));
        if (res.data.login.userRole === "admin") {
          navigate("/dashboard", { replace: true });
        }
        if (res.data.login.userRole === "user") {
          navigate("/userdashboard", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setServerError(err.message);
      });


  };



  return (
    <main className="main-wrapper">
      <div className="section is-sign-in">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="section_component is-sign-in">
                <div className="logo-wrapper">
                  <div className="image-wrapper is-logo">
                    <img src={Log} loading="lazy" alt="" className="image-cover" />

                  </div>
                  {/* <div>
                    <span className="logo-span">Job</span>Board</div> */}
                </div>
                <div className="form-wrapper">
                  <div className="form_component is-sign-in w-form">

                    <form
                      id="wf-form-Form"
                      name="wf-form-Form"
                      data-name="Form"
                      method="get"
                      className="form_form"
                      onSubmit={handleSubmit}

                    >
                      <div className="header-wrapper">
                        <div className="text-size-large text-weight-bold">Sign In</div>
                      </div>
                      <div className="form_field-wrapper">
                        <label htmlFor="Email" className="form_label">Email Address</label>
                        <input
                          type="email"
                          className={css(
                            errors.email && touched.email ? "form_input_error" : "form_input w-input"
                          )}
                          maxLength={256}
                          name="email"
                          placeholder="john@doe.com"
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          onBlur={handleBlur}


                        // className={errors.email ? "form_input_error" : "form_input w-input"}
                        // onChange={e => setEmail(e.target.value)} />
                        />

                        {errors.email && touched.email && <p className="error-text">{errors.email}</p>}

                      </div>
                      <div className="form_field-wrapper">
                        <label htmlFor="Password" className="form_label">Password</label>
                        <input
                          type="password"
                          // className={ errors.password? "form_input_error":"form_input w-input" }
                          className={css(

                            errors.password && touched.password ? "form_input_error" : "form_input w-input"
                          )}
                          maxLength={256}
                          name="password"
                          placeholder="Enter your password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        //  onChange={e => setPassword(e.target.value)} />
                        />
                        {errors.password && touched.password && <p className="error-text">{errors.password}</p>}
                      </div>
                      <div className="form_field-wrapper is-horizontal">
                        <label className="w-checkbox form_checkbox is-sign-in">
                          <div className="w-checkbox-input w-checkbox-input--inputType-custom form_checkbox-icon"></div>
                          <input type="checkbox" name="checkbox" id="checkbox"
                            style={{
                              opacity: 0,
                              position: "absolute",
                              zIndex: -1,
                              border: 0,
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={String(values.checkbox)}
                            className={css(
                              errors.checkbox && touched.checkbox ? "form_input_error" : "form_input w-input"
                            )}

                          />

                          <span className="form_checkbox-label w-form-label">
                            Keep me sign in
                          </span>
                        </label>

                        <a href="#" className="text-link w-inline-block ">
                          <div className="text-link-animation" onClick={() => navigate("/forgetpsw")}>Forgot password?</div>
                        </a>
                      </div>
                      {errors.checkbox && touched.checkbox && <p className="error-text">{errors.checkbox}</p>}
                      {loading ? (<CustomLoader />) : (<button type='submit' className="button is-form-submit w-button custom-button" >Sign In</button>)}
                    </form>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignIn