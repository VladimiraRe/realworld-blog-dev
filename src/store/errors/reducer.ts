import type { actionsType } from '../../type';

export default function hasError(state: string[] | null = null, action: actionsType) {
    switch (action.type) {
        case 'SET_ERROR': {
            if (action.errors === null) return null;
            return state === null ? [action.errors] : [...state, action.errors];
        }
        default:
            return state;
    }
}
