import { useHistory } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import ArticleCard from '../ArticleCard';
import './FullArticle.scss';
import useArticle from '../../../utils/hooks/useArticle';

export default function FullArticle() {
    const history = useHistory();
    const linkSlug = history.location.pathname.split('/').at(-1) as string;

    const { article, side } = useArticle(linkSlug);

    if (side) return side;

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
