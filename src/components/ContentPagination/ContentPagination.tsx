import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';

import { getArticles } from '../../store/requests/action';
import type { storeType, appDispatch, IArticle } from '../../type';
import './ContentPagination.scss';
import Loading from '../Loading';

interface IPagination {
    pageSize: number;
    children: JSX.Element;
}

export default function ContentPagination({ pageSize, children }: IPagination) {
    const LIMIT = 25;

    const { articles, articlesCount, offset } = useSelector((state: storeType) => state.articles);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    const routerHistory = useHistory();
    const linkPage = routerHistory.location.pathname.split('/').at(-1);

    const [startPage, setStartPage] = useState(Number(linkPage) || 1);

    useEffect(() => {
        checkData(startPage, pageSize, LIMIT, offset, dispatch);
    }, [startPage, pageSize, LIMIT, offset, dispatch]);

    if (isLoading) return <Loading />;

    const onChange = (newStartPage: number) => {
        routerHistory.push(String(newStartPage));
        setStartPage(newStartPage);
    };

    const currentFetchPage = startPage - offset / pageSize;
    const content = createContent<IArticle>(articles, children, (currentFetchPage - 1) * pageSize, pageSize);

    return (
        <>
            {content}
            <Pagination
                className='contentPagination'
                current={startPage}
                pageSize={pageSize}
                total={Math.ceil(articlesCount / pageSize)}
                onChange={(page) => onChange(page)}
                showLessItems
                hideOnSinglePage
                showSizeChanger={false}
            />
        </>
    );
}

function createContent<T>(data: T[], content: JSX.Element, startInx: number, pageSize: number) {
    const visible = data.slice(startInx, startInx + pageSize);
    return React.cloneElement(content, { data: visible });
}

function checkData(newStartPage: number, pageSize: number, limit: number, offset: number, dispatch: appDispatch) {
    const pagesInRequest = limit / pageSize;
    const newOffset = (Math.ceil(newStartPage / pagesInRequest) - 1) * limit;
    if (newOffset !== offset) dispatch(getArticles(newOffset));
}
