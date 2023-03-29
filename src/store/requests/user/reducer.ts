import type { actionsType, IUser } from '../../../type';

interface IUserState {
    isRegistered: boolean;
    loggedIn: IUser | null | false;
    hasError: string | null;
}

const initalUserState = { isRegistered: false, loggedIn: null, hasError: null };

// eslint-disable-next-line import/prefer-default-export
export function user(state: IUserState = initalUserState, action: actionsType) {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return { ...state, loggedIn: action.user };
        case 'CHANGE_IS_REGISTERED':
            return { ...state, isRegistered: !state.isRegistered };
        case 'SET_USER_ERROR':
            return { ...state, hasError: action.error };
        default:
            return state;
    }
}
