import type { actionsType, IArticles } from '../../../type';

// eslint-disable-next-line import/prefer-default-export
export function articles(state: IArticles = { articles: [], articlesCount: 0, offset: 0 }, action: actionsType) {
    switch (action.type) {
        case 'SET_ARTICLES':
            return action.articles;
        default:
            return state;
    }
}
