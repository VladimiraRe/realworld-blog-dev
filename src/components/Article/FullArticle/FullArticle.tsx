import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import type { storeType, appDispatch } from '../../../type';
import { getArticle, setArticle, setIsLoading } from '../../../store/requests/action';
import ArticleCard from '../ArticleCard';
import Loading from '../../Loading';
import Error, { alertMessage, alertType, getAlertMessage } from '../../Alert';
import './FullArticle.scss';

export default function FullArticle() {
    const { article, hasError } = useSelector((state: storeType) => state.article);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        const linkSlug = history.location.pathname.split('/').at(-1) as string;
        if (!hasError && (!article || (Object.keys(article).length !== 0 && article.slug !== linkSlug)))
            dispatch(getArticle(linkSlug));
        return () => {
            if (isLoading) dispatch(setIsLoading(false));
            if (hasError) dispatch(setArticle({ hasError: null }));
        };
    }, [article, dispatch, history, isLoading, hasError]);

    if (hasError) {
        const message = getAlertMessage(hasError, 'article');
        return <Error message={message as string} type='warning' />;
    }

    if (isLoading) return <Loading />;

    if (!article) return null;

    if (Object.keys(article).length === 0)
        return <Error message={alertMessage.notFoundError.article} type={alertType.warning} />;

    const { body, ...data } = article;
    const text = body ? body.replace(/\\n/gi, '\n &nbsp;') : '';

    return (
        <ArticleCard data={data}>
            <ReactMarkdown className='article__body' remarkPlugins={[remarkGfm]}>
                {text}
            </ReactMarkdown>
        </ArticleCard>
    );
}
