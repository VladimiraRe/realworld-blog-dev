import type { ActionCreator } from 'redux';
import { bindActionCreators } from 'redux';

import api from '../../../api/realWorldApi';
import type { FetchError } from '../../../errors/customErrors';
import { NotFoundError, ServerError, UnauthorizedError } from '../../../errors/customErrors';
import type { appDispatch, IArticle, INewArticle } from '../../../type';
import { setIsLoading } from '../action';

import { setArticle, setListOfArticles } from './action';

export const getListOfArticles = (offset?: number, token?: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getListOfArticles(offset, token), dispatch, { setData: setListOfArticles }, true);
};

export const getArticle = (slug: string, token?: string) => async (dispatch: appDispatch) => {
    await getData(() => api.getArticle(slug, token), dispatch, { setData: setArticle }, true);
};

export const createArticle = (articleData: INewArticle, token: string) => async (dispatch: appDispatch) => {
    const res = await changeData<IArticle>(
        () => api.createArticle(articleData, token),
        dispatch,
        {
            setError: setArticle,
        },
        true
    );
    return res;
};

export const updateArticle =
    (articleData: INewArticle, token: string, slug: string) => async (dispatch: appDispatch) => {
        const res = await changeData<IArticle>(
            () => api.updateArticle(articleData, token, slug),
            dispatch,
            {
                setError: setArticle,
            },
            true
        );
        return res;
    };

export const deleteArticle = (token: string, slug: string) => async (dispatch: appDispatch) => {
    const res = await changeData(
        () => api.deleteArticle(token, slug),
        dispatch,
        {
            setError: setArticle,
        },
        true
    );
    return res;
};

export const favoriteArticle = (token: string, slug: string, index?: number) => async (dispatch: appDispatch) => {
    const res = await like(() => api.favoriteArticle(token, slug), dispatch, index);
    return res;
};

export const unfavoriteArticle = (token: string, slug: string, index?: number) => async (dispatch: appDispatch) => {
    const res = await like(() => api.unfavoriteArticle(token, slug), dispatch, index);
    return res;
};

async function like(apiMethod: () => Promise<IArticle>, dispatch: appDispatch, index?: number) {
    const setters =
        index === undefined
            ? {
                  setData: (article: IArticle) => setArticle({ article }),
                  setError: setArticle,
              }
            : {
                  setData: (article: IArticle) => setListOfArticles({ article, index }),
                  setError: setListOfArticles,
              };
    const res = await changeData(apiMethod, dispatch, setters);
    return res;
}

type fetchDataActionsType =
    | {
          setData: ActionCreator<unknown>;
          setError?: ActionCreator<unknown>;
      }
    | {
          setData?: ActionCreator<unknown>;
          setError: ActionCreator<unknown>;
      };

async function changeData<T>(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: fetchDataActionsType,
    isNeedLoading?: boolean
) {
    const res = await fetchData<T>(
        fetch,
        dispatch,
        actions,
        [{ error: UnauthorizedError, message: 'unauthorizedError' }],
        isNeedLoading
    );
    return res;
}

async function getData(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: {
        setData: ActionCreator<unknown>;
        setError?: ActionCreator<unknown>;
    },
    isNeedLoading?: boolean
) {
    await fetchData(fetch, dispatch, actions, [{ error: NotFoundError, message: 'notFoundError' }], isNeedLoading);
}

async function fetchData<T>(
    fetch: () => Promise<unknown>,
    dispatch: appDispatch,
    actions: fetchDataActionsType,
    errors: { error: typeof FetchError; message: string }[],
    isNeedLoading?: boolean
): Promise<T | false> {
    let {
        setData,
        setError,
        setIsLoading: bindSetIsLoading,
    } = bindActionCreators({ ...actions, setIsLoading }, dispatch);

    if (isNeedLoading) bindSetIsLoading(true);

    try {
        const data = await fetch();
        if (setData) setData(data);
        return data as T;
    } catch (err) {
        let isFindErr = false;
        if (!setError) setError = setData;
        const findErr = errors.find(({ error }) => err instanceof error);
        if (findErr && setError) {
            setError({ hasError: findErr.message });
            isFindErr = true;
        }
        if (!isFindErr && setError) setError({ hasError: err instanceof ServerError ? 'serverError' : 'fetchError' });
        return false;
    } finally {
        if (isNeedLoading) bindSetIsLoading(false);
    }
}
