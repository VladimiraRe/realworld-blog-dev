import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { appDispatch, storeType } from '../../type';
import { getArticle, setArticle, setIsLoading } from '../../store/action';

export default function useArticle(linkSlug: string) {
    const { article, hasError, isDeleted } = useSelector((state: storeType) => state.article);
    const token = useSelector((state: storeType) => state.user.loggedIn?.token);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    useLayoutEffect(() => {
        const isNeedReloading = sessionStorage.getItem('isNeedReloading');
        if (isNeedReloading) {
            sessionStorage.removeItem('isNeedReloading');
            window.location.reload();
        }
        if (
            !isNeedReloading &&
            !hasError &&
            !isDeleted &&
            (!article || (Object.keys(article).length !== 0 && article.slug !== linkSlug))
        )
            dispatch(getArticle(linkSlug, token));
        return () => {
            if (isLoading) dispatch(setIsLoading(false));
            if (hasError) dispatch(setArticle({ hasError: null }));
            if (isDeleted) dispatch(setArticle({ isDeleted: false }));
        };
    }, [article, dispatch, linkSlug, isLoading, hasError, isDeleted, token]);

    return article;
}
