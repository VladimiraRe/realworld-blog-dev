import type { actionsType, IArticle, IListOfArticles, IStateArticle } from '../../../type';

const initialListOfArticles = { articles: null, articlesCount: null, offset: null, hasError: null };
const initialArticle = { article: null, hasError: null, isDeleted: false };

export function listOfArticles(state: IListOfArticles = initialListOfArticles, action: actionsType): IListOfArticles {
    switch (action.type) {
        case 'SET_LIST_OF_ARTICLES': {
            const { listOfArticles: data } = action;
            if (data.index !== undefined && data.article && state.articles) {
                const articles = state.articles.map((el, inx) =>
                    inx === data.index ? { ...data.article } : el
                ) as IArticle[];
                return { ...state, articles };
            }
            return data.hasError ? { ...initialListOfArticles, hasError: data.hasError } : (data as IListOfArticles);
        }
        default:
            return state;
    }
}

export function article(state: IStateArticle = initialArticle, action: actionsType) {
    switch (action.type) {
        case 'SET_ARTICLE': {
            const { articleData: data } = action;
            if (data.hasError) return { ...initialArticle, hasError: data.hasError };
            if (data.article) {
                const { article: receivedArticle, ...other } = data;
                const { favorited, favoritesCount, tagList, ...partOfReceivedArticle } = receivedArticle;
                return {
                    ...initialArticle,
                    article: { favorited, favoritesCount, tagList: [...tagList], ...partOfReceivedArticle },
                    ...other,
                };
            }
            return { ...state, ...data };
        }
        default:
            return state;
    }
}
