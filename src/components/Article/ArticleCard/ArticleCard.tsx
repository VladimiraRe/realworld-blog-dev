import type { IArticleCard } from '../../../type';
import './ArticleCard.scss';
import ArticleHeader from '../ArticleHeader';

interface IArticle {
    children?: JSX.Element;
    data: Omit<Omit<IArticleCard, 'favoritesCount'>, 'favorited'>;
    slug: string;
    favoritesCount: number;
    favorited: boolean;
    inx?: number;
}

export default function ArticleCard({ children, data, slug, favoritesCount, favorited, inx }: IArticle) {
    const className = ['article'];
    if (!children) className.push('article--preview');

    return (
        <article className={className.join(' ')}>
            <ArticleHeader data={data} slug={slug} favoritesCount={favoritesCount} favorited={favorited} inx={inx} />
            {children}
        </article>
    );
}
