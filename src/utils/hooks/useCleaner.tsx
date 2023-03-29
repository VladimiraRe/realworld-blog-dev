import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsLoading } from '../../store/requests/action';
import type { appDispatch, storeType, actionsType } from '../../type';

interface IUseCleaner {
    check: boolean;
    action?: () => actionsType;
    other?: () => void;
}

export default function useCleaner(props: IUseCleaner[]) {
    const dispatch: appDispatch = useDispatch();
    const isLoading = useSelector((state: storeType) => state.isLoading);

    useEffect(
        () => () => {
            if (isLoading) dispatch(setIsLoading(false));
            props.forEach(({ check, action, other }) => {
                if (check && action) dispatch(action());
                if (check && other) other();
            });
        },
        [dispatch, isLoading, props]
    );
}
