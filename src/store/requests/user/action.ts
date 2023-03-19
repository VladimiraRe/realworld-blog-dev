import { bindActionCreators } from 'redux';

import api from '../../../api/realWorldApi';
import { setIsDataUpdate, setIsLoading } from '../action';
import type { actionsType, appDispatch, IUser, IUpdateUser } from '../../../type';
import type { FetchError } from '../../../errors/customErrors';
import { ReservedError, ServerError, UnauthorizedError } from '../../../errors/customErrors';

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

interface IRegisterNewUser {
    username: string;
    email: string;
    password: string;
}

export const registerNewUser =
    ({ username, email, password }: IRegisterNewUser) =>
    async (dispatch: appDispatch) => {
        await userAction(
            dispatch,
            () => changeIsRegistered(),
            () => api.registerNewUser({ username, email, password }) as unknown as Promise<IUser>,
            {
                error: ReservedError,
                message: 'reservedError',
            }
        );
    };

interface ILogin {
    email: string;
    password: string;
}

interface IReturnedUser extends IUser {
    token: string;
}

export const getUser = (token: string) => async (dispatch: appDispatch) => {
    const user = await userAction(
        dispatch,
        (res: IUser) => setLoggedIn(res),
        () => api.getUser(token),
        {
            error: UnauthorizedError,
            action: () => {
                document.cookie = 'token=""; max-age=0';
            },
        }
    );
    return !!user;
};

export const login =
    ({ email, password }: ILogin) =>
    async (dispatch: appDispatch) => {
        const user = await userAction<IReturnedUser>(
            dispatch,
            (res: IUser) => setLoggedIn(res),
            () => api.login({ email, password }) as Promise<IReturnedUser>,
            {
                error: UnauthorizedError,
                message: 'unauthorizedError',
            }
        );

        if (user) {
            const key = encodeURIComponent('token');
            const value = encodeURIComponent(user.token);
            document.cookie = `${key}=${value}; path=/; max-age=${15 * 86400}; samesite=lax`;
        }
    };

export const updateUser = (newUser: IUpdateUser) => async (dispatch: appDispatch) => {
    const user = await userAction(
        dispatch,
        (res: IUser) => setLoggedIn(res),
        () => api.updateUser(newUser) as Promise<IUser>,
        {
            error: UnauthorizedError,
            message: 'unauthorizedError',
        }
    );
    if (!user || Object.keys.length === 0) return;
    dispatch(setIsDataUpdate(true));
};

async function userAction<T>(
    dispatch: appDispatch,
    action: (res: T) => actionsType,
    method: () => Promise<T>,
    error: { error: typeof FetchError; message?: string; action?: () => void } | null
) {
    const boundActions = bindActionCreators({ action, setUserError, setIsLoading }, dispatch);

    boundActions.setIsLoading(true);

    try {
        const res = await method();
        boundActions.action(res);
        return res;
    } catch (err) {
        return handleError(err, error, boundActions.setUserError);
    } finally {
        boundActions.setIsLoading(false);
    }
}

function handleError(
    err: unknown,
    compareErr: { error: typeof FetchError; message?: string; action?: () => void } | null,
    setError: (error: string | null) => { type: 'SET_USER_ERROR'; error: string | null }
): false {
    if (!compareErr) return false;
    let errMessage: string | null = 'fetchError';
    if (err instanceof ServerError) errMessage = 'serverError';
    if (err instanceof compareErr.error) {
        errMessage = compareErr.message || null;
        if (compareErr.action) compareErr.action();
    }
    if (errMessage) setError(errMessage);
    return false;
}
