import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { appDispatch, storeType } from '../type';
import setError from '../store/errors/action';
import { setIsLoading } from '../store/requests/action';
import Container from '../containers/Container';
import Alert from '../components/Alert';
import { alertMessage } from '../utils/helpers/alert.helpers';

export const networkError = 'networkError';

export default function useNetworkError() {
    const hasError = useSelector((state: storeType) => state.hasError);
    const dispatch: appDispatch = useDispatch();

    const checkOnline = useCallback(
        () =>
            checkOnlineState(() => {
                dispatch(setError(networkError));
                dispatch(setIsLoading(false));
            }),
        [dispatch]
    );

    checkOnline();

    useEffect(() => {
        window.addEventListener('online', checkOnline);
        return () => window.removeEventListener('online', checkOnline);
    }, [checkOnline]);

    if (hasError && hasError[0] === networkError)
        return <Container component={<Alert message={alertMessage.networkError} type='error' />} />;

    return null;
}

function checkOnlineState(sendAction: () => void) {
    if (navigator.onLine) return;
    sendAction();
}
