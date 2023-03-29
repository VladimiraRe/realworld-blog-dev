import { useLayoutEffect, useState } from 'react';

import useCleaner from './useCleaner';

export default function useReload() {
    const [reload, setReload] = useState<boolean | 'done'>(false);

    useLayoutEffect(() => {
        if (sessionStorage.getItem('isReloaded')) {
            sessionStorage.removeItem('isReloaded');
            setReload('done');
        }
    }, []);

    useCleaner([
        {
            check: !!(sessionStorage.getItem('isReloaded') && reload !== true),
            other: () => sessionStorage.removeItem('isReloaded'),
        },
    ]);

    return { reload, setReload };
}
