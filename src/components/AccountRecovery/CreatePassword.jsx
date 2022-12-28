import React, { Fragment, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import { recoverResetPassRequest } from '../../APIs/APIs';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { getEmail, getOTP } from '../../helpers/SessionHelper';

const CreatePassword = () => {

    let passwordRef, confirmPasswordRef = useRef()
    let navigate = useNavigate()

    const reset = () => {
        let password = passwordRef.value;
        let confirmPassword = confirmPasswordRef.value;

        if(IsEmpty(password)){
            ErrorToast('Password Required')
        }
        else if(IsEmpty(confirmPassword)){
            ErrorToast('Confirm Password Required')
        }
        else if(password !== confirmPassword){
            ErrorToast('Password & Confirm Password should be same')
        }
        else {
            recoverResetPassRequest(getEmail(), getOTP(), password).then((res) => {
                if(res === true){
                    navigate('/login')
                }
            })
        }
    }
    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90 p-4">
                            <div className="card-body">
                                <h4>SET NEW PASSWORD</h4>
                                <br/>
                                <label>Your email address</label>
                                <input value={getEmail()} readOnly={true} placeholder="User Email" className="form-control animated fadeInUp" type="email"/>
                                <br/>
                                <label>New Password</label>
                                <input ref={(input) => passwordRef = input} placeholder="New Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <label>Confirm Password</label>
                                <input ref={(input) => confirmPasswordRef = input} placeholder="Confirm Password" className="form-control animated fadeInUp" type="password"/>
                                <br/>
                                <button onClick={reset} className="btn w-100 animated fadeInUp float-end btn-primary">Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CreatePassword;