import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Pagination } from 'antd';

import './ContentPagination.scss';

interface IPagination {
    pageSize: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: (props: any) => JSX.Element | null;
    itemsCount: number | null;
    baseLink?: string;
}

export default function ContentPagination({ pageSize, content: Content, itemsCount, baseLink }: IPagination) {
    const PAGE_PART_OF_LINK = '?page=';

    const routerHistory = useHistory();
    const linkPage = getPageFromLink(routerHistory.location.search);

    const [page, setPage] = useState(linkPage || 1);

    const onChange = (newPage: number) => {
        const stringNewPage = String(newPage);
        routerHistory.push(
            baseLink
                ? checkLink(routerHistory.location.pathname, stringNewPage, baseLink, PAGE_PART_OF_LINK)
                : stringNewPage
        );
        setPage(newPage);
    };

    return (
        <>
            <Content page={page} pageSize={pageSize} />
            {itemsCount !== null && (
                <Pagination
                    className='contentPagination'
                    current={page}
                    pageSize={pageSize}
                    total={Math.ceil(itemsCount / pageSize)}
                    onChange={(newPage) => onChange(newPage)}
                    showLessItems
                    hideOnSinglePage
                    showSizeChanger={false}
                />
            )}
        </>
    );
}

function getPageFromLink(path: string | undefined) {
    if (!path) return null;
    const linkPage = path.match(/\d+/);
    if (!linkPage) return null;
    return Number(linkPage.join(''));
}

function checkLink(pathname: string, page: string, baseLink: string, pageLink: string) {
    const pathArr = pathname.split('/');
    if (pathArr.find((el) => el === baseLink))
        if (pathArr.find((el) => el === '?page=')) return page;
        else return pageLink + page;
    return baseLink + pageLink + page;
}
