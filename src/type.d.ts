import type { ThunkDispatch } from 'redux-thunk';
import type { Action } from 'redux';
import type { Rule } from 'antd/es/form';
import type { FieldData } from 'rc-field-form/lib/interface';

import type reducer from './store/reducer';
import type store from './store';
import * as requestsActions from './store/requests/action';
import type { errorsState } from './store/errors/reducer';

export type inferValuesType<T> = T extends { [key: string]: infer U } ? U : never;

export type rootState = ReturnType<typeof reducer>;
export type storeType = ReturnType<typeof store.getState>;
export type appDispatch = ThunkDispatch<storeType, void, Action>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { getListOfArticles, getArticle, registerNewUser, login, ...newRequestsActions } = requestsActions;

const actions = {
    ...newRequestsActions,
};

export type actionsType = ReturnType<inferValuesType<typeof actions>>;

export interface IAuthor {
    username: string;
    image: string;
    bio: string;
}

export interface IAuthorWithFollowing extends IAuthor {
    following: boolean;
}

export interface IUser extends IAuthor {
    email: 'string';
    token: 'string';
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

export interface IStateArticle {
    article: IArticle | null;
    hasError: string | null;
}

export interface IListOfArticles {
    articles: IArticle[] | null;
    articlesCount: number | null;
    offset: number | null;
    hasError: string | null;
}

const omit = ['body', 'slug'] as const;
export type IArticleCard = Omit<IArticle, (typeof omit)[number]>;

export type errorsType = keyof typeof errorsState;

export interface IFormValues {
    name: string;
    label?: string;
    rules?: Rule[];
    valuePropName?: string;
}

export interface IForm {
    title: string;
    btnText: string;
    action: (fields: FieldData[]) => (dispatch: appDispatch) => Promise<void>;
    initial: FieldData[];
    children: JSX.Element[];
}
