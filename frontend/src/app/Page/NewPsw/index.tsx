import React from 'react'

import css from '../../util'
import { useFormik } from 'formik'
import { basicSchema } from '../../../schemas'
const Log = require('src/app/assets/L1.png')

const NewPsw = () => {

    const onSubmit = (values: any, actions: any) => {
        console.log(values);
        console.log(actions)
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            password: "",
            confirmpassword: ""

        },
        validationSchema: basicSchema,
        onSubmit,
    });
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
                                    <div>
                                        <span className="logo-span">Job</span>Board</div>
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
                                                <div className="text-size-large text-weight-bold">Enter new password</div>
                                            </div>
                                            <div className="form_field-wrapper">
                                                <label htmlFor="Password" className="form_label">Password</label>
                                                <input
                                                    type="password"
                                                    className={css(
                                                        errors.password && touched.password ? "form_input_error" : "form_input w-input"
                                                    )}
                                                    maxLength={256} name="password"
                                                    placeholder="Enter new password"
                                                    id="Password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.password && touched.password && <p className="error-text">{errors.password}</p>}

                                            </div>
                                            <div className="form_field-wrapper">
                                                <label htmlFor="Password" className="form_label">Confirm Password</label>
                                                <input
                                                    type="password"
                                                    className={css(
                                                        errors.confirmpassword && touched.confirmpassword ? "form_input_error" : "form_input w-input"
                                                    )}
                                                    maxLength={256} name="confirmpassword"
                                                    placeholder="Re type password"
                                                    id="Password"
                                                    onChange={handleChange}
                                                    value={values.confirmpassword}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.confirmpassword && touched.confirmpassword && <p className="error-text">{errors.confirmpassword}</p>}
                                            </div>
                                            <button className="button is-form-submit w-button custom-button">Sign In</button>
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

export default NewPsw