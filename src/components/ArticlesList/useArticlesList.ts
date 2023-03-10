import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getListOfArticles } from '../../store/requests/action';
import type { storeType, appDispatch } from '../../type';

export default function useArticlesList(page: number, pageSize: number) {
    const LIMIT = 25;

    const { articles, offset } = useSelector((state: storeType) => state.listOfArticles);
    const dispatch: appDispatch = useDispatch();

    useEffect(() => {
        checkData(page, pageSize, LIMIT, offset, dispatch);
    }, [page, pageSize, LIMIT, offset, dispatch]);

    if (offset === null) return null;

    const startInx = page * pageSize - offset - pageSize;
    const data = articles.slice(startInx, startInx + pageSize);
    return data;
}

function checkData(newPage: number, pageSize: number, limit: number, offset: number | null, dispatch: appDispatch) {
    const pagesInRequest = limit / pageSize;
    const newOffset = (Math.ceil(newPage / pagesInRequest) - 1) * limit;

    if (newOffset !== offset) dispatch(getListOfArticles(newOffset));
}
