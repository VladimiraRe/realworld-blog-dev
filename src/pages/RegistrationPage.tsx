import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Input, Checkbox } from 'antd';

import type { storeType } from '../type';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import { changeIsRegistered, registerNewUser, setUserError } from '../store/requests/action';
import type { alertType } from '../components/Alert';
import Alert, { alertMessage } from '../components/Alert';
import useSideContent from '../utils/hooks/useSideContent';
import useCleaner from '../utils/hooks/useCleaner';

export default function RegistrationPage() {
    const { isRegistered, hasError } = useSelector((state: storeType) => state.user);

    useCleaner([
        { check: isRegistered, action: () => changeIsRegistered() },
        { check: !!hasError, action: () => setUserError(null) },
    ]);

    const alertAction = (
        <p>
            <Link to='/sign-in'>Follow the link</Link> to log into your account
        </p>
    );
    const registrationMessage = (
        <Alert message={alertMessage.successful('registration')} type='success' action={alertAction} />
    );

    const sideContent = useSideContent({
        error: { hasError, props: () => generateErrorMessage(hasError) },
        other: [{ check: isRegistered, component: registrationMessage }],
    });

    if (sideContent) return <Container component={sideContent} />;

    const names = ['username', 'email', 'password', 'repeat password', 'agreement'];

    const initial: { [key: string]: string | null | boolean } = {};
    names.forEach((name) => {
        initial[name] = name === 'agreement' ? false : null;
    });

    return (
        <UserForm promptText='Already have an account?' promptLink={{ text: 'Sign In', link: '/sign-in' }}>
            <Form title='Create new account' btnText='Create' action={registerNewUser} initial={initial}>
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={userRules.username}
                    hasFeedback
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label={names[1]}
                    rules={userRules.email}
                    hasFeedback
                    component={<Input placeholder={names[1]} />}
                />
                <FormItem
                    name={names[2]}
                    label={names[2]}
                    rules={userRules.password}
                    hasFeedback
                    component={<Input.Password placeholder={names[2]} />}
                />
                <FormItem
                    name={names[3]}
                    label={names[3]}
                    rules={userRules.repeatPassword}
                    dependencies={[names[2]]}
                    hasFeedback
                    component={<Input.Password placeholder={names[3]} />}
                />
                <hr />
                <FormItem
                    name={names[4]}
                    rules={userRules.agreement}
                    valuePropName='checked'
                    component={<Checkbox>I agree to the processing of my personal information</Checkbox>}
                />
            </Form>
        </UserForm>
    );
}

function generateErrorMessage(error: string | null) {
    const res: { text: string; type?: keyof typeof alertType } = { text: alertMessage.fetchError };
    if (error === 'reservedError') {
        res.text = alertMessage.registrationError;
        res.type = 'warning';
    }
    if (error === 'serverError') res.text = alertMessage.serverError;
    return res;
}
