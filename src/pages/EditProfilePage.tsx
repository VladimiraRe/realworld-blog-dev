import { useSelector } from 'react-redux';
import { Input } from 'antd';

import type { ConvertInterfaceToDict, IUpdateUser, storeType } from '../type';
import { setIsDataUpdate, setUserError, updateUser } from '../store/requests/action';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useCleaner from '../utils/hooks/useCleaner';
import useSideContent from '../utils/hooks/useSideContent';
import type { alertType } from '../components/Alert';
import Alert, { alertMessage } from '../components/Alert';
import getErrorMessage from '../utils/hooks/getErrorMessage';

type updateUserType = ConvertInterfaceToDict<IUpdateUser>;
type formType = Omit<updateUserType, 'bio'>;

export default function EditProfilePage() {
    const { loggedIn, hasError } = useSelector((state: storeType) => state.user);
    const isDataUpdate = useSelector((state: storeType) => state.isDataUpdate);

    useCleaner([
        { check: !!hasError, action: () => setUserError(null) },
        { check: !!isDataUpdate, action: () => setIsDataUpdate(null) },
    ]);

    const sideContent = useSideContent({
        error: {
            hasError,
            props: () =>
                getErrorMessage(hasError, [
                    ['unauthorizedError', alertMessage.updateUserError],
                    ['serverError', alertMessage.serverError],
                ]),
        },
        other: [
            { check: !loggedIn, component: generateAlert(alertMessage.updateUserError, 'error') },
            { check: !!isDataUpdate, component: generateAlert(alertMessage.successful('profile editing'), 'success') },
        ],
    });
    if (sideContent) return <Container component={sideContent} />;

    const names = ['username', 'email', 'password', 'image'];
    const initial: { [key: string]: string | null } = {};
    names.forEach((name, inx) => {
        let value = null;
        if (inx === 0 && loggedIn) value = loggedIn.username;
        if (inx === 1 && loggedIn) value = loggedIn.email;
        initial[name] = value;
    });

    return (
        <UserForm>
            <Form<IUpdateUser>
                title='edit profile'
                btnText='save'
                action={(fromForm) => updateUser({ ...newUserInfo(fromForm), token: loggedIn?.token as string })}
                initial={initial}
            >
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={userRules.username}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label='email address'
                    rules={userRules.email}
                    component={<Input placeholder={names[1]} />}
                />
                <FormItem
                    name={names[2]}
                    label='new password'
                    rules={userRules.password}
                    component={<Input.Password placeholder={names[2]} />}
                />
                <FormItem
                    name={names[3]}
                    label='avatar image'
                    rules={userRules.url}
                    component={<Input placeholder='avatar image (url)' />}
                />
            </Form>
        </UserForm>
    );
}

function newUserInfo(fields: formType) {
    const cleanFields = Object.entries(fields).filter((el) => el[1] !== null && el[1] !== '');
    return Object.fromEntries(cleanFields);
}

function generateAlert(message: string, type: keyof typeof alertType) {
    return <Alert message={message} type={type} />;
}
