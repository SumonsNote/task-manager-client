import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Registration = lazy(() => import('../components/registration/Registration'))

const RegistrationPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <Registration />
            </Suspense>
        </Fragment>
    );
};

export default RegistrationPage;