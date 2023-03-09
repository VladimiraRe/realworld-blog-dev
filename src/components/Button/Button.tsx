import { Button as ButtonAntd } from 'antd';

import './Button.scss';

interface IButton {
    text: string;
    type?: string;
}

export default function Button({ text, type }: IButton) {
    const className = ['button'];
    if (type) className.push(`button--${type}`);
    return <ButtonAntd className={className.join(' ')}>{text}</ButtonAntd>;
}
