import { useSelector } from 'react-redux';
import { Input } from 'antd';

import type { IFormValues, storeType } from '../type';
import { login, setUserError } from '../store/requests/action';
import rules from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useCleaner from '../utils/hooks/useCleaner';
import useSideContent from '../utils/hooks/useSideContent';
import { alertMessage } from '../components/Alert';

export default function LoginPage() {
    const { hasError } = useSelector((state: storeType) => state.user);

    useCleaner([{ check: !!hasError, action: () => setUserError(null) }]);

    const sideContent = useSideContent({ error: { hasError, props: () => generateErrorMessage(hasError) } });

    if (sideContent) return <Container component={sideContent} />;

    const names = ['email', 'password'];

    const initial: IFormValues[] = names.map((name) => ({ name, value: null }));

    return (
        <UserForm promptText="Don't have an account?" promptLink={{ text: 'Sign Up', link: '/sign-up' }}>
            <Form title='sign in' btnText='login' action={login} initial={initial}>
                <FormItem
                    name={names[0]}
                    label='email address'
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

function generateErrorMessage(error: string | null) {
    const res: { text: string } = { text: alertMessage.fetchError };
    if (error === 'unauthorizedError') res.text = alertMessage.loginError;
    if (error === 'serverError') res.text = alertMessage.serverError;
    return res;
}
