import React, { Fragment, lazy, Suspense } from 'react';
import LazyLoader from '../components/masterLayout/LazyLoader';
const Profile = lazy(() => import('../components/profile/Profile'))

const ProfilePage = () => {
    return (
        <Fragment>
            <Suspense fallback={<LazyLoader />}>
                <Profile />
            </Suspense>
        </Fragment>
    );
};

export default ProfilePage;