import { useDispatch } from 'react-redux';
import { Form as FormAntd } from 'antd';

import type { appDispatch, IForm } from '../../type';
import Button from '../Button';
import './Form.scss';

export default function Form<T>({ title, btnText, action, initial, children }: IForm<T>) {
    const dispatch: appDispatch = useDispatch();

    const onFinich = (values: { [key: string]: string | (string | null)[] | null }) => {
        const res: { [key: string]: unknown } = {};
        Object.keys(values).forEach((key) => {
            const value = newValue(values[key]);
            if (value) res[key] = value;
        });
        dispatch(action(res as T));
    };

    return (
        <>
            <h5 className='form__title'>{title}</h5>
            <FormAntd className='form__body' layout='vertical' initialValues={initial} onFinish={onFinich}>
                {children}
                <Button text={btnText} type='filled' htmlType='submit' />
            </FormAntd>
        </>
    );
}

function newValue(value: string | (string | null)[] | null) {
    if (value === null || value === undefined) return false;
    let newRes;
    if (Array.isArray(value)) {
        newRes = value.filter((el) => el !== null && el !== undefined);
        return newRes.length !== 0 ? newRes : false;
    }
    return value;
}
