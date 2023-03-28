import type { IListOfArticles, IStateArticle, IArticle } from '../../../type';

interface INewListOfArticles extends Partial<IListOfArticles> {
    article?: IArticle;
    index?: number;
}

export const setListOfArticles = (listOfArticles: INewListOfArticles) => ({
    type: 'SET_LIST_OF_ARTICLES' as const,
    listOfArticles,
});

export const setArticle = (articleData: Partial<IStateArticle>) => {
    return {
        type: 'SET_ARTICLE' as const,
        articleData,
    };
};
