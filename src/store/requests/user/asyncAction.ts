import { bindActionCreators } from 'redux';

import api from '../../../api/realWorldApi';
import type { FetchError } from '../../../errors/customErrors';
import { InvalidDataError, ReservedError, ServerError, UnauthorizedError } from '../../../errors/customErrors';
import type { actionsType, appDispatch, ILogin, IRegisterNewUser, IUpdateUser, IUser } from '../../../type';
import { setIsLoading } from '../action';

import { changeIsRegistered, setLoggedIn, setUserError } from './action';

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
            },
            true
        );
    };

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
            [
                {
                    error: UnauthorizedError,
                    message: 'unauthorizedError',
                },
                {
                    error: InvalidDataError,
                    message: 'invalidDataError',
                },
            ]
        );

        if (user) {
            const key = encodeURIComponent('token');
            const value = encodeURIComponent(user.token);
            document.cookie = `${key}=${value}; path=/; max-age=${15 * 86400}; samesite=lax`;
        }
    };

export const updateUser = (newUser: IUpdateUser) => async (dispatch: appDispatch) => {
    await userAction(
        dispatch,
        (res: IUser) => setLoggedIn(res),
        () => api.updateUser(newUser) as Promise<IUser>,
        {
            error: UnauthorizedError,
            message: 'unauthorizedError',
        }
    );
};

interface ICustomError {
    error: typeof FetchError;
    message?: string;
    action?: () => void;
}

type userActionErrorsType = ICustomError | ICustomError[] | null;

async function userAction<T>(
    dispatch: appDispatch,
    action: (res: T) => actionsType,
    method: () => Promise<T>,
    errors: userActionErrorsType,
    withoutChangesLoggedIn?: boolean
) {
    const boundActions = bindActionCreators({ action, setUserError, setIsLoading }, dispatch);

    boundActions.setIsLoading(true);

    try {
        const res = await method();
        boundActions.action(res);
        return res;
    } catch (err) {
        handleError(err, errors, boundActions.setUserError);
        if (!withoutChangesLoggedIn) dispatch(setLoggedIn(false));
        return false;
    } finally {
        boundActions.setIsLoading(false);
    }
}

function handleError(
    err: unknown,
    compareErr: userActionErrorsType,
    setError: (error: string | null) => { type: 'SET_USER_ERROR'; error: string | null }
): false {
    if (!compareErr) return false;
    let errMessage: string | null = 'fetchError';
    if (err instanceof ServerError) errMessage = 'serverError';
    if (!Array.isArray(compareErr) && err instanceof compareErr.error) {
        errMessage = getErrMessage(compareErr);
    }
    if (Array.isArray(compareErr)) {
        const findErr = compareErr.find((errObj) => err instanceof errObj.error);
        if (findErr) errMessage = getErrMessage(findErr);
    }
    if (errMessage) setError(errMessage);
    return false;

    function getErrMessage(errObj: ICustomError) {
        if (errObj.action) errObj.action();
        return errObj.message || null;
    }
}
