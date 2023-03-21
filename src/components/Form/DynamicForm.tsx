/* eslint-disable react/jsx-props-no-spreading */
import { Form, Input } from 'antd';
import type { FormListFieldData, FormListOperation } from 'antd';
import type { ReactNode } from 'react';

import './Form.scss';
import Button from '../Button';

interface ITextField {
    name: string;
    label: string;
    placeholder: string;
}

export default function DynamicForm({ name, label, placeholder }: ITextField) {
    const content = (fields: FormListFieldData[], { add, remove }: FormListOperation): ReactNode => (
        <>
            {fields.map((field) => (
                <div className='dynamicForm__item' key={field.key}>
                    <Form.Item {...field}>
                        <Input placeholder={placeholder} />
                    </Form.Item>
                    <Button text='Delete' type='alert' onClick={() => remove(field.name)} />
                </div>
            ))}
            <Form.Item className='dynamicForm__addBtn'>
                <Button text={`Add ${placeholder}`} type='calm' onClick={() => add()} />
            </Form.Item>
        </>
    );

    return (
        <div className='dynamicForm'>
            <label htmlFor={name}>{label}</label>
            <Form.List name={name}>{content}</Form.List>
        </div>
    );
}
