import { useSelector } from 'react-redux';
import { Input } from 'antd';

import type { storeType } from '../type';
import { login, setUserError } from '../store/requests/action';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useCleaner from '../utils/hooks/useCleaner';
import useSideContent from '../utils/hooks/useSideContent';
import { alertMessage } from '../components/Alert';
import getErrorMessage from '../utils/hooks/getErrorMessage';

export default function LoginPage() {
    const { hasError } = useSelector((state: storeType) => state.user);

    useCleaner([{ check: !!hasError, action: () => setUserError(null) }]);

    const sideContent = useSideContent({
        error: {
            hasError,
            props: () =>
                getErrorMessage(hasError, [
                    ['unauthorizedError', alertMessage.loginError],
                    ['serverError', alertMessage.serverError],
                ]),
        },
    });

    if (sideContent) return <Container component={sideContent} />;

    const names = ['email', 'password'];

    const initial: { [key: string]: string | null } = {};
    names.forEach((name) => {
        initial[name] = null;
    });

    return (
        <UserForm promptText="Don't have an account?" promptLink={{ text: 'Sign Up', link: '/sign-up' }}>
            <Form title='sign in' btnText='login' action={login} initial={initial}>
                <FormItem
                    name={names[0]}
                    label='email address'
                    rules={userRules.email}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label={names[1]}
                    rules={userRules.password}
                    component={<Input.Password placeholder={names[1]} />}
                />
            </Form>
        </UserForm>
    );
}
