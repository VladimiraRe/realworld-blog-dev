import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsLoading } from '../../store/requests/action';
import type { appDispatch, storeType, actionsType } from '../../type';

interface IUseCleaner {
    check: boolean;
    action: () => actionsType;
}

export default function useCleaner(props: IUseCleaner[]) {
    const dispatch: appDispatch = useDispatch();
    const isLoading = useSelector((state: storeType) => state.isLoading);

    useEffect(
        () => () => {
            if (isLoading) dispatch(setIsLoading(false));
            props.forEach((el) => {
                if (el.check) dispatch(el.action());
            });
        },
        [dispatch, isLoading, props]
    );
}
