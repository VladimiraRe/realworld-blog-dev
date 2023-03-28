import type { ReactNode } from 'react';
import { Alert as AlertAntd } from 'antd';

import './Alert.scss';
import type { alertType } from '../../utils/helpers/alert.helpers';

interface IAlert {
    message: string;
    type: (typeof alertType)[keyof typeof alertType];
    closable?: boolean;
    action?: ReactNode;
}

export default function Alert({ message, type, closable, action }: IAlert) {
    const className = ['alert'];
    let showIcon = true;
    if (action) {
        className.push('alert--action');
        showIcon = false;
    }

    return (
        <AlertAntd
            className={className.join(' ')}
            message={message}
            type={type}
            closable={!!closable}
            action={action}
            showIcon={showIcon}
        />
    );
}
