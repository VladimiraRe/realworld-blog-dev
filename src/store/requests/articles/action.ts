import type { IListOfArticles, IArticle, appDispatch } from '../../../type';
import api from '../../../api/realWorldApi';
import { setIsLoading } from '../action';
import setError from '../../errors/action';
import { NotFoundError } from '../../../errors/customErrors';

export const setListOfArticles = (listOfArticles: IListOfArticles) => ({
    type: 'SET_LIST_OF_ARTICLES' as const,
    listOfArticles,
});

export const setArticle = (article: IArticle) => ({
    type: 'SET_ARTICLE' as const,
    article,
});

export const getListOfArticles = (offset?: number) => async (dispatch: appDispatch) => {
    dispatch(setIsLoading(true));

    try {
        const articles = await api.getListOfArticles(offset);
        dispatch(setListOfArticles(articles));
    } catch {
        dispatch(setError('fetchArticleError'));
    } finally {
        dispatch(setIsLoading(false));
    }
};

export const getArticle = (slug: string) => async (dispatch: appDispatch) => {
    dispatch(setIsLoading(true));

    try {
        const article = await api.getArticle(slug);
        dispatch(setArticle(article));
    } catch (err) {
        if (err instanceof NotFoundError) {
            dispatch(setArticle({} as IArticle));
        } else {
            dispatch(setError('fetchArticleError'));
        }
    } finally {
        dispatch(setIsLoading(false));
    }
};
