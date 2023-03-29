/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ThunkDispatch } from 'redux-thunk';
import type { Action } from 'redux';
import type { FormInstance, Rule } from 'antd/es/form';
import type { FieldData } from 'rc-field-form/lib/interface';

import type reducer from './store/reducer';
import type store from './store';
import * as articlesActions from './store/requests/articles/action';
import * as userActions from './store/requests/user/action';
import * as requestsActions from './store/requests/action';
import * as errorsActions from './store/errors/action';
import type { errorsState } from './store/errors/reducer';
import type { alertMessage } from './utils/helpers/alert.helpers';

export type inferValuesType<T> = T extends { [key: string]: infer U } ? U : never;

export type ConvertInterfaceToDict<T> = {
    [K in keyof T]: T[K];
};

export type rootState = ReturnType<typeof reducer>;
export type storeType = ReturnType<typeof store.getState>;
export type appDispatch = ThunkDispatch<storeType, void, Action>;

const actions = {
    ...articlesActions,
    ...userActions,
    ...requestsActions,
    ...errorsActions,
};

export type actionsType = ReturnType<inferValuesType<typeof actions>>;

export type alertMessageKeysType = keyof typeof alertMessage;

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegisterNewUser extends ILogin {
    username: string;
}

export interface IAuthor {
    username: string;
    image: string;
    bio: string;
}

export interface IAuthorWithFollowing extends IAuthor {
    following: boolean;
}

export interface IUser extends IAuthor {
    email: string;
    token: string;
}

export interface IUpdateUser {
    username?: string;
    email?: string;
    password?: string;
    image?: string;
    token: string;
}

export interface INewArticle {
    title: string;
    description: string;
    body: string;
    tagList: string[];
}

export interface IArticle extends INewArticle {
    slug: string;
    createdAt: string;
    updatedAt?: string;
    favorited: boolean;
    favoritesCount: number;
    author: IAuthor;
}

export interface IStateArticle {
    article: IArticle | null;
    hasError: string | null;
    isDeleted: boolean;
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
    dependencies?: NamePath[];
    hasFeedback?: boolean;
}

export interface IInitial {
    [key: string]: string | (string | null)[] | null | boolean;
}

export interface IForm<T> {
    title: string;
    btnText: string;
    initial: IInitial;
    children: JSX.Element[];
    onFinish?: (values: T) => void;
    form?: FormInstance;
    loading?: boolean;
    disabled?: boolean;
}
