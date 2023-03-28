import type { IUser } from '../../../type';

export const setLoggedIn = (user: IUser | null) => ({
    type: 'SET_LOGGED_IN' as const,
    user,
});

export const changeIsRegistered = () => ({
    type: 'CHANGE_IS_REGISTERED' as const,
});

export const setUserError = (error: string | null) => ({
    type: 'SET_USER_ERROR' as const,
    error,
});
