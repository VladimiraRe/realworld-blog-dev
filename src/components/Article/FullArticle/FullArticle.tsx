import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ArticleCard from '../ArticleCard';
import './FullArticle.scss';
import useArticle from '../../../utils/hooks/useArticle';
import getErrorMessage from '../../../utils/hooks/getErrorMessage';
import Alert from '../../Alert';
import type { storeType } from '../../../type';
import useSideContents from '../../../utils/hooks/useSideContent';
import { alertMessage, alertType } from '../../../utils/helpers/alert.helpers';
import useReload from '../../../utils/hooks/useReload';

export default function FullArticle() {
    const { hasError } = useSelector((state: storeType) => state.article);
    const history = useHistory();
    const linkSlug = history.location.pathname
        .split('/')
        .filter((el) => el !== '')
        .at(-1) as string;

    const { reload } = useReload();

    const article = useArticle(linkSlug);

    const sideContent = useSideContents({
        error: {
            hasError,
            props: () =>
                getErrorMessage(hasError, [
                    ['serverError', alertMessage.serverError],
                    ['notFoundError', alertMessage.notFoundError.article],
                ]),
        },
        other: [
            {
                check: reload === 'done',
                component: <Alert message='deleting an article' type='success' />,
                priority: 'notFoundError',
            },
            {
                check: !article || Object.keys(article).length === 0,
                component: <Alert message={alertMessage.notFoundError.article} type={alertType.warning} />,
            },
        ],
    });
    if (sideContent) return sideContent;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { body, title, tagList, createdAt, description, author, favoritesCount, favorited } = article!;
    const text = body ? body.replace(/\\n/gi, '\n &nbsp;') : '';

    return (
        <ArticleCard
            data={{ title, tagList, createdAt, description, author }}
            slug={linkSlug}
            favoritesCount={favoritesCount}
            favorited={favorited}
        >
            <ReactMarkdown className='article__body' remarkPlugins={[remarkGfm]}>
                {text}
            </ReactMarkdown>
        </ArticleCard>
    );
}
