import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { appDispatch } from '../type';
import setError from '../store/errors/action';
import { setIsLoading } from '../store/requests/action';

export default function useNetworkError() {
    const dispatch: appDispatch = useDispatch();

    const error = 'networkError';

    const checkOnline = useCallback(
        () =>
            checkOnlineState(() => {
                dispatch(setError(error));
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
