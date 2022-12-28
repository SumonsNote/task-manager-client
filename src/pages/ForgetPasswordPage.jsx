import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const ForgetPassword = lazy( () => import ('../components/AccountRecovery/SendOTP'))

const ForgetPasswordPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <ForgetPassword/>
            </Suspense>
        </Fragment>
    );
};

export default ForgetPasswordPage;