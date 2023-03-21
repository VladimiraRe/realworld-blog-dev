import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v1 as uuidv1 } from 'uuid';

import type { IArticle } from '../../type';
import type { alertMessageKeysType } from '../Alert';
import './ArticlesList.scss';
import ArticleCard from '../Article/ArticleCard';
import Alert, { alertMessage, alertMessage as alertMessageObj } from '../Alert';
import getErrorMessage from '../../utils/hooks/getErrorMessage';

import useArticlesList from './useArticlesList';

interface IArticlesList {
    page: number;
    pageSize: number;
}

export default function ArticlesList({ page, pageSize }: IArticlesList) {
    const data: IArticle[] | alertMessageKeysType | null = useArticlesList(page, pageSize);

    if (!data) return null;

    if (typeof data === 'string') {
        const { text } = getErrorMessage(data, [
            ['serverError', alertMessage.serverError],
            ['notFoundError', alertMessage.notFoundError.listOfArticles],
        ]);
        return <Alert message={text} type='warning' />;
    }

    if (data.length === 0) return <Alert message={alertMessageObj.notFoundError.listOfArticles} type='warning' />;

    const articlesItems = data.map(({ slug, ...article }) => {
        let { createdAt } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <Link to={({ pathname }) => `${pathname === '/articles' ? pathname : '/articles'}/${slug}`}>
                    <ArticleCard data={{ ...article, createdAt }} />
                </Link>
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
