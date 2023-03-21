import type { ActionCreator } from 'redux';
import { bindActionCreators } from 'redux';

import type { IListOfArticles, IStateArticle, appDispatch, INewArticle } from '../../../type';
import api from '../../../api/realWorldApi';
import { setIsLoading } from '../action';
import type { FetchError } from '../../../errors/customErrors';
import { NotFoundError, ServerError, UnauthorizedError } from '../../../errors/customErrors';

export const setListOfArticles = (listOfArticles: IListOfArticles) => ({
    type: 'SET_LIST_OF_ARTICLES' as const,
    listOfArticles,
});

export const setArticle = (articleData: Partial<IStateArticle>) => ({
    type: 'SET_ARTICLE' as const,
    articleData,
});

export const getListOfArticles = (offset?: number) => async (dispatch: appDispatch) => {
    await getData(() => api.getListOfArticles(offset), dispatch, setListOfArticles);
};

export const getArticle = (slug: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getArticle(slug), dispatch, setArticle);
};

export const createArtile = (articleData: INewArticle, token: string) => async (dispatch: appDispatch) => {
    await postData(
        () => api.createArtile(articleData, token),
        dispatch,
        (data) => setArticle({ article: { ...data }, isCreated: true })
    );
};

async function postData(fetch: () => Promise<unknown>, dispatch: appDispatch, setData: ActionCreator<unknown>) {
    await fetchData(fetch, dispatch, setData, [{ error: UnauthorizedError, message: 'unauthorizedError' }]);
}

async function getData(fetch: () => Promise<unknown>, dispatch: appDispatch, setData: ActionCreator<unknown>) {
    await fetchData(fetch, dispatch, setData, [{ error: NotFoundError, message: 'notFoundError' }]);
}

async function fetchData(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    setData: ActionCreator<unknown>,
    errors: { error: typeof FetchError; message: string }[]
) {
    const dispatchAction = bindActionCreators({ setData, setIsLoading }, dispatch);
    dispatchAction.setIsLoading(true);

    try {
        const data = await fetch();
        dispatchAction.setData(data);
    } catch (err) {
        let isFindErr = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const { error, message } of errors) {
            if (err instanceof error) {
                dispatchAction.setData({ hasError: message });
                isFindErr = true;
            }
        }
        if (!isFindErr) dispatchAction.setData({ hasError: err instanceof ServerError ? 'serverError' : 'fetchError' });
    } finally {
        dispatch(setIsLoading(false));
    }
}
