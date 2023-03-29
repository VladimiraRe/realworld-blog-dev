import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import type { Rule } from 'antd/es/form';

import type { appDispatch, ConvertInterfaceToDict, IUpdateUser, IUser, storeType } from '../type';
import { updateUser } from '../store/action';
import { userRules } from '../utils/helpers/validation.helpers';
import Container from '../containers/Container';
import Form, { UserForm, FormItem } from '../components/Form';
import useSideContent from '../utils/hooks/useSideContent';
import Alert from '../components/Alert';
import getErrorMessage from '../utils/hooks/getErrorMessage';
import { alertMessage } from '../utils/helpers/alert.helpers';
import useReload from '../utils/hooks/useReload';

type updateUserType = ConvertInterfaceToDict<IUpdateUser>;
type formType = Omit<updateUserType, 'bio'>;

export default function EditProfilePage() {
    const { loggedIn, hasError } = useSelector((state: storeType) => state.user);
    const isLoading = useSelector((state: storeType) => state.isLoading);
    const dispatch: appDispatch = useDispatch();

    const { reload, setReload } = useReload();

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
            { check: !loggedIn, component: <Alert message={alertMessage.updateUserError} type='error' /> },
            {
                check: reload === 'done',
                component: <Alert message='profile editing' type='success' />,
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

    const onFinish = async (values: IUpdateUser) => {
        const { token } = loggedIn as IUser;
        await dispatch(updateUser({ ...newUserInfo(values), token }));
        if (values.image && !hasError) {
            setReload(true);
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
