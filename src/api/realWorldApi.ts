import type { IArticles } from '../type';

class Api {
    _BASE_URL = 'https://blog.kata.academy/api/';

    async getArticles(offset = 0) {
        const LIMIT = 25;
        const request = 'articles';
        const res: IArticles = await this._get<IArticles>(request, { offset, limit: LIMIT });
        return { ...res, offset };
    }

    async _get<T>(request: string, parameters?: { [key: string]: string | number }): Promise<T> {
        let url = this._BASE_URL + request;
        if (parameters)
            url += `?${Object.keys(parameters)
                .map((el) => `${el}=${parameters[el]}`)
                .join('&')}`;
        let res = await fetch(url);
        if (!res.ok) throw new Error(`Couldn't fetch ${url}, fetch status is ${res.status}`);
        res = await res.json();
        return res as T;
    }
}

const api = new Api();
export default api;
