import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form as FormAntd } from 'antd';
import { useForm } from 'antd/es/form/Form';
import type { FieldData } from 'rc-field-form/lib/interface';

import type { appDispatch, IForm } from '../../type';
import Button from '../Button';
import './Form.scss';

export default function Form<T>({ title, btnText, action, initial, children }: IForm<T>) {
    const dispatch: appDispatch = useDispatch();
    const [fields, setFields] = useState(initial);
    const [form] = useForm();

    const onFinich = () => {
        const sentValues: Record<string, never> | { [key: string]: unknown } | T = {};
        fields.forEach(({ name, value }: FieldData) => {
            const key = (Array.isArray(name) ? name[0] : name) as string;
            sentValues[key as string] = value;
        });
        dispatch(action(sentValues as T));
    };

    return (
        <>
            <h5 className='form__title'>{title}</h5>
            <FormAntd
                form={form}
                className='form__body'
                fields={fields}
                onFieldsChange={(_: FieldData[], allFields: FieldData[]) => setFields(allFields)}
                layout='vertical'
                onFinish={onFinich}
            >
                {children}
                <Button text={btnText} type='filled' htmlType='submit' />
            </FormAntd>
        </>
    );
}
