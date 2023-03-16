import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import type { appDispatch, IFormValues, storeType } from '../type';
import { login, setIsLoading } from '../store/requests/action';
import rules from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import Loading from '../components/Loading';

export default function EditProfilePage() {
    const dispatch: appDispatch = useDispatch();
    const isLoading = useSelector((state: storeType) => state.isLoading);

    useEffect(
        () => () => {
            if (isLoading) dispatch(setIsLoading(false));
        },
        [dispatch, isLoading]
    );

    if (isLoading) return <Container component={<Loading />} />;

    const names = ['username', 'email address', 'new password', 'avatar image'];

    const initial: IFormValues[] = names.map((name) => ({ name, value: null }));

    return (
        <UserForm>
            <Form title='edit profile' btnText='save' action={login} initial={initial}>
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={rules.username}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label={names[1]}
                    rules={rules.email}
                    component={<Input placeholder={names[1]} />}
                />
                <FormItem
                    name={names[2]}
                    label={names[2]}
                    rules={rules.password}
                    component={<Input.Password placeholder={names[2]} />}
                />
                <FormItem
                    name={names[3]}
                    label={names[3]}
                    rules={rules.url}
                    component={<Input placeholder='avatar image (url)' />}
                />
            </Form>
        </UserForm>
    );
}
