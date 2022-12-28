import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
import MasterLayout from '../components/masterLayout/MasterLayout';
const Cancel = lazy( () => import ('../components/cancel/Cancel'))

const CancelPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Cancel/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CancelPage;