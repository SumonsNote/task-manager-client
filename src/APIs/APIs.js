import axios from "axios"
import { ErrorToast, SuccessToast } from "../helpers/FormHelper"
import { getToken, setEmail, setOTP, setToken, setUserDetails } from "../helpers/SessionHelper"
import { setProfile } from "../redux/state/ProfileSlice"
import { hideLoader, showLoader } from "../redux/state/SettingSlice"
import { setSummary } from "../redux/state/SummarySlice"
import { SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask } from "../redux/state/TaskSlice"

import Store from "../redux/store/Store"

const BASE_URL = 'https://task-manager-server-beryl.vercel.app/api/v1'
const axiosHeader = { headers: { 'token': getToken() } }

export function RegistrationRequest(email, firstName, lastName, mobile, password, photo) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/registration'
    let postBody = { email: email, firstName: firstName, lastName: lastName, mobile: mobile, password: password, photo: photo }

    return axios.post(URL, postBody).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res.data['status'] === "Failed") {
                if (res.data['data']['keyPattern']['email'] === 1) {
                    ErrorToast("Email Already Exist")
                    return false;
                }
                else {
                    ErrorToast("Something Went Wrong")
                    return false;
                }
            }
            else {
                SuccessToast("Registration Success")
                return true;
            }
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err) => {
        Store.dispatch(hideLoader())
        ErrorToast('Something went wrong')
        return false;
    })
}

export function LoginRequest(email, password) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + "/login";
    let PostBody = { "email": email, "password": password }
    return axios.post(URL, PostBody).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            setToken(res.data['token']);
            setUserDetails(res.data['data']);
            SuccessToast("Login Success")
            return true;
        }
        else {
            ErrorToast("Invalid Email or Password")
            return false;
        }
    }).catch((err) => {
        ErrorToast("Wrong Password")
        Store.dispatch(hideLoader())
        return false;
    });
}

export function newTaskRequest(title, description) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/createTask';
    let postBody = { 'title': title, 'description': description, status: 'new' }

    return axios.post(URL, postBody, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast('New task created')
            return true;
        }
        else {
            ErrorToast('Something went wrong')
            return false;
        }
    }).catch((err) => {
        ErrorToast('Something went wrong');
        Store.dispatch(hideLoader())
        return false;
    })
}

export function TaskListByStatus(status) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + "/listTaskByStatus/" + status;
    axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            if (status === "new") {
                Store.dispatch(SetNewTask(res.data['data']))
            }
            else if (status === "completed") {
                Store.dispatch(SetCompletedTask(res.data['data']))
            }
            else if (status === "canceled") {
                Store.dispatch(SetCanceledTask(res.data['data']))
            }
            else if (status === "progress") {
                Store.dispatch(SetProgressTask(res.data['data']))
            }
        }
        else {
            ErrorToast("Something Went Wrong")
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong")
        Store.dispatch(hideLoader())
    });
}

export function summaryRequest() {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/taskStatusCount';
    axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())

        if (res.status === 200) {
            Store.dispatch(setSummary(res.data['data']))
        }
        else {
            ErrorToast('Something went wrong')
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
    })
}

export function DeleteRequest(id) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + "/deleteTask/" + id;
    console.log(axiosHeader)
    return axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast("Delete Successful")
            return true;
        }
        else {
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err) => {
        ErrorToast("Something Went Wrong")
        Store.dispatch(hideLoader())
        return false;
    });
}

export function UpdateStatusRequest(id, status) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/updateTask/' + id + '/' + status;
    return axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast('Status Updated')
            return true;
        }
        else {
            ErrorToast('Something went wrong')
            return false;
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
        return false;
    })
}

export function GetProfileDetails() {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/profileDetails';
    axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())

        if (res.status === 200) {
            Store.dispatch(setProfile(res.data['data'][0]))
        }
        else {
            ErrorToast('Something went wrong')
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
    })
}

export function UpdateProfileRequest(email, firstName, lastName, mobile, password, photo) {
    Store.dispatch(showLoader())

    let URL = BASE_URL + '/profileUpdate';

    let postBody = { email: email, firstName: firstName, lastName: lastName, mobile: mobile, password: password, photo: photo }
    let userDetails = { email: email, firstName: firstName, lastName: lastName, mobile: mobile, photo: photo }

    return axios.post(URL, postBody, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            SuccessToast('Profile Update Successful')
            setUserDetails(userDetails);
            return true;
        }
        else {
            ErrorToast('Something went wrong')
            return false;
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
        return false;
    })
}

export function recoverVerifyEmailRequest(email) {
    Store.dispatch(showLoader())
    let URL = BASE_URL + '/recoverVerifyEmail/' + email;
    return axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                ErrorToast('No user found');
                return false;
            }
            else {
                setEmail(email)
                SuccessToast('A 6 digit code sent to your mail')
                return true;
            }
        }
        else {
            ErrorToast('Something went wrong')
            return false;
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
        return false;
    })
}

export function recoverVerifyOTPRequest(email, OTP) {
    Store.dispatch(showLoader())

    let URL = BASE_URL + '/recoverVerifyOTP/' + email + '/' + OTP;
    return axios.get(URL, axiosHeader).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res.data['status'] === 'fail') {
                ErrorToast(res.data['data'])
                return false;
            }
            else {
                setOTP(OTP)
                SuccessToast('Code verification success')
                return true;
            }
        }
        else {
            ErrorToast('Something went wrong')
            return false;
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
    })
}

export function recoverResetPassRequest(email, OTP, password) {
    Store.dispatch(showLoader())

    let URL = BASE_URL + '/recoverResetPass';
    let postBody = { email: email, OTP: OTP, password: password };

    return axios.post(URL, postBody).then((res) => {
        Store.dispatch(hideLoader())
        if (res.status === 200) {
            if (res.data['status'] === "fail") {
                ErrorToast(res.data['data']);
                return false;
            }
            else {
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else {
            ErrorToast('Something went wrong')
        }
    }).catch((err) => {
        ErrorToast('Something went wrong')
        Store.dispatch(hideLoader())
    })
}