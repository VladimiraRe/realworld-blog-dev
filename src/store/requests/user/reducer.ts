import type { actionsType } from '../../../type';

// eslint-disable-next-line import/prefer-default-export
export function isLoggedIn(state = false, action: actionsType) {
    switch (action.type) {
        case 'CHANGE_IS_LOGGED_IN':
            return !state;
        default:
            return state;
    }
}
