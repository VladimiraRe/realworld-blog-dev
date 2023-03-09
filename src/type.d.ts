import type { ThunkDispatch } from 'redux-thunk';
import type { Action } from 'redux';

import type reducer from './store/reducer';
import type store from './store';
import * as requestsActions from './store/requests/action';
import * as errorsActions from './store/errors/action';
import type { errorsState } from './store/errors/reducer';

type inferValuesType<T> = T extends { [key: string]: infer U } ? U : never;

export type rootState = ReturnType<typeof reducer>;
export type storeType = ReturnType<typeof store.getState>;
export type appDispatch = ThunkDispatch<storeType, void, Action>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { getArticles, ...newRequestsActions } = requestsActions;

const actions = {
    ...newRequestsActions,
    ...errorsActions,
};

export type actionsType = ReturnType<inferValuesType<typeof actions>>;

export interface IAuthor {
    username: string;
    image: string;
    bio: string;
    following: boolean;
}

export interface IArticle {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt?: string;
    favorited: boolean;
    favoritesCount: number;
    author: IAuthor;
}

export interface IArticles {
    articles: IArticle[];
    articlesCount: number;
    offset: number;
}

export type IArticleCard = Omit<IArticle, 'body'>;

export type errorsType = keyof typeof errorsState;
