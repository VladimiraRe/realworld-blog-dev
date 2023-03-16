import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Checkbox } from 'antd';
import type { FieldData } from 'rc-field-form/lib/interface';

import type { appDispatch, storeType } from '../type';
import rules from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import { changeIsRegistered, registerNewUser, setIsLoading } from '../store/requests/action';
import Alert, { alertMessage } from '../components/Alert';
import Loading from '../components/Loading';

export default function RegistrationPage() {
    const dispatch: appDispatch = useDispatch();
    const { isRegistered } = useSelector((state: storeType) => state.user);
    const isLoading = useSelector((state: storeType) => state.isLoading);

    useEffect(
        () => () => {
            if (isLoading) dispatch(setIsLoading(false));
            if (isRegistered) dispatch(changeIsRegistered());
        },
        [dispatch, isRegistered, isLoading]
    );

    if (isLoading) return <Container component={<Loading />} />;

    if (isRegistered) {
        const alertAction = (
            <p>
                <Link to='/sign-in'>Follow the link</Link> to log into your account
            </p>
        );
        return (
            <Container
                component={
                    <Alert message={alertMessage.successful('registration')} type='success' action={alertAction} />
                }
            />
        );
    }

    const names = ['username', 'email', 'password', 'repeat password', 'agreement'];

    const initial: FieldData[] = names.map((name) => {
        const obj: FieldData = { name };
        obj.value = name === 'agreement' ? false : null;
        return obj;
    });

    return (
        <UserForm promptText='Already have an account?' promptLink={{ text: 'Sign In', link: '/sign-in' }}>
            <Form title='Create new account' btnText='Create' action={registerNewUser} initial={initial}>
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
                    rules={rules.password}
                    component={<Input.Password placeholder={names[3]} />}
                />
                <hr />
                <FormItem
                    name={names[4]}
                    rules={rules.agreement}
                    valuePropName='checked'
                    component={<Checkbox>I agree to the processing of my personal information</Checkbox>}
                />
            </Form>
        </UserForm>
    );
}
