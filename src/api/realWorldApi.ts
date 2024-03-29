import type { IListOfArticles, IArticle, IUser, IUpdateUser, INewArticle } from '../type';
import {
    FetchError,
    ServerError,
    UnauthorizedError,
    ReservedError,
    NotFoundError,
    InvalidDataError,
} from '../errors/customErrors';

interface IParameters {
    [key: string]: string | number;
}

interface IBody {
    [key: string]: string | object;
}

interface IFetchProps {
    method?: 'get' | 'post' | 'put' | 'delete';
    request: string;
    body?: IBody;
    headers?: { [key: string]: string };
}

interface IFetch {
    method?: 'get' | 'post' | 'put' | 'delete';
    headers?: Headers;
    body?: string;
}

interface IGet {
    request: string;
    props?: IParameters;
    headers?: { [key: string]: string };
}

const BASE_URL = ['https://blog.kata.academy/api/', 'https://api.realworld.io/api/'];

class Api {
    _BASE_URL = BASE_URL[0];

    async getListOfArticles(offset = 0, token?: string) {
        const LIMIT = 25;
        const request = 'articles';
        const fetchValues: IGet = { request, props: { offset, limit: LIMIT } };
        if (token) fetchValues.headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        try {
            const res = await this._get<IListOfArticles>(fetchValues);
            return { ...res, offset, hasError: false };
        } catch (err: ReturnType<FetchError>) {
            const { status }: { status: number; message: string } = err;
            if (status === 404) throw new NotFoundError(status);
            else throw err;
        }
    }

    async getArticle(slug: string, token?: string) {
        const request = `articles/${slug}`;
        const fetchValues: IGet = { request };
        if (token) fetchValues.headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        try {
            const { article } = await this._get<{ article: IArticle }>(fetchValues);
            return { article, hasError: false };
        } catch (err: ReturnType<FetchError>) {
            const { status }: { status: number; message: string } = err;
            if (status === 404) throw new NotFoundError(status);
            else throw err;
        }
    }

    async getUser(token: string) {
        const request = 'user';
        const { user } = await this._get<{ user: IUser }>({ request, headers: { Authorization: `Token ${token}` } });
        return user;
    }

    async registerNewUser(userObj: { username: string; email: string; password: string }) {
        const request = 'users';
        const body = { user: userObj };
        try {
            const { user } = await this._change<{ user: IUser }>('post', request, body);
            return user;
        } catch (err: ReturnType<FetchError>) {
            const { status }: { status: number; message: string } = err;
            if (status === 422) throw new ReservedError(status);
            else throw err;
        }
    }

    async login(userObj: { email: string; password: string }) {
        const request = 'users/login';
        const body = { user: userObj };
        try {
            const { user } = await this._change<{ user: IUser }>('post', request, body);
            return user;
        } catch (err: ReturnType<FetchError>) {
            const { status }: { status: number; message: string } = err;
            if (status === 422) throw new InvalidDataError(status);
            else throw err;
        }
    }

    async updateUser(userObj: IUpdateUser) {
        const request = 'user';
        const { token, ...newUser } = userObj;
        const body = { user: newUser };
        const headers = {
            Authorization: `Token ${token}`,
            'X-Requested-With': 'XMLHttpRequest',
        };
        const { user } = await this._change<{ user: IUser }>('put', request, body, headers);
        return user;
    }

    async createArticle(articleData: INewArticle, token: string) {
        const request = 'articles';
        const body = { article: articleData };
        const headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        const { article } = await this._change<{ article: IArticle }>('post', request, body, headers);
        return article;
    }

    async updateArticle(articleData: INewArticle, token: string, slug: string) {
        const request = `articles/${slug}`;
        const body = { article: articleData };
        const headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        const { article } = await this._change<{ article: IArticle }>('put', request, body, headers);
        return article;
    }

    async deleteArticle(token: string, slug: string) {
        const request = `articles/${slug}`;
        const headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        await this._change<{ article: IArticle }>('delete', request, undefined, headers);
        return true;
    }

    async favoriteArticle(token: string, slug: string) {
        const request = `articles/${slug}/favorite`;
        const headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        const { article } = await this._change<{ article: IArticle }>('post', request, undefined, headers);
        return article;
    }

    async unfavoriteArticle(token: string, slug: string) {
        const request = `articles/${slug}/favorite`;
        const headers = { 'X-Requested-With': 'XMLHttpRequest', Authorization: `Token ${token}` };
        const { article } = await this._change<{ article: IArticle }>('delete', request, undefined, headers);
        return article;
    }

    async _get<T>({ request, props, headers }: IGet) {
        const parameters: IFetchProps = { request: this._BASE_URL + request };
        if (props)
            parameters.request += `?${Object.keys(props)
                .map((el) => `${el}=${props[el]}`)
                .join('&')}`;

        if (headers) parameters.headers = headers;

        const res = await Api._fetch(parameters);

        return res as T;
    }

    async _change<T>(
        method: 'post' | 'put' | 'delete',
        request: string,
        body?: IBody,
        headers?: { [key: string]: string }
    ) {
        const url = this._BASE_URL + request;

        const parameters: IFetchProps = { method, request: url };
        if (body) parameters.body = body;
        if (headers) parameters.headers = headers;
        const res = Api._fetch(parameters);
        return res as T;
    }

    static async _fetch<T>({ method, request, body, headers }: IFetchProps) {
        const parameters: IFetch = {};

        if (method) parameters.method = method;

        const fetchHeaders = new Headers();
        fetchHeaders.append('Content-Type', 'application/json');
        if (headers) Object.keys(headers).forEach((key) => fetchHeaders.append(key, headers[key]));
        parameters.headers = fetchHeaders;

        if (body) parameters.body = JSON.stringify(body);

        let res: Response | string = await fetch(request, parameters);

        if (!res.ok) {
            const answer = await res.text();
            if (res.status === 401) throw new UnauthorizedError(res.status);
            if (res.status >= 500) throw new ServerError(res.status);
            throw new FetchError(res.status, answer);
        }

        res = await res.text();
        res = res ? await JSON.parse(res) : true;
        return res as T;
    }
}

const api = new Api();
export default api;
