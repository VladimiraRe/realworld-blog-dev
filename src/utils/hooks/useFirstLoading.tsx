import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import Container from '../../containers/Container';
import type { storeType } from '../../type';

import getCookie from './getCookie';

export default function useFirstLoading() {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const [isLoading, setIsLoading] = useState<boolean>();

    useLayoutEffect(() => {
        const { token } = getCookie();
        if (token && loggedIn === null) setIsLoading(true);
        if (!token || loggedIn !== null) setIsLoading(false);
    }, [loggedIn]);

    if (isLoading) return <Container component={<Loading />} />;
    return null;
}
