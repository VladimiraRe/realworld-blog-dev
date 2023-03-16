import type { ReactNode } from 'react';
import { Alert as AlertAntd } from 'antd';

import './Alert.scss';

export const alertMessage = {
    notFoundError: {
        article: 'Article not found',
        listOfArticles: 'Nothing found for your request',
        page: 'This page does not exist',
    },
    serverError: 'Our server is down, please try again later',
    fetchError: 'An error occurred, please contact support',
    successful: (action: string) => `${action} completed successfully!`,
} as const;

export const alertType = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
} as const;

export type alertMessageKeysType = keyof typeof alertMessage;

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
