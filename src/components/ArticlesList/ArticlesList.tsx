import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { v1 as uuidv1 } from 'uuid';

import type { alertMessageKeysType, IArticle } from '../../type';
import './ArticlesList.scss';
import ArticleCard from '../Article/ArticleCard';
import Alert from '../Alert';
import getErrorMessage from '../../utils/hooks/getErrorMessage';
import { alertMessage } from '../../utils/helpers/alert.helpers';
import useSideContents from '../../utils/hooks/useSideContent';

import useArticlesList from './useArticlesList';

interface IArticlesList {
    page: number;
    pageSize: number;
}

interface IData {
    cutArticles?: IArticle[];
    startInx?: number;
    hasError?: alertMessageKeysType;
}

export default function ArticlesList({ page, pageSize }: IArticlesList) {
    const history = useHistory();

    const data: IData | null = useArticlesList(page, pageSize);

    const sideContent = useSideContents({
        error: {
            hasError: data?.hasError,
            props: () =>
                getErrorMessage(data?.hasError, [
                    ['serverError', alertMessage.serverError, 'warning'],
                    ['notFoundError', alertMessage.notFoundError.listOfArticles, 'warning'],
                ]),
        },
        other: [
            {
                check: !!(data?.cutArticles?.length === 0),
                component: <Alert message={alertMessage.notFoundError.listOfArticles} type='warning' />,
            },
        ],
    });
    if (sideContent) return sideContent;

    if (!data) return null;

    const onClick = (slug: string) => {
        history.push(`articles/${slug}`);
    };

    const articlesItems = data.cutArticles?.map(({ slug, ...article }, inx) => {
        let { createdAt, favoritesCount, favorited } = article;
        createdAt = format(new Date(createdAt), 'PP');
        return (
            <li key={uuidv1()}>
                <div role='presentation' onClick={() => onClick(slug)}>
                    <ArticleCard
                        data={{ ...article, createdAt }}
                        slug={slug}
                        favoritesCount={favoritesCount}
                        favorited={favorited}
                        inx={(data.startInx as number) + inx}
                    />
                </div>
            </li>
        );
    });

    return <ul className='articlesList'>{articlesItems}</ul>;
}
