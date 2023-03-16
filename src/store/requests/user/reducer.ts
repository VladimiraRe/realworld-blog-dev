import type { actionsType } from '../../../type';

interface IUserState {
    isRegistered: boolean;
    loggedIn: { username: string; email: string; image: string } | null;
}

// eslint-disable-next-line import/prefer-default-export
export function user(state: IUserState = { isRegistered: false, loggedIn: null }, action: actionsType) {
    switch (action.type) {
        case 'CHANGE_LOGGED_IN':
            return { isRegistered: !state.isRegistered, loggedIn: action.user };
        case 'CHANGE_IS_REGISTERED':
            return { ...state, isRegistered: !state.isRegistered };
        default:
            return state;
    }
}
