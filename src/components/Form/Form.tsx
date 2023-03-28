import { Form as FormAntd } from 'antd';

import type { IForm } from '../../type';
import Button from '../Button';
import './Form.scss';

export default function Form<T>({
    title,
    btnText,
    initial,
    children,
    onFinish: propOnFinish,
    form,
    loading,
    disabled,
}: IForm<T>) {
    const onFinish = (values: { [key: string]: string | (string | null)[] | null }) => {
        const res: { [key: string]: unknown } = {};
        Object.keys(values).forEach((key) => {
            const value = newValue(values[key]);
            if (value) res[key] = value;
        });
        if (propOnFinish) propOnFinish(res as T);
    };

    return (
        <>
            <h5 className='form__title'>{title}</h5>
            <FormAntd
                className='form__body'
                layout='vertical'
                initialValues={initial}
                onFinish={onFinish}
                form={form}
                disabled={disabled}
            >
                {children}
                <Button text={btnText} type='filled' htmlType='submit' loading={loading} />
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
