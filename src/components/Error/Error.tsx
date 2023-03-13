import { Alert } from 'antd';

export const errorMessage = {
    notFoundError: {
        article: 'Article not found',
        listOfArticles: 'Nothing found for your request',
        page: 'This page does not exist',
    },
    serverError: 'Our server is down, please try again later',
    fetchError: 'An error occurred, please contact support',
} as const;

export const errorType = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
} as const;

export type errorMessageKeysType = keyof typeof errorMessage;

interface IError {
    message: string;
    type: (typeof errorType)[keyof typeof errorType];
    closable?: boolean;
}

export default function Error({ message, type, closable }: IError) {
    return <Alert message={message} type={type} className='Error' closable={!!closable} />;
}
