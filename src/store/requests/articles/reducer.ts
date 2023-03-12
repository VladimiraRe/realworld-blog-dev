import type { actionsType, IListOfArticles, IArticle } from '../../../type';

const initial = { articles: null, articlesCount: null, offset: null };

export function listOfArticles(state: IListOfArticles | typeof initial = initial, action: actionsType) {
    switch (action.type) {
        case 'SET_LIST_OF_ARTICLES':
            return action.listOfArticles;
        default:
            return state;
    }
}

export function article(state: IArticle | null = null, action: actionsType) {
    switch (action.type) {
        case 'SET_ARTICLE':
            return action.article;
        default:
            return state;
    }
}
