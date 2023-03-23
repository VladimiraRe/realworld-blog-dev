import type { IArticleCard } from '../../../type';
import './ArticleCard.scss';
import ArticleHeader from '../ArticleHeader';

interface IArticle {
    children?: JSX.Element;
    data: Omit<Omit<IArticleCard, 'favoritesCount'>, 'favorited'>;
    slug: string;
    inx?: number;
}

export default function ArticleCard({ children, data, slug, inx }: IArticle) {
    const className = ['article'];
    if (!children) className.push('article--preview');

    return (
        <article className={className.join(' ')}>
            <ArticleHeader data={data} isPage={!!children} slug={slug} inx={inx} />
            {children}
        </article>
    );
}
