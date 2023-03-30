import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useRedirect(check: boolean, path: string, action?: () => void) {
    const history = useHistory();

    useLayoutEffect(() => {
        if (check) {
            if (action) action();
            history.push(path);
        }
    }, [history, action, check, path]);
}
