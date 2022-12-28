import React, {lazy, Suspense} from 'react';
import LazyLoader from '../../components/masterLayout/LazyLoader';
const CreatePassword = lazy(() => import ('../../components/AccountRecovery/CreatePassword'));
const CreatePasswordPage = () => {
    return (
        <Suspense fallback={<LazyLoader/>}>
            <CreatePassword/>
        </Suspense>
    );
};

export default CreatePasswordPage;