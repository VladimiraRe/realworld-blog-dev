import { Button as ButtonAntd } from 'antd';

import './Button.scss';

interface IButton {
    text: string;
    type?: string;
    onClick?: () => void | void;
    htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({ text, type, onClick, htmlType }: IButton) {
    const className = ['button'];
    if (type) className.push(`button--${type}`);
    return (
        <ButtonAntd htmlType={htmlType || 'button'} className={className.join(' ')} onClick={onClick}>
            {text}
        </ButtonAntd>
    );
}
