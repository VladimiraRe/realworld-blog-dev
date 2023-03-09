import type { IArticleCard } from '../../type';

import ArticleHeader from './ArticleHeader';
import './Article.scss';

interface IArticle {
    children?: JSX.Element;
    data: IArticleCard;
}

export default function Article({ children, data }: IArticle) {
    const { description, ...props } = data;

    const className = ['article'];
    if (!children) className.push('article--clickable');

    return (
        <article className={className.join(' ')}>
            <ArticleHeader data={props} isPage={!!children} />
            <p className='article__description'>{description}</p>
            {children}
        </article>
    );
}
