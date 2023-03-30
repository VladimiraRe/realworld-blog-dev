/* eslint-disable no-param-reassign */
export default function getCookie() {
    return document.cookie.split('; ').reduce((prev: { [key: string]: string } | Record<string, string>, current) => {
        const [name, ...value] = current.split('=');
        prev[name] = value.join('=');
        return prev;
    }, {});
}
