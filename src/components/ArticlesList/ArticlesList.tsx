import { useHistory } from 'react-router-dom';
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

interface IData {
    cutArticles: IArticle[];
    startInx: number;
}

export default function ArticlesList({ page, pageSize }: IArticlesList) {
    const history = useHistory();

    const data: IData | null | alertMessageKeysType = useArticlesList(page, pageSize);

    if (!data) return null;

    if (typeof data === 'string') {
        const err = getErrorMessage(data, [
            ['serverError', alertMessage.serverError],
            ['notFoundError', alertMessage.notFoundError.listOfArticles],
        ]);
        return <Alert message={err.text} type='warning' />;
    }

    const { cutArticles, startInx } = data;

    if (cutArticles.length === 0)
        return <Alert message={alertMessageObj.notFoundError.listOfArticles} type='warning' />;

    const onClick = (slug: string) => {
        history.push(`articles/${slug}`);
    };

    const articlesItems = cutArticles.map(({ slug, ...article }, inx) => {
        let { createdAt } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <div role='presentation' onClick={() => onClick(slug)}>
                    <ArticleCard data={{ ...article, createdAt }} slug={slug} inx={startInx + inx} />
                </div>
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
