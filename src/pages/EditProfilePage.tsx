import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import type { Rule } from 'antd/es/form';

import type { appDispatch, ConvertInterfaceToDict, IUpdateUser, storeType } from '../type';
import { setUserError, updateUser } from '../store/requests/action';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useSideContent from '../utils/hooks/useSideContent';
import Alert from '../components/Alert';
import getErrorMessage from '../utils/hooks/getErrorMessage';
import useCleaner from '../utils/hooks/useCleaner';
import { alertMessage } from '../utils/helpers/alert.helpers';
import type { alertType } from '../utils/helpers/alert.helpers';

type updateUserType = ConvertInterfaceToDict<IUpdateUser>;
type formType = Omit<updateUserType, 'bio'>;

export default function EditProfilePage() {
    const { loggedIn, hasError } = useSelector((state: storeType) => state.user);
    const dispatch: appDispatch = useDispatch();

    const [isReloaded, setIsReloaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useCleaner([{ check: !!hasError, action: () => setUserError(null) }]);

    useLayoutEffect(() => {
        if (sessionStorage.getItem('isReloaded')) {
            sessionStorage.removeItem('isReloaded');
            setIsReloaded(true);
        }
    }, []);

    const sideContent = useSideContent({
        error: {
            hasError,
            props: () => {
                setIsLoading(false);
                return getErrorMessage(hasError, [
                    ['unauthorizedError', alertMessage.updateUserError],
                    ['serverError', alertMessage.serverError],
                ]);
            },
        },
        other: [
            { check: !loggedIn, component: generateAlert(alertMessage.updateUserError, 'error') },
            {
                check: isReloaded,
                action: () => {
                    setIsReloaded(false);
                    return generateAlert(alertMessage.successful('profile editing'), 'success');
                },
            },
        ],
        withoutLoading: true,
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

    const onFinish = (values: IUpdateUser) => {
        setIsLoading(true);
        dispatch(updateUser({ ...newUserInfo(values), token: loggedIn?.token as string }));
        if (values.image && !hasError) {
            sessionStorage.setItem('isReloaded', 'true');
            window.location.reload();
        }
    };

    return (
        <UserForm>
            <Form<IUpdateUser>
                title='edit profile'
                btnText='save'
                loading={isLoading}
                disabled={isLoading}
                initial={initial}
                onFinish={onFinish}
            >
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={userRules.username as Rule[]}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label='email address'
                    rules={userRules.email as Rule[]}
                    component={<Input placeholder={names[1]} />}
                />
                <FormItem
                    name={names[2]}
                    label='new password'
                    rules={userRules.password as Rule[]}
                    component={<Input.Password placeholder={names[2]} />}
                />
                <FormItem
                    name={names[3]}
                    label='avatar image'
                    rules={userRules.url as Rule[]}
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
