import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { appDispatch, storeType } from '../../type';
import { getArticle, setArticle, setIsLoading } from '../../store/action';

export default function useArticle(linkSlug: string) {
    const { article, hasError } = useSelector((state: storeType) => state.article);
    const { token } = useSelector((state: storeType) => state.user.loggedIn || { token: undefined });
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    useLayoutEffect(() => {
        if (!hasError && (!article || (Object.keys(article).length !== 0 && article.slug !== linkSlug)))
            dispatch(getArticle(linkSlug, token));
        return () => {
            if (isLoading) dispatch(setIsLoading(false));
            if (hasError) dispatch(setArticle({ hasError: null }));
        };
    }, [article, dispatch, linkSlug, isLoading, hasError, token]);

    return article;
}
