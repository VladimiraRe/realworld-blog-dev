import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import { useForm } from 'antd/es/form/Form';

import type { appDispatch, IInitial, ILogin, storeType } from '../type';
import { login, setUserError } from '../store/action';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useCleaner from '../utils/hooks/useCleaner';
import Alert from '../components/Alert';
import getErrorMessage from '../utils/hooks/getErrorMessage';
import { alertMessage } from '../utils/helpers/alert.helpers';

interface IState extends IInitial {
    email: string | null;
    password: string | null;
}

export default function LoginPage() {
    const { hasError } = useSelector((state: storeType) => state.user);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    const [form] = useForm();
    const prevValues = useRef({ email: null, password: null } as IState);

    const [isInvalidDataError, setIsInvalidDataError] = useState(false);

    useEffect(() => {
        if (hasError === 'invalidDataError' && !isInvalidDataError) {
            setIsInvalidDataError(true);
        }
        if (isInvalidDataError) {
            form.validateFields();
        }
    }, [hasError, form, isInvalidDataError]);

    useCleaner([{ check: !!hasError, action: () => setUserError(null) }]);

    if (hasError && hasError !== 'invalidDataError') {
        const { text, type } = getErrorMessage(hasError, [
            ['unauthorizedError', alertMessage.loginError],
            ['serverError', alertMessage.serverError],
        ]);
        return <Container component={<Alert message={text} type={type || 'error'} />} />;
    }

    const names = ['email', 'password'];

    const checkField = () => {
        if (isInvalidDataError) {
            const { email, password } = form.getFieldsValue(['email', 'password']);
            if (email === prevValues.current.email && password === prevValues.current.password)
                return Promise.reject(new Error(alertMessage.invalidDataError));
        }
        return Promise.resolve();
    };

    return (
        <UserForm promptText="Don't have an account?" promptLink={{ text: 'Sign Up', link: '/sign-up' }}>
            <Form
                title='sign in'
                btnText='login'
                initial={prevValues.current}
                onFinish={(values: ILogin) => {
                    prevValues.current = values as IState;
                    setIsInvalidDataError(false);
                    dispatch(login(values));
                }}
                form={form}
                loading={isLoading}
                disabled={isLoading}
            >
                <FormItem
                    name={names[0]}
                    label='email address'
                    rules={[...userRules.email, { validator: checkField }]}
                    component={<Input placeholder={names[0]} />}
                    dependencies={[names[1]]}
                />
                <FormItem
                    name={names[1]}
                    label={names[1]}
                    rules={[...userRules.password, { validator: checkField }]}
                    component={<Input.Password placeholder={names[1]} />}
                    dependencies={[names[0]]}
                />
            </Form>
        </UserForm>
    );
}
