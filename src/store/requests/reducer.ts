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

export function isDataUpdate(state: boolean | null = null, action: actionsType) {
    switch (action.type) {
        case 'SET_IS_DATA_UPDATE':
            return action.isDataUpdate;
        default:
            return state;
    }
}
