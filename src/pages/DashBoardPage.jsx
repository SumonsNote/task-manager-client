import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
import MasterLayout from '../components/masterLayout/MasterLayout';
const Dashboard = lazy(() => import('../components/dashboard/Dashboard'))

const DashBoardPage = () => {
    return (
        <Fragment>
            <MasterLayout>
                <Suspense fallback={<LazyLoader />}>
                    <Dashboard />
                </Suspense>
            </MasterLayout>
        </Fragment>
    );
};

export default DashBoardPage;