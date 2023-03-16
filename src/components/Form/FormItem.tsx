import { Form } from 'antd';

import type { IFormValues } from '../../type';

interface IFormItem extends IFormValues {
    component: JSX.Element;
}

export default function FormItem({ name, rules, label, valuePropName, component }: IFormItem) {
    const className = ['form__item'];
    if (rules) className.push('form__item--rules');

    return (
        <Form.Item
            className={className.join(' ')}
            name={name}
            label={label}
            valuePropName={valuePropName}
            rules={rules}
        >
            {component}
        </Form.Item>
    );
}
