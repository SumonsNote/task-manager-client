import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Login = lazy(() => import('../components/login/Login'))

const LoginPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <Login />
            </Suspense>
        </Fragment>
    );
};

export default LoginPage;