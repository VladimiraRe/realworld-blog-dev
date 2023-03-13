import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import type { storeType, appDispatch } from '../../../type';
import { getArticle } from '../../../store/requests/action';
import ArticleCard from '../ArticleCard';
import Loading from '../../Loading';
import Error, { errorMessage, errorType, getErrorMessage } from '../../Error';
import './FullArticle.scss';

export default function FullArticle() {
    const { article, hasError } = useSelector((state: storeType) => state.article);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        const linkSlug = history.location.pathname.split('/').at(-1) as string;
        if (!article || (Object.keys(article).length !== 0 && article.slug !== linkSlug))
            dispatch(getArticle(linkSlug));
    }, [article, dispatch, history]);

    if (hasError) {
        const message = getErrorMessage(hasError, 'article');
        return <Error message={message as string} type='warning' />;
    }

    if (isLoading) return <Loading />;

    if (!article) return null;

    if (Object.keys(article).length === 0)
        return <Error message={errorMessage.notFoundError.article} type={errorType.warning} />;

    const { body, ...data } = article;

    return (
        <ArticleCard data={data}>
            <ReactMarkdown className='article__body' remarkPlugins={[remarkGfm]}>
                {body}
            </ReactMarkdown>
        </ArticleCard>
    );
}
