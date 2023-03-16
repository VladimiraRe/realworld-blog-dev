import type { IListOfArticles, IArticle, IUser } from '../type';
import { FetchError, NotFoundError, ServerError } from '../errors/customErrors';

interface IParameters {
    [key: string]: string | number;
}

interface IBody {
    [key: string]: string | object;
}

class Api {
    _BASE_URL = 'https://blog.kata.academy/api/';

    async getListOfArticles(offset = 0) {
        const LIMIT = 25;
        const request = 'articles';
        const res = await this._get<IListOfArticles>(request, { offset, limit: LIMIT });
        return { ...res, offset, hasError: false };
    }

    async getArticle(slug: string) {
        const request = `articles/${slug}`;
        const res = await this._get<{ article: IArticle }>(request);
        return { article: res.article, hasError: false };
    }

    async registerNewUser(userObj: { username: string; email: string; password: string }) {
        const request = 'users';
        const body = { users: userObj };
        const res = await this._get<{ user: IUser }>(request, undefined, body);
        return res.user;
    }

    async _get<T>(request: string, parameters?: IParameters, body?: IBody): Promise<T> {
        let url = this._BASE_URL + request;
        if (parameters)
            url += `?${Object.keys(parameters)
                .map((el) => `${el}=${parameters[el]}`)
                .join('&')}`;

        const values: [string, object?] = [url];
        if (body) values.push({ body });

        let res = await fetch(...values);

        if (!res.ok) {
            const answer = await res.text();
            if (res.status === 404) throw new NotFoundError(res.status);
            if (res.status >= 500) throw new ServerError(res.status);
            throw new FetchError(res.status, answer);
        }

        res = await res.json();
        return res as T;
    }
}

const api = new Api();
export default api;
