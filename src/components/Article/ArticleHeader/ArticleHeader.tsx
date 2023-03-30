import { Tag } from 'antd';
import { v1 as uuidv1 } from 'uuid';
import format from 'date-fns/format';

import type { IArticleCard } from '../../../type';
import Author from '../../Author';
import './ArticleHeader.scss';
import ArticleBtns from '../ArticleBtns';
import Likes from '../../Likes';

interface IArticleHeader {
    data: Omit<Omit<IArticleCard, 'favoritesCount'>, 'favorited'>;
    slug: string;
    inx?: number;
}

export default function ArticleHeader({ data, slug, inx }: IArticleHeader) {
    const { title, tagList, createdAt, description, author } = data;
    const isPage = inx === undefined;
    const className = ['article__header'];

    let maxTag = 11;
    let shortTitle: string | null = null;
    let shortDescription: string | null = null;
    if (!isPage) {
        className.push('article__header--preview');
        maxTag = 4;
        shortTitle = checkLength(title, 20);
        shortDescription = checkLength(title, 100);
    }

    const tags = tagList.slice(0, maxTag).map((tag) => {
        return <Tag key={uuidv1()}>{isPage ? checkLength(tag, 30) : checkLength(tag, 10)}</Tag>;
    });

    const date = format(new Date(createdAt), 'PPP');

    return (
        <header className={className.join(' ')}>
            <div>
                <div className='article__titleWrap'>
                    <h5>{shortTitle || title}</h5>
                    <Likes slug={slug} inx={inx} />
                </div>
                <div className='article__tags'>
                    {tags}
                    {tagList.length > 5 && <span>...</span>}
                </div>
                <p className='article__description'>{shortDescription || description}</p>
            </div>
            <div>
                <Author data={author}>
                    <span>{date}</span>
                </Author>
                {isPage && <ArticleBtns author={author.username} />}
            </div>
        </header>
    );
}

function checkLength(text: string, desiredLength: number) {
    return text.length > desiredLength ? `${text.slice(0, desiredLength)}...` : text;
}
