import type { actionsType } from '../../type';

export * from './articles/reducer';
export * from './user/reducer';

export function isLoading(state = false, action: actionsType) {
    switch (action.type) {
        case 'SET_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
