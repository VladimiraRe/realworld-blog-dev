import { Form } from 'antd';

import type { IFormValues } from '../../type';

interface IFormItem extends IFormValues {
    component: JSX.Element;
}

export default function FormItem({
    name,
    rules,
    label,
    valuePropName,
    component,
    dependencies,
    hasFeedback,
}: IFormItem) {
    const className = ['form__item'];
    if (rules) className.push('form__item--rules');

    return (
        <Form.Item
            className={className.join(' ')}
            name={name}
            label={label}
            valuePropName={valuePropName}
            rules={rules}
            dependencies={dependencies}
            hasFeedback={hasFeedback}
        >
            {component}
        </Form.Item>
    );
}
