import { useSelector } from 'react-redux';

import type { storeType } from '../../type';
import type { alertType } from '../../components/Alert';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';

export interface IUseSideContents {
    error: {
        hasError: string | null;
        props: () => { text: string; type?: keyof typeof alertType };
    };
    other?: { check: boolean; component?: JSX.Element; action?: () => JSX.Element | void }[];
    withoutLoading?: boolean;
}

export default function useSideContents({ error, other, withoutLoading }: IUseSideContents) {
    const isLoading = useSelector((state: storeType) => state.isLoading);

    if (isLoading && !withoutLoading) return <Loading />;

    if (error.hasError) {
        const { text, type } = error.props();
        return <Alert message={text} type={type || 'error'} />;
    }

    if (!other) return false;
    // eslint-disable-next-line no-restricted-syntax
    for (const { check, component, action } of other) {
        if (check && component) return component;
        if (check && action) return action();
    }

    return false;
}
