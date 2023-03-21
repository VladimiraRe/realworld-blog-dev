import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { appDispatch, IArticle, storeType } from '../../type';
import Alert, { alertMessage, alertType } from '../../components/Alert';
import Loading from '../../components/Loading';
import { getArticle, setArticle, setIsLoading } from '../../store/requests/action';

import getErrorMessage from './getErrorMessage';

interface IContent {
    article: IArticle | null;
    side: JSX.Element | null;
}

export default function useArticle(linkSlug: string) {
    const { article, hasError } = useSelector((state: storeType) => state.article);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    useEffect(() => {
        if (!hasError && (!article || (Object.keys(article).length !== 0 && article.slug !== linkSlug)))
            dispatch(getArticle(linkSlug));
        return () => {
            if (isLoading) dispatch(setIsLoading(false));
            if (hasError) dispatch(setArticle({ hasError: null }));
        };
    }, [article, dispatch, linkSlug, isLoading, hasError]);

    const content: IContent = { article: null, side: null };

    if (hasError) {
        const { text } = getErrorMessage(hasError, [
            ['serverError', alertMessage.serverError],
            ['notFoundError', alertMessage.notFoundError.article],
        ]);
        return { ...content, side: <Alert message={text as string} type='warning' /> };
    }

    if (isLoading) return { ...content, side: <Loading /> };

    if (!article || Object.keys(article).length === 0)
        return { ...content, side: <Alert message={alertMessage.notFoundError.article} type={alertType.warning} /> };

    return { ...content, article } as { article: IArticle; side: null };
}
