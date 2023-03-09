import { format } from 'date-fns';
import { v1 as uuidv1 } from 'uuid';

import type { IArticle } from '../../type';
import './ArticlesList.scss';
import Article from '../Article';

interface IArticlesList {
    data?: IArticle[];
}

export default function ArticlesList({ data }: IArticlesList) {
    if (!data) return null;

    const articlesItems = data.map((article) => {
        let { createdAt } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <Article data={{ ...article, createdAt }} />
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
