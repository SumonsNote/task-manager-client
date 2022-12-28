import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
import MasterLayout from '../components/masterLayout/MasterLayout';
const Complete = lazy( () => import ('../components/complete/Complete'))

const CompletePage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Complete/>
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default CompletePage;