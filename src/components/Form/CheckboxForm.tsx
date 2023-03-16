import { Form, Checkbox } from 'antd';
import type { Rule } from 'antd/es/form';

import './Form.scss';

interface ITextField {
    name: string;
    label: string;
    rules?: Rule[];
}

export default function CheckboxForm({ name, label, rules }: ITextField) {
    const className = ['form__item'];
    if (rules) className.push('form__item--rules');

    return (
        <Form.Item name={name} className={className.join(' ')} valuePropName='checked' rules={rules}>
            <Checkbox>{label}</Checkbox>
        </Form.Item>
    );
}
