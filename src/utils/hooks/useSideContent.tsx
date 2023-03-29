import { useSelector } from 'react-redux';

import type { storeType } from '../../type';
import Loading from '../../components/Loading';
import Alert from '../../components/Alert';
import type { alertType } from '../helpers/alert.helpers';

interface IOther {
    check: boolean;
    component?: JSX.Element;
    action?: () => JSX.Element | void;
    priority?: string;
}

export interface IUseSideContents {
    error: {
        hasError: string | null | undefined;
        props: () => { text: string; type?: keyof typeof alertType };
    };
    other?: IOther[];
    withoutLoading?: boolean;
}

export default function useSideContents({ error, other, withoutLoading }: IUseSideContents) {
    const isLoading = useSelector((state: storeType) => state.isLoading);

    if (isLoading && !withoutLoading) return <Loading />;

    let err;
    if (error.hasError) {
        const { text, type } = error.props();
        err = <Alert message={text} type={type || 'error'} />;
    }

    if (!other && !error.hasError) return false;
    if (!other && error.hasError) return err;

    const find = other?.find((el) => (el.check && el.component) || (el.check && el.action)) as IOther;

    if (error.hasError && (!find || !find.priority || error.hasError !== find.priority)) return err;
    if ((!error.hasError && find) || (error.hasError && find && find.priority && error.hasError === find.priority)) {
        if (find.action) return find.action();
        return find.component;
    }

    return false;
}
