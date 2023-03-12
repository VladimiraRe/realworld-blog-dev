import type { IListOfArticles, IArticle } from '../type';
import { FetchError, NotFoundError } from '../errors/customErrors';

class Api {
    _BASE_URL = 'https://blog.kata.academy/api/';

    async getListOfArticles(offset = 0) {
        const LIMIT = 25;
        const request = 'articles';
        const res: IListOfArticles = await this._get<IListOfArticles>(request, { offset, limit: LIMIT });
        return { ...res, offset };
    }

    async getArticle(slug: string) {
        const request = `articles/${slug}`;
        const res: { article: IArticle } = await this._get<{ article: IArticle }>(request);
        return res.article;
    }

    async _get<T>(request: string, parameters?: { [key: string]: string | number }): Promise<T> {
        let url = this._BASE_URL + request;
        if (parameters)
            url += `?${Object.keys(parameters)
                .map((el) => `${el}=${parameters[el]}`)
                .join('&')}`;
        let res = await fetch(url);
        if (!res.ok) {
            const answer = await res.text();
            if (res.status === 404 && answer === 'Not Found') throw new NotFoundError(res.status);
            throw new FetchError(res.status, '');
        }
        res = await res.json();
        return res as T;
    }
}

const api = new Api();
export default api;
