import type { IArticles, appDispatch } from '../../../type';
import api from '../../../api/realWorldApi';
import { setIsLoading } from '../action';
import setError from '../../errors/action';

export const setArticles = (articles: IArticles) => ({
    type: 'SET_ARTICLES' as const,
    articles,
});

export const getArticles = (offset?: number) => async (dispatch: appDispatch) => {
    dispatch(setIsLoading(true));

    try {
        const articles = await api.getArticles(offset);
        dispatch(setArticles(articles));
    } catch {
        dispatch(setError('fetchArticleError'));
    } finally {
        dispatch(setIsLoading(false));
    }
};
