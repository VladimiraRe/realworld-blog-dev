import { Form, Input } from 'antd';
import type { Rule } from 'antd/es/form';

import './Form.scss';

interface ITextField {
    label: string;
    rows: number;
    rules?: Rule[];
}

export default function TextareaForm({ label, rows, rules }: ITextField) {
    const className = ['form__item'];
    if (rules) className.push('form__item--rules');

    return (
        <Form.Item className={className.join(' ')} label={label} rules={rules}>
            <Input.TextArea rows={rows} />
        </Form.Item>
    );
}
