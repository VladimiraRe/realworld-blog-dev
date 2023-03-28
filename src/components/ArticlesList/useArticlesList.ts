import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getListOfArticles } from '../../store/action';
import type { storeType, appDispatch, alertMessageKeysType } from '../../type';

export default function useArticlesList(page: number, pageSize: number) {
    const LIMIT = 25;

    const { articles, offset, hasError } = useSelector((state: storeType) => state.listOfArticles);
    const token = useSelector((state: storeType) => state.user.loggedIn?.token);
    const dispatch: appDispatch = useDispatch();

    useEffect(() => {
        if (hasError) return;
        checkData(page, pageSize, LIMIT, offset, dispatch, token);
    }, [page, pageSize, LIMIT, offset, dispatch, hasError, token]);

    if (hasError) return hasError as alertMessageKeysType;

    if (offset === null || articles === null) return null;

    const startInx = page * pageSize - offset - pageSize;
    const cutArticles = articles.slice(startInx, startInx + pageSize);
    return { cutArticles, startInx };
}

function checkData(
    newPage: number,
    pageSize: number,
    limit: number,
    offset: number | null,
    dispatch: appDispatch,
    token?: string
) {
    const pagesInRequest = limit / pageSize;
    const newOffset = (Math.ceil(newPage / pagesInRequest) - 1) * limit;

    if (newOffset !== offset) dispatch(getListOfArticles(newOffset, token));
}
