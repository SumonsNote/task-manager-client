import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const NotFound = lazy(() => import('../components/notFound/NotFound'))

const NotFoundPage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <NotFound/>
            </Suspense>
        </Fragment>
    );
};

export default NotFoundPage;