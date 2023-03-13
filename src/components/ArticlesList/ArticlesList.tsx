import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v1 as uuidv1 } from 'uuid';

import type { IArticle } from '../../type';
import './ArticlesList.scss';
import ArticleCard from '../Article/ArticleCard';
import Error, { errorMessage as errorMessageObj, getErrorMessage } from '../Error';
import type { errorMessageKeysType } from '../Error';

import useArticlesList from './useArticlesList';

interface IArticlesList {
    page: number;
    pageSize: number;
}

export default function ArticlesList({ page, pageSize }: IArticlesList) {
    const data: IArticle[] | errorMessageKeysType | null = useArticlesList(page, pageSize);

    if (!data) return null;

    if (typeof data === 'string') {
        const message = getErrorMessage(data, 'listOfArticles');
        return <Error message={message as string} type='warning' />;
    }

    if (data.length === 0) return <Error message={errorMessageObj.notFoundError.listOfArticles} type='warning' />;

    const articlesItems = data.map(({ slug, ...article }) => {
        let { createdAt } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <Link to={(location) => `${location.pathname}/${article.author.username}/${slug}`}>
                    <ArticleCard data={{ ...article, createdAt }} />
                </Link>
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
