import type { IArticleCard } from '../../../type';
import './ArticleCard.scss';
import ArticleHeader from '../ArticleHeader';

interface IArticle {
    children?: JSX.Element;
    data: IArticleCard;
}

export default function ArticleCard({ children, data }: IArticle) {
    const { description, ...props } = data;
    const className = ['article'];
    if (!children) className.push('article--preview');

    return (
        <article className={className.join(' ')}>
            <ArticleHeader data={props} isPage={!!children} />
            <p className='article__description'>{description}</p>
            {children}
        </article>
    );
}
