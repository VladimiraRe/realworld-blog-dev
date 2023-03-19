import type { ActionCreator } from 'redux';
import { bindActionCreators } from 'redux';

import type { IListOfArticles, IStateArticle, appDispatch } from '../../../type';
import api from '../../../api/realWorldApi';
import { setIsLoading } from '../action';
import { NotFoundError, ServerError } from '../../../errors/customErrors';

export const setListOfArticles = (listOfArticles: IListOfArticles) => ({
    type: 'SET_LIST_OF_ARTICLES' as const,
    listOfArticles,
});

export const setArticle = (articleData: IStateArticle) => ({
    type: 'SET_ARTICLE' as const,
    articleData,
});

export const getListOfArticles = (offset?: number) => async (dispatch: appDispatch) => {
    await getData(() => api.getListOfArticles(offset), dispatch, setListOfArticles);
};

export const getArticle = (slug: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getArticle(slug), dispatch, setArticle);
};

async function getData(fetch: () => Promise<unknown>, dispatch: appDispatch, setData: ActionCreator<unknown>) {
    const dispatchAction = bindActionCreators({ setData, setIsLoading }, dispatch);
    dispatchAction.setIsLoading(true);

    try {
        const data = await fetch();
        dispatchAction.setData(data);
    } catch (err) {
        if (err instanceof NotFoundError) {
            dispatchAction.setData({ hasError: 'notFoundError' });
        } else {
            dispatchAction.setData({ hasError: err instanceof ServerError ? 'serverError' : 'fetchError' });
        }
    } finally {
        dispatch(setIsLoading(false));
    }
}
