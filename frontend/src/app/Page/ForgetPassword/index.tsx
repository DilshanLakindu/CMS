import React from 'react'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { FORGOT_PASSWORD_MUTATION } from '../../../GraphQl/Auth'
import { useNavigate } from 'react-router-dom'
import css from '../../util'
import { useFormik } from 'formik'
import { ForgetPswSchema } from '../../../schemas'
import { useDispatch } from 'react-redux'
import { SENT_EMAIL } from 'src/GraphQl/Mutation'
const Log = require('src/app/assets/L1.png')

const ForgetPassword = () => {

    let navigate = useNavigate()
    const [EmailValidate, setEmail] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [serverError, setServerError] = useState<string>("");

    // const [forgetpsw, { loading, error: fgtPswError, data }] = useMutation(SENT_EMAIL)
    const [sendEmail] = useMutation(SENT_EMAIL, {
        onCompleted: () => {
            setSuccess(true);
            setError('');
        },
        onError: (error) => {
            setSuccess(false);
            setError(error.message);
        },
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            to: "",
        },
        validationSchema: ForgetPswSchema,
        onSubmit,
    });

    function onSubmit(e: any): void {
        e.preventDefault();
        sendEmail({
            variables: {
                to: values.to
            }
        });

        console.log("Email :", values.to)
    };


    // console.log(errors);
    // console.log(values)

    return (
        <main className="main-wrapper">
            <div className="section is-sign-in">
                <div className="padding-global">
                    <div className="container-large">
                        <div className="padding-section-large">
                            <div className="section_component is-sign-in">
                                <div className="logo-wrapper">
                                    <div className="image-wrapper is-logo">
                                        <img src={Log} loading="lazy" alt="" className="image-cover" /></div>
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
                                        // onSubmit={handleSubmit}
                                        >
                                            <div className="header-wrapper">
                                                <div className="text-size-large text-weight-bold">Forget Password</div>
                                                <div className="text-size-small text-color-dark-grey">Enter your email address</div>
                                            </div>

                                            <div className="form_field-wrapper">
                                                <label htmlFor="Email" className="form_label">Email Address</label>
                                                <input
                                                    type="email"
                                                    className={css(
                                                        errors.to && touched.to ? "form_input_error" : "form_input w-input"
                                                    )}
                                                    maxLength={256} name="to"
                                                    placeholder="john@doe.com"
                                                    id="to"
                                                    onChange={handleChange}
                                                    value={values.to}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.to && touched.to && <p className="error-text">{errors.to}</p>}
                                            </div>
                                            <button type='submit' className="button is-form-submit w-button custom-button" onClick={onSubmit}>Continue</button>

                                        </form>
                                    </div>
                                    <div className="cta-wrapper">
                                        <div>Don&#x27;t have an account?</div>
                                        <a href="#" className="sign-up_button w-inline-block link-animation">
                                            <div className="link-value" onClick={() => navigate("/")}>Sign In</div>
                                        </a>
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

export default ForgetPassword