import type { IArticleCard } from '../../../type';
import './ArticleCard.scss';
import ArticleHeader from '../ArticleHeader';

interface IArticle {
    children?: JSX.Element;
    data: IArticleCard;
}

export default function ArticleCard({ children, data }: IArticle) {
    const className = ['article'];
    if (!children) className.push('article--preview');

    return (
        <article className={className.join(' ')}>
            <ArticleHeader data={data} isPage={!!children} />
            {children}
        </article>
    );
}
