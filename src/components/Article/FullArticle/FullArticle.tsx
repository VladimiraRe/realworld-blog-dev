import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ArticleCard from '../ArticleCard';
import './FullArticle.scss';
import useArticle from '../../../utils/hooks/useArticle';
import getErrorMessage from '../../../utils/hooks/getErrorMessage';
import Alert, { alertMessage, alertType } from '../../Alert';
import type { storeType } from '../../../type';
import useSideContents from '../../../utils/hooks/useSideContent';
import Container from '../../../containers/Container';

export default function FullArticle() {
    const { hasError } = useSelector((state: storeType) => state.article);
    const history = useHistory();
    const linkSlug = history.location.pathname
        .split('/')
        .filter((el) => el !== '')
        .at(-1) as string;

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
                check: !article || Object.keys(article).length === 0,
                component: <Alert message={alertMessage.notFoundError.article} type={alertType.warning} />,
            },
        ],
    });
    if (sideContent) return <Container component={sideContent} />;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { body, ...data } = article!;
    const text = body ? body.replace(/\\n/gi, '\n &nbsp;') : '';

    return (
        <ArticleCard data={data}>
            <ReactMarkdown className='article__body' remarkPlugins={[remarkGfm]}>
                {text}
            </ReactMarkdown>
        </ArticleCard>
    );
}
