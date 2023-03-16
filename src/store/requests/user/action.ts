import { bindActionCreators } from 'redux';
import type { FieldData } from 'rc-field-form/lib/interface';

import { setIsLoading } from '../action';
import type { appDispatch } from '../../../type';

export const setLoggedIn = (user: { username: string; email: string; image: string } | null) => ({
    type: 'CHANGE_LOGGED_IN' as const,
    user,
});

export const changeIsRegistered = () => ({
    type: 'CHANGE_IS_REGISTERED' as const,
});

export const registerNewUser = (fields: FieldData[]) => async (dispatch: appDispatch) => {
    const boundActions = bindActionCreators({ changeIsRegistered, setIsLoading }, dispatch);

    boundActions.setIsLoading(true);

    const res = await new Promise((resolve) => {
        setTimeout(() => {
            console.log(fields);
            resolve(true);
        }, 3000);
    });
    if (res) {
        boundActions.changeIsRegistered();
    }

    boundActions.setIsLoading(false);
};

export const login = (fields: FieldData[]) => async (dispatch: appDispatch) => {
    const boundActions = bindActionCreators({ setLoggedIn, changeIsRegistered, setIsLoading }, dispatch);

    boundActions.setIsLoading(true);

    const res = await new Promise((resolve) => {
        setTimeout(() => {
            console.log(fields);
            resolve(true);
        }, 3000);
    });
    if (res) {
        boundActions.setLoggedIn({ username: 'John Doe', email: 'john@example.com', image: '' });
    }

    boundActions.setIsLoading(false);
};
