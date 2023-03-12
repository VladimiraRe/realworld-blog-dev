import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { v1 as uuidv1 } from 'uuid';

import type { IArticle } from '../../type';
import './ArticlesList.scss';
import ArticleCard from '../Article/ArticleCard';

import useArticlesList from './useArticlesList';

interface IArticlesList {
    page: number;
    pageSize: number;
}

export default function ArticlesList({ page, pageSize }: IArticlesList) {
    const data: IArticle[] | null = useArticlesList(page, pageSize);

    if (!data) return null;

    const articlesItems = data.map(({ slug, ...article }) => {
        let { createdAt } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <Link to={`${article.author.username}/${slug}`}>
                    <ArticleCard data={{ ...article, createdAt }} />
                </Link>
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
