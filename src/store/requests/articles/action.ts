import type { ActionCreator } from 'redux';
import { bindActionCreators } from 'redux';

import type { IListOfArticles, IStateArticle, appDispatch, INewArticle, IArticle } from '../../../type';
import api from '../../../api/realWorldApi';
import { setIsLoading } from '../action';
import type { FetchError } from '../../../errors/customErrors';
import { NotFoundError, ServerError, UnauthorizedError } from '../../../errors/customErrors';

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

export const getListOfArticles = (offset?: number, token?: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getListOfArticles(offset, token), dispatch, { setData: setListOfArticles, setIsLoading });
};

export const getArticle = (slug: string, token?: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getArticle(slug, token), dispatch, { setData: setArticle, setIsLoading });
};

export const createArtile = (articleData: INewArticle, token: string) => async (dispatch: appDispatch) => {
    await changeData(() => api.createArticle(articleData, token), dispatch, {
        setData: (data) => setArticle({ article: { ...data }, isCreated: true }),
        setError: setArticle,
        setIsLoading,
    });
};

export const updateArtile =
    (articleData: INewArticle, token: string, slug: string) => async (dispatch: appDispatch) => {
        await changeData(() => api.updateArticle(articleData, token, slug), dispatch, {
            setData: (data) => setArticle({ article: { ...data }, isChanged: true }),
            setError: setArticle,
            setIsLoading,
        });
    };

export const deleteArticle = (token: string, slug: string) => async (dispatch: appDispatch) => {
    const res = await changeData(() => api.deleteArticle(token, slug), dispatch, {
        setData: () => setArticle({ article: null, isDeleted: true }),
        setError: setArticle,
    });
    return res;
};

export const favoriteArticle = (token: string, slug: string, index?: number) => async (dispatch: appDispatch) => {
    const res = await changeData(() => api.favoriteArticle(token, slug), dispatch, {
        setData:
            index === undefined
                ? (article: IArticle) => setArticle({ article })
                : (article: IArticle) => setListOfArticles({ article, index }),
    });
    return res;
};

export const unfavoriteArticle = (token: string, slug: string, index?: number) => async (dispatch: appDispatch) => {
    const res = await changeData(() => api.unfavoriteArticle(token, slug), dispatch, {
        setData:
            index === undefined
                ? (article: IArticle) => setArticle({ article })
                : (article: IArticle) => setListOfArticles({ article, index }),
    });
    return res;
};

async function changeData(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: {
        setData: ActionCreator<unknown>;
        setError?: ActionCreator<unknown>;
        setIsLoading?: ActionCreator<unknown>;
    }
) {
    const res = await fetchData(fetch, dispatch, actions, [{ error: UnauthorizedError, message: 'unauthorizedError' }]);
    return res;
}

async function getData(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: {
        setData: ActionCreator<unknown>;
        setError?: ActionCreator<unknown>;
        setIsLoading?: ActionCreator<unknown>;
    }
) {
    await fetchData(fetch, dispatch, actions, [{ error: NotFoundError, message: 'notFoundError' }]);
}

async function fetchData(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: {
        setData: ActionCreator<unknown>;
        setError?: ActionCreator<unknown>;
        setIsLoading?: ActionCreator<unknown>;
    },
    errors: { error: typeof FetchError; message: string }[]
) {
    const dispatchAction = bindActionCreators(actions, dispatch);

    if (!dispatchAction.setError) dispatchAction.setError = dispatchAction.setData;

    if (dispatchAction.setIsLoading) dispatchAction.setIsLoading(true);

    try {
        const data = await fetch();
        dispatchAction.setData(data);
        return true;
    } catch (err) {
        let isFindErr = false;
        // eslint-disable-next-line no-restricted-syntax
        for (const { error, message } of errors) {
            if (err instanceof error) {
                dispatchAction.setError({ hasError: message });
                isFindErr = true;
            }
        }
        if (!isFindErr)
            dispatchAction.setError({ hasError: err instanceof ServerError ? 'serverError' : 'fetchError' });
        return false;
    } finally {
        if (dispatchAction.setIsLoading) dispatchAction.setIsLoading(false);
    }
}
