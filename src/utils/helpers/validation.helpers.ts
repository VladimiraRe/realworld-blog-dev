import type { Rule } from 'antd/es/form';

const userRules: { [key: string]: Rule[] } = {
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
            message: 'The input is not valid email!',
        },
        () => ({
            validator(rule, value) {
                if (!value || (value.match(/^[a-z]/) && rule.type !== 'email')) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('The input is not valid email!'));
            },
        }),
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

const articleRules: { [key: string]: Rule[] } = {
    title: [
        {
            required: true,
            message: 'Please input article title!',
        },
    ],
    description: [
        {
            required: true,
            message: 'Please input article description!',
        },
    ],
    text: [
        {
            required: true,
            message: 'Please input article text!',
        },
    ],
};

export { userRules, articleRules };
