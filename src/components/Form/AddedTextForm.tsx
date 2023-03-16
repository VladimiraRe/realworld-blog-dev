import { Form, Input } from 'antd';
import type { FormListFieldData, FormListOperation } from 'antd';
import type { ReactNode } from 'react';

import Button from '../Button';
import './Form.scss';

interface ITextField {
    name: string;
    label: string;
    placeholder: string;
    quantity: number;
}

export default function AddedTextForm({ name, label, placeholder, quantity }: ITextField) {
    const content = (fields: FormListFieldData[], { add, remove }: FormListOperation): ReactNode => (
        <>
            {fields.map((field, inx) => (
                <Form.Item label={inx === 1 ? label : ''} key={field.key}>
                    <Input placeholder={placeholder} />
                    <Button text='Delete' type='alert' onClick={() => remove(field.name)} />
                    {inx === quantity && <Button text='Add' type='calm' onClick={() => add()} />}
                </Form.Item>
            ))}
        </>
    );

    return <Form.List name={name}>{content}</Form.List>;
}
