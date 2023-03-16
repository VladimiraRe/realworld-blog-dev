import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form as FormAntd } from 'antd';
import type { FieldData } from 'rc-field-form/lib/interface';

import type { appDispatch, IForm } from '../../type';
import Button from '../Button';
import './Form.scss';

export default function Form({ title, btnText, action, initial, children }: IForm) {
    const dispatch: appDispatch = useDispatch();
    const [fields, setFields] = useState(initial);

    const onFinich = () => {
        const sentValues = fields.map(({ name, value }) => ({ name, value }));
        dispatch(action(sentValues));
    };

    return (
        <>
            <h5 className='form__title'>{title}</h5>
            <FormAntd
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
