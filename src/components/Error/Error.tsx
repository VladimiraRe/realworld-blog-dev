import { Alert } from 'antd';

import type { inferValuesType } from '../../type';

export const errorMessage = {
    notFound: {
        article: 'Article not found',
        page: 'This page does not exist',
    },
} as const;

export const errorType = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
} as const;

interface IError {
    message: inferValuesType<typeof errorMessage.notFound>;
    type: (typeof errorType)[keyof typeof errorType];
    closable?: boolean;
}

export default function Error({ message, type, closable }: IError) {
    return <Alert message={message} type={type} className='Error' closable={!!closable} />;
}
