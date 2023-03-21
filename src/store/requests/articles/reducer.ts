import type { actionsType, IListOfArticles, IStateArticle } from '../../../type';

const initialListOfArticles = { articles: null, articlesCount: null, offset: null, hasError: null };
const initialArticle = { article: null, hasError: null, isChanged: false, isCreated: false };

export function listOfArticles(state: IListOfArticles = initialListOfArticles, action: actionsType) {
    switch (action.type) {
        case 'SET_LIST_OF_ARTICLES': {
            const { listOfArticles: data } = action;
            return data.hasError ? { ...initialListOfArticles, hasError: data.hasError } : data;
        }
        default:
            return state;
    }
}

export function article(state: IStateArticle = initialArticle, action: actionsType) {
    switch (action.type) {
        case 'SET_ARTICLE': {
            const { articleData: data } = action;
            return data.hasError ? { ...initialArticle, hasError: data.hasError } : { ...state, ...data };
        }
        default:
            return state;
    }
}
