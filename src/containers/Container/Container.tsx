import { isValidElement } from 'react';
import './Container.scss';

export default function Container({ component }: { component: JSX.Element | (() => void)[] }) {
    if (!isValidElement(component)) return null;
    return <div className='container'>{component}</div>;
}
