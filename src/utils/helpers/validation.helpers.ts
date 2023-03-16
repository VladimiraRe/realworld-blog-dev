import type { Rule } from 'antd/es/form';

const rules: { [key: string]: Rule[] } = {
    username: [
        {
            required: true,
            message: 'Please input your username!',
        },
        {
            max: 20,
            min: 3,
            message: 'Username must be between 3 and 20 characters',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please input your email!',
        },
        {
            type: 'email',
            message: 'The input is not valid E-mail!',
        },
    ],
    password: [
        {
            required: true,
            message: 'Please input your password!',
        },
        {
            min: 6,
            message: 'Password must be more than 6 characters',
        },
        {
            max: 40,
            message: 'Password must be less than 40 characters',
        },
    ],
    repeatPassword: [
        {
            required: true,
            message: 'Please repeat password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Password mismatch!'));
            },
        }),
    ],
    agreement: [
        {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))),
        },
    ],
    url: [
        {
            type: 'url',
            message: 'Avatar image must be a valid url',
        },
    ],
};

export default rules;
