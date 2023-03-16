import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import type { appDispatch, IFormValues, storeType } from '../type';
import { login, setIsLoading } from '../store/requests/action';
import rules from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import Loading from '../components/Loading';

export default function LoginPage() {
    const dispatch: appDispatch = useDispatch();
    const isLoading = useSelector((state: storeType) => state.isLoading);

    useEffect(
        () => () => {
            if (isLoading) dispatch(setIsLoading(false));
        },
        [dispatch, isLoading]
    );

    if (isLoading) return <Container component={<Loading />} />;

    const names = ['email address', 'password'];

    const initial: IFormValues[] = names.map((name) => ({ name, value: null }));

    return (
        <UserForm promptText='Don’t have an account?' promptLink={{ text: 'Sign Up', link: '/sign-up' }}>
            <Form title='sign in' btnText='login' action={login} initial={initial}>
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={rules.email}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label={names[1]}
                    rules={rules.password}
                    component={<Input.Password placeholder={names[1]} />}
                />
            </Form>
        </UserForm>
    );
}
