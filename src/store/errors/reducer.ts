import type { actionsType } from '../../type';

export const errorsState = {
    fetchArticleError: 0,
};

export default function errors(state = errorsState, action: actionsType) {
    switch (action.type) {
        case 'SET_ERROR': {
            const { error } = action;
            return { ...state, [error]: state[error] + 1 };
        }
        default:
            return state;
    }
}
