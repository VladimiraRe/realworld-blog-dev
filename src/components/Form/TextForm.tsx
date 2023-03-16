import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';

import './Form.scss';

interface ITextField {
    name: string;
    label: string;
    placeholder: string;
    rules?: Rule[];
}

export default function TextForm({ name, label, placeholder, rules }: ITextField) {
    const className = ['form__item'];
    if (rules) className.push('form__item--rules');

    return (
        <Form.Item className={className.join(' ')} name={name} label={label} rules={rules}>
            <Input placeholder={placeholder} />
        </Form.Item>
    );
}
