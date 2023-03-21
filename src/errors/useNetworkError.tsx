import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { appDispatch } from '../type';
import setError from '../store/errors/action';
import { setIsLoading } from '../store/requests/action';

export const networkError = 'networkError';

export default function useNetworkError() {
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
}

function checkOnlineState(sendAction: () => void) {
    if (navigator.onLine) return;
    sendAction();
}
